import fetch from 'node-fetch';

const uuid = `ZMbOPr0JuxKCBxVBOgJjEz1l5S-i_P_ysGclr5NFq9E`;
const manifestCid = `bafkreid3xtq3e4r4pfpzkpvxo27z4bt4tmfz7qxbqtvxpgh5nuc4okpsh4`;
const privShare = `cSyfIvLqMa`;
const url = `https://nodes-api-dev.desci.com/v1/data/retrieveTree/${uuid}/${manifestCid}/${privShare}?depth=1`;

async function getTree(path?: string) {
  console.log('get tree for path', path);
  const target = `${url}${path ? `&dataPath=${path}` : ''}`;
  const res = await fetch(target);
  const { tree } = await res.json();
  return tree;
}

async function start() {
  console.log('getting full treee');
  const tree = await getTree('root/broad-data');

  console.log('mapping full tree to paths');

  const getPaths = (tree) => tree[0].contains.filter((node: any) => node.type === 'dir').map((node: any) => node.path);
  let paths = getPaths(tree);
  console.log('fetching all treees with a depth=1', paths);

  let pathInfo: any = [];

  const PARALLEL_JOBS = 10;

  for (let i = 0; i < paths.length; i += PARALLEL_JOBS) {
    const pathSlice = paths.slice(i, i + PARALLEL_JOBS);
    const resultsSlice = await Promise.all(
      pathSlice.map(async (path, index) => {
        console.log(path, 'current iteration', index, '/', pathSlice.length, '/', i, paths.length);
        const tree = await getTree(path);
        const newPaths = getPaths(tree);
        console.log('new paths', newPaths);
        paths = paths.concat(newPaths);

        console.log('iteration complete', index, '/', pathSlice.length, '/', i, paths.length);
      }),
    );
    pathInfo = pathInfo.concat(resultsSlice);
  }

  const info = await Promise.all(pathInfo);

  console.log('done');
}

start();
