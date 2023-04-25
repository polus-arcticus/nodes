import { User } from '@prisma/client';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

import prisma from 'client';

if (!process.env.NODES_MEDIA_SERVER_URL) {
  throw Error('NODES_MEDIA_SERVER_URL not found, add to env file');
}

const MEDIA_SERVER_API_URL = process.env.NODES_MEDIA_SERVER_URL;
const MEDIA_SERVER_API_KEY = process.env.MEDIA_SECRET_KEY;

export const getCoverImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cid = req.params.cid as string;
    const nodeUUID = req.query.nodeUuid as string;

    if (!cid || !nodeUUID) throw Error('Invalid CID params or NodeUuid query');
    // check cid exists in data refs table

    const node = await prisma.node.findFirst({ where: { uuid: nodeUUID + '.' } });

    if (!node) throw Error('Node not found');
    const exists = await prisma.nodeCover.findFirst({ where: { nodeUuid: nodeUUID + '.' } });
    if (exists) {
      res.send({ ok: true, url: exists.url });
      return;
    }

    const dataRefExists = await prisma.dataReference.findFirst({ where: { cid, nodeId: node.id } });
    console.log('dataRefExists', cid, node.id, nodeUUID);
    if (!dataRefExists) throw Error('Unknown CID reference');

    const data = await (
      await axios.post(
        `${MEDIA_SERVER_API_URL}/v1/nodes/cover/${cid}`,
        {},
        {
          headers: { 'x-api-key': MEDIA_SERVER_API_KEY },
        },
      )
    ).data;

    await prisma.nodeCover.upsert({
      where: { nodeUuid: nodeUUID + '.' },
      update: { url: data.url, cid },
      create: { url: data.url, nodeUuid: nodeUUID + '.', cid },
    });

    res.send({ ok: true, url: data.url, title: node.title });
  } catch (e) {
    console.log('error', e);
    res.status(404).send({ ok: false, message: e.message || 'Error generating cover image' });
  }
};

export const setCoverImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cid = req.params.cid as string;
    const nodeUUID = req.query.nodeUuid as string;
    const user = (req as any).user as User;

    if (!cid || !nodeUUID) throw Error('Invalid CID params or NodeUuid query');
    // check cid exists in data refs table

    const node = await prisma.node.findFirst({ where: { uuid: nodeUUID + '.', ownerId: user.id } });

    if (!node) throw Error('Node not found');

    const dataRefExists = await prisma.dataReference.findFirst({ where: { cid, nodeId: node.id } });
    console.log('dataRefExists', cid, node.id, nodeUUID);
    if (!dataRefExists) throw Error('Unknown CID reference');

    const data = await (
      await axios.post(
        `${MEDIA_SERVER_API_URL}/v1/nodes/cover/${cid}`,
        {},
        {
          headers: { 'x-api-key': MEDIA_SERVER_API_KEY },
        },
      )
    ).data;

    await prisma.nodeCover.upsert({
      where: { nodeUuid: nodeUUID + '.' },
      update: { url: data.url, cid },
      create: { url: data.url, nodeUuid: nodeUUID + '.', cid },
    });

    res.send({ ok: true, url: data.url });
  } catch (e) {
    console.log('error', e);
    res.status(404).send({ ok: false, message: e.message || 'Error generating cover image' });
  }
};
