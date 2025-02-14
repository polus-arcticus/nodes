import { randomBytes } from 'crypto';

import { Request, Response, NextFunction } from 'express';

import prisma from 'client';
import { getIndexedResearchObjects } from 'theGraph';
import { decodeBase64UrlSafeToHex, encodeBase64UrlSafe, randomUUID64 } from 'utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const owner = (req as any).user;

  let nodes = await prisma.node.findMany({
    select: {
      uuid: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      ownerId: true,
      title: true,
      manifestUrl: true,
      cid: true,
    },
    where: {
      ownerId: owner.id,
    },
    orderBy: { updatedAt: 'desc' },
  });

  // transition UUID
  const ns = nodes.filter((a) => !a.uuid);
  if (ns.length) {
    await Promise.all(
      ns.map(
        async (n) =>
          await prisma.node.update({
            where: {
              id: n.id,
            },
            data: {
              uuid: randomUUID64(),
            },
          }),
      ),
    );
    nodes = await prisma.node.findMany({
      select: {
        uuid: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
        title: true,
        manifestUrl: true,
        cid: true,
      },
      where: {
        ownerId: owner.id,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }
  const indexMap = {};
  try {
    const uuids = nodes.map((n) => n.uuid);
    const indexed = await getIndexedResearchObjects(uuids);
    indexed.researchObjects.forEach((e) => {
      indexMap[e.id] = e;
    });
  } catch (err) {
    console.error('[ERROR] graph index lookup fail', err.message);
    // todo: try on chain direct (current method doesnt support batch, so fix that and add here)
  }

  nodes = nodes.map((n) => {
    const hex = `0x${decodeBase64UrlSafeToHex(n.uuid)}`;
    const o = { ...n, uuid: n.uuid.replaceAll('.', ''), isPublished: !!indexMap[hex], index: indexMap[hex] };
    delete o.id;

    return o;
  });
  res.send({ nodes });
};
