import { ResearchObjectV1 } from '@desci-labs/desci-models';
import { DataType, User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import flattenDeep from 'lodash/flattenDeep';
import axios from 'axios';

import prisma from 'client';
import { getAvailableDataUsageForUserBytes, hasAvailableDataUsageForUpload } from 'services/dataService';
import {
  getDirectoryTree,
  getFilesAndPaths,
  IpfsDirStructuredInput,
  IpfsPinnedResult,
  pinDirectory,
  RecursiveLsResult,
} from 'services/ipfs';
import { gbToBytes, getTreeAndFillSizes, recursiveFlattenTree } from 'utils/driveUtils';

import { DataReferenceSrc } from './retrieve';
import { persistManifest } from './upload';
import { cleanupManifestUrl } from 'controllers/nodes';

export const update = async (req: Request, res: Response) => {
  const owner = (req as any).user as User;
  const { uuid, manifest, rootCid, contextPath } = req.body;
  console.log('body: ', JSON.stringify(req.body));
  console.log('files rcvd: ', req.files);
  console.log('update dataset hit');
  console.log('[UPDATE DATASET] Updating in context: ', contextPath);
  if (uuid === undefined || manifest === undefined || rootCid === undefined || contextPath === undefined)
    return res.status(400).json({ error: 'uuid, manifest, rootCid, contextPath required' });
  const manifestObj: ResearchObjectV1 = JSON.parse(manifest);

  //validate requester owns the node
  const node = await prisma.node.findFirst({
    where: {
      ownerId: owner.id,
      uuid: uuid + '.',
    },
  });
  if (!node) {
    console.log(`unauthed node user: ${owner}, node uuid provided: ${uuid}`);
    return res.status(400).json({ error: 'failed' });
  }

  const files = req.files as Express.Multer.File[];
  if (!files) return res.status(400).json({ message: 'No files received' });

  console.log('usr: ', owner);
  let uploadSizeBytes = 0;
  files.forEach((f) => (uploadSizeBytes += f.size));

  const hasStorageSpaceToUpload = await hasAvailableDataUsageForUpload(owner, { fileSizeBytes: uploadSizeBytes });
  if (!hasStorageSpaceToUpload)
    return res.send(400).json({
      error: `upload size of ${uploadSizeBytes} exceeds users data budget of ${owner.currentDriveStorageLimitGb} GB`,
    });

  const oldTree = await getDirectoryTree(rootCid);
  const oldFlatTree = recursiveFlattenTree(oldTree);

  const splitContextPath = contextPath.split('/');
  if (splitContextPath[0] === 'Data') splitContextPath.shift();
  splitContextPath.shift();
  const cleanContextPath = splitContextPath.join('/');
  console.log('[UPDATE DATASET] cleanContextPath: ', cleanContextPath);

  //ensure all paths are unique to prevent borking datasets, reject if fails unique check
  const OldTreePaths = oldFlatTree.map((e) => e.path);
  const newPathsFormatted = files.map((f) => {
    const header = !!cleanContextPath ? rootCid + '/' + cleanContextPath : rootCid;
    return header + f.originalname;
  });
  const hasDuplicates = OldTreePaths.some((oldPath) => newPathsFormatted.includes(oldPath));
  if (hasDuplicates) {
    console.log('[UPDATE DATASET] Rejected as duplicate paths were found');
    return res.status(400).json({ error: 'Duplicate files rejected' });
  }

  const oldTreeWrapped: RecursiveLsResult = {
    name: 'wrapper',
    contains: oldTree,
    type: 'dir',
    path: 'wrapper',
    cid: 'wrapper',
    size: 0,
  };
  const oldFilesAndPaths = await getFilesAndPaths(oldTreeWrapped);
  // console.log('Existing Files & Paths: ', oldFilesAndPaths);

  const structuredFiles: IpfsDirStructuredInput[] = files.map((f: any) => {
    return { path: cleanContextPath + f.originalname, content: f.buffer };
  });

  //combines old files + new files, and cleans the old root hash from the old file paths
  const flatFilePaths = flattenDeep([structuredFiles, ...oldFilesAndPaths]);
  // console.log('flatFilePaths: ', flatFilePaths);
  const newFilePaths = flatFilePaths.map((fp) => {
    const splitPath = fp.path.split('/');
    if (splitPath[0] === rootCid) splitPath.shift();
    return { path: splitPath.join('/'), content: fp.content };
  });

  // console.log('newFilePaths: ', newFilePaths);

  const uploaded: IpfsPinnedResult[] = await pinDirectory(newFilePaths);
  if (!uploaded.length) res.status(400).json({ error: 'failed uploading to ipfs' });
  console.log('pinned: ', uploaded);
  const newRootCid = uploaded[uploaded.length - 1].cid;

  const datasetId = manifestObj.components.find((c) => c.payload.cid === rootCid).id;

  //repull of node required, previous manifestUrl may already be stale
  const ltsNode = await prisma.node.findFirst({
    where: {
      ownerId: owner.id,
      uuid: uuid + '.',
    },
  });

  const latestManifestCid = ltsNode.manifestUrl || ltsNode.cid;
  const manifestUrl = latestManifestCid
    ? cleanupManifestUrl(latestManifestCid as string, req.query?.g as string)
    : null;
  // debugger;
  const fetchedManifest = manifestUrl ? await (await axios.get(manifestUrl)).data : null;

  const latestManifest = fetchedManifest || manifestObj;

  const updatedManifest = updateManifestDataset({
    manifest: latestManifest,
    datasetId: datasetId,
    newRootCid: newRootCid,
  });
  const flatTree = recursiveFlattenTree(await getDirectoryTree(newRootCid));
  flatTree.push({ cid: newRootCid, type: 'dir', path: newRootCid, size: uploaded[uploaded.length - 1].size });
  const dataType: DataType = 'DATASET';
  // const uploadedStructured = uploaded.map((f) => {
  //   console.log('f in finding: ', f);
  //   const treeMatch = flatTree.find((fd) => f.cid === fd.cid);
  //   const fdType = treeMatch.type;
  //   // const path = treeMatch.path;
  //   return {
  //     cid: f.cid,
  //     size: f.size,
  //     root: f.cid === newRootCid,
  //     rootCid: newRootCid,
  //     path: f.path, //prev path, issue with dupes
  //     type: dataType,
  //     userId: owner.id,
  //     nodeId: node.id,
  //     directory: fdType === 'dir' ? true : false,
  //   };
  // });

  console.log('uploaded: ', uploaded);
  const uploadedStructured = flatTree.map((f) => {
    console.log('f in finding: ', f);
    const treeMatch = uploaded.find((fd) => f.cid === fd.cid);
    const size = treeMatch.size;
    // const fdType = treeMatch.type;
    // const path = treeMatch.path;
    return {
      cid: f.cid,
      size: size,
      root: f.cid === newRootCid,
      rootCid: newRootCid,
      path: f.path, //prev path, issue with dupes
      type: dataType,
      userId: owner.id,
      nodeId: node.id,
      directory: f.type === 'dir' ? true : false,
    };
  });
  try {
    //existing refs
    const dataRefIds = await prisma.dataReference.findMany({
      where: {
        rootCid: rootCid,
        nodeId: node.id,
        userId: owner.id,
      },
    });

    const upserts = await prisma.$transaction(
      uploadedStructured.map((fd) => {
        const oldPath = fd.path.replace(newRootCid, rootCid);
        const match = dataRefIds.find((dref) => {
          return dref.cid === fd.cid && dref.path === oldPath;
        });
        let refId = 0;
        if (match) refId = match.id;
        return prisma.dataReference.upsert({
          where: {
            id: refId,
          },
          update: {
            ...fd,
          },
          create: {
            ...fd,
          },
        });
      }),
    );
    if (upserts) console.log(`${upserts.length} new data references added/modified`);

    //CLEANUP DANGLING REFERENCES//
    // console.log('oldRootCid CHECK: ', rootCid);
    oldFlatTree.push({ cid: rootCid, path: rootCid, name: 'Old Root Dir', type: 'dir', size: 0 });
    const newFilesPathAdjusted = flatTree.map((f) => {
      f.path = f.path.replace(newRootCid, '', 0);
      return f;
    });

    const pruneList = oldFlatTree.filter((oldF) => {
      const oldPathAdjusted = oldF.path.replace(rootCid, '', 0);
      //a path match && a CID difference = prune
      return newFilesPathAdjusted.some((newF) => oldPathAdjusted === newF.path && oldF.cid !== newF.cid);
    });

    //missing cids
    const pruneCids = pruneList.map((e) => e.cid);
    const prunePaths = pruneList.map((e) => e.path);
    pruneCids.push(rootCid);
    prunePaths.push(rootCid);

    //doesn't find all
    const deletionEntries = await prisma.dataReference.findMany({
      where: {
        cid: { in: pruneCids },
        path: { in: prunePaths },
        rootCid: rootCid,
        nodeId: node.id,
        userId: owner.id,
      },
    });

    const deletionIds = deletionEntries.map((e) => e.id);

    //FOR DEBUGGING
    // const formattedPruneListPrinting = pruneList.map((e) => {
    //   const size = deletionEntries.find((s) => e.cid === s.cid).size;
    //   return {
    //     name: e.name,
    //     cid: e.cid,
    //     path: e.path,
    //     type: e.type,
    //     size: size || 0,
    //   };
    // });
    // console.log('PRUNELIST: ', formattedPruneListPrinting);

    console.log('deletionEntries: ', deletionEntries);
    const formattedPruneList = pruneList.map((e) => {
      console.log('formattedPruneList Entry: ', e);
      const size = deletionEntries.find((s) => e.cid === s.cid).size;
      return {
        description: 'DANGLING DAG, UPDATED DATASET',
        cid: e.cid,
        type: dataType,
        size: size || 0,
        nodeId: node.id,
        userId: owner.id,
        directory: e.type === 'dir' ? true : false,
      };
    });

    const pruneRes = await prisma.$transaction([
      prisma.dataReference.deleteMany({ where: { id: { in: deletionIds } } }),
      prisma.cidPruneList.createMany({ data: formattedPruneList }),
    ]);

    console.log(
      `[PRUNING] ${pruneRes[0].count} dataReferences deleted, ${pruneRes[1].count} cidPruneList entries added.`,
    );
    //END OF CLEAN UP//

    const tree = await getTreeAndFillSizes(newRootCid, uuid, DataReferenceSrc.PRIVATE, owner.id);
    const { persistedManifestCid, date } = await persistManifest({ manifest: updatedManifest, node, userId: owner.id });
    if (!persistedManifestCid)
      throw Error(`Failed to persist manifest: ${updatedManifest}, node: ${node}, userId: ${owner.id}`);

    return res.status(200).json({
      rootDataCid: newRootCid,
      manifest: updatedManifest,
      manifestCid: persistedManifestCid,
      tree: tree,
      date: date,
    });
  } catch (e: any) {
    console.log(`[UPDATE DATASET] error: ${e}`);
    //checks if any failures occured post pinning files and adds the CIDs to the prunelist, this could result in disk usage leaks
    if (uploaded.length) {
      console.log(`[UPDATE DATASET E:2] CRITICAL! FILES PINNED, DB ADD FAILED, FILES: ${uploaded}`);
      const formattedPruneList = uploadedStructured.map((e) => {
        return {
          description: '[UPDATE DATASET E:2] FILES PINNED WITH DB ENTRY FAILURE',
          cid: e.cid,
          type: DataType.DATASET,
          size: e.size || 0,
          nodeId: node.id,
          userId: owner.id,
          directory: e.directory,
        };
      });
      const prunedEntries = await prisma.cidPruneList.createMany({ data: formattedPruneList });
      if (prunedEntries.count) {
        console.log(`[UPDATE DATASET E:2] ${prunedEntries.count} ADDED FILES TO PRUNE LIST`);
      } else {
        console.log(`[UPDATE DATASET E:2] failed adding files to prunelist, db may be down`);
      }
    }
    //delete flow
    return res.status(400).json({ error: 'failed #1' });
  }
};

interface UpdatingManifestParams {
  manifest: ResearchObjectV1;
  datasetId: string;
  newRootCid: string;
}

export function updateManifestDataset({ manifest, datasetId, newRootCid }: UpdatingManifestParams) {
  const componentIndex = manifest.components.findIndex((c) => c.id === datasetId);
  manifest.components[componentIndex] = {
    ...manifest.components[componentIndex],
    payload: {
      ...manifest.components[componentIndex].payload,
      cid: newRootCid,
    },
  };

  return manifest;
} //
