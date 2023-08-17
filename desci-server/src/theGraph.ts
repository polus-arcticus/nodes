/**
 * Query The Graph subgraph
 */

import axios from 'axios';

import logger from 'logger';
import { decodeBase64UrlSafeToHex } from 'utils';

export const getIndexedResearchObjects = async (urlSafe64s: string[]) => {
  const hex = urlSafe64s.map(decodeBase64UrlSafeToHex).map((h) => `0x${h}`);
  const q = `{
    researchObjects(where: { id_in: ["${hex.join('","')}"]}) {
      id, id10, recentCid, owner, versions(orderBy: time, orderDirection: desc) {
        cid, id, time
      }
    } 
  }`;
  return query(q);
};
export const getIndexedCompositionObjects = async (
  urlSafe64s: string[]
  ) => {
  const hex = urlSafe64s.map(decodeBase64UrlSafeToHex).map((h) => `0x${h}`);
  const q = `{
    compositions(where: { id_in: ["${hex.join('","')}"]}) {
      id, owner, versions(orderBy: time, orderDirection: desc) {
        cid, id, time
      }
    } 
  }`;
  return query(q);
};

export const query = async (query: string) => {
  const payload = JSON.stringify({
    query,
  });
  const { data } = await axios.post(process.env.THEGRAPH_API_URL, payload);
  if (data.errors) {
    logger.error({ fn: 'query', err: data.errors, query, dataRes: data }, `graph index query err ${query}`);
    throw Error(JSON.stringify(data.errors));
  }
  return data.data;
};
