
// import { randomBytes } from 'crypto';

import { Request, Response, NextFunction } from 'express';

import prisma from 'client';
import parentLogger from 'logger';
import { getIndexedCompositionObjects } from 'theGraph';
import { decodeBase64UrlSafeToHex, encodeBase64UrlSafe, randomUUID64 } from 'utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const owner = (req as any).user;
  const logger = parentLogger.child({
    // id: req.id,
    module: 'COMPOSITIONS::listController',
    body: req.body,
    user: (req as any).user,
  });
  let compositions = await prisma.composition.findMany({
    where: {
      ownerId: owner.id,
    },
    orderBy: { updatedAt: 'desc' },
  });
  logger.info('-----------------------------------')
  logger.info(compositions)
  logger.info('-----------------------------------')
  res.send({compositions});
  // transition UUID
  /*
  const ns = compositions.filter((a) => !a.uuid);
  console.log('ns', ns)
  if (ns.length) {
    await Promise.all(
      ns.map(
        async (n) =>
          await prisma.composition.update({
            where: {
              id: n.id,
            },
            data: {
              uuid: randomUUID64(),
            },
          }),
      ),
    );
    compositions = await prisma.composition.findMany({
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
        // isDeleted: false,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }
  //const indexMap = {};
  /*
  try {
    const uuids = compositions.map((n) => n.uuid);
    const indexed = await getIndexedCompositionObjects(uuids)
    indexed.compositions.forEach((e) => {
      indexMap[e.id] = e;
    });
  } catch (err) {
    logger.error({ err: err.message }, '[ERROR] graph index lookup fail');
    // todo: try on chain direct (current method doesnt support batch, so fix that and add here)
  }

  compositions = compositions.map((n) => {
    const hex = `0x${decodeBase64UrlSafeToHex(n.uuid)}`;
    const o = { ...n, uuid: n.uuid.replaceAll('.', ''), isPublished: !!indexMap[hex], index: indexMap[hex] };
    delete o.id;

    return o;
  });
  */
};
