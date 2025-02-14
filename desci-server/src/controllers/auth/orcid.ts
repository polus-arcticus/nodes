import { ActionType } from '@prisma/client';
import axios, { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import qs from 'qs';

import { saveInteraction } from 'services/interactionLog';
import { createUser, getUserByOrcId } from 'services/user';

export const orcidConnect = async (req: Request, res: Response) => {
  processOrcidConnect(req, res, false);
};

export const orcidConnectClose = async (req: Request, res: Response) => {
  processOrcidConnect(req, res, true);
};

export const orcidAuth = async (req: Request, res: Response) => {
  processOrcidAuth(req, res, false);
};

export const orcidAuthClose = async (req: Request, res: Response) => {
  processOrcidAuth(req, res, true);
};

export const validateOrcid = async (req: Request, res: Response) => {
  // console.log('TOK', req.query.token);
  try {
    const url = `https://pub.sandbox.orcid.org/v3.0/${req.query.orcid}/record`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${req.query.token}`, 'Content-Type': 'application/json', Accept: '*/*' },
    });
    res.send({ data, ok: true });
  } catch (err) {
    console.error(err);
    res.status(400).send({ ok: false, err });
  }
};

interface OrcIdRecordData {
  'orcid-identifier': {
    path: string;
  };
  person: {
    name?: {
      'given-names': { value: string } | null;
      'family-name': { value: string } | null;
    };
    emails: {
      email: {
        email: string;
      }[];
    };
  };
}
const getOrcidRecord = async (orcid: string, accessToken: string) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://pub.sandbox.orcid.org/v3.0/${orcid}/record`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  console.log('Fetching OrcId Record for', orcid);
  const { data } = await axios(config);
  console.log('Received OrcId Record data', data);

  return data as OrcIdRecordData;
};

const getAllOrcData = async ({ queryCode, redirectUri }: { queryCode: string; redirectUri: string }) => {
  // complete 3-legged oauth https://info.orcid.org/documentation/api-tutorials/api-tutorial-get-and-authenticated-orcid-id/#easy-faq-2537
  const data = qs.stringify({
    client_id: process.env.ORCID_CLIENT_ID,
    client_secret: process.env.ORCID_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: queryCode,
    redirect_uri: redirectUri,
  });

  console.log('Sending ORCID request');
  const orcAuthResponse = await axios.post<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>('https://sandbox.orcid.org/oauth/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log('ORCID RESPONSE', orcAuthResponse.data);

  // retrieve additional fields from orcid with auth token
  const orcRecord = await getOrcidRecord(orcAuthResponse.data['orcid'], orcAuthResponse.data['access_token']);
  console.log('Received OrcId Data', orcRecord);

  const orcAuthData = {
    orcid: orcAuthResponse.data['orcid'],
    orcidAccessToken: orcAuthResponse.data['access_token'],
    orcidRefreshToken: orcAuthResponse.data['refresh_token'],
    orcidExpiresIn: orcAuthResponse.data['expires_in'],
  };

  return { orcAuthData, orcRecord };
};

const processOrcidConnect = async (req: Request, res: Response, closing: boolean) => {
  console.log('CODE', req.query, closing);
  const user = (req as any).user;
  console.log('Requesting user', user);

  const redirectUri = `${process.env.SERVER_URL}/v1/auth/orcid/connect` + (closing ? '/close' : '');

  try {
    // retrieve additional fields from orcid with auth token
    const { orcAuthData, orcRecord } = await getAllOrcData({ queryCode: req.query.code as string, redirectUri });
    await saveInteraction(req, ActionType.ORCID_RETRIEVE, { orcAuthData, orcRecord });

    const cookieObj = {
      orcid_access_token: orcAuthData.orcidAccessToken,
      orcid_refresh_token: orcAuthData.orcidRefreshToken,
      orcid_expires_in: orcAuthData.orcidExpiresIn,
      orcid: orcAuthData.orcid,
    };

    if (closing) {
      const orcData = Buffer.from(JSON.stringify(cookieObj)).toString('base64');
      res.redirect(`${process.env.DAPP_URL}/app/orcid/connect?close=true&orcData=${orcData}`);
    }

    res.status(500).send();
    return;
  } catch (err) {
    console.error('err', err);
    res.status(400).send({ err });
  }
};

const processOrcidAuth = async (req: Request, res: Response, closing: boolean) => {
  const redirectUri = `${process.env.SERVER_URL}/v1/auth/orcid/auth` + (closing ? '/close' : '');

  try {
    const { orcAuthData, orcRecord } = await getAllOrcData({ queryCode: req.query.code as string, redirectUri });

    await saveInteraction(req, ActionType.ORCID_RETRIEVE, { orcAuthData, orcRecord });

    const orcid = orcRecord['orcid-identifier'].path;

    let user = await getUserByOrcId(orcAuthData.orcid);

    if (!user) {
      const namesInOrcProfile = orcRecord.person.name
        ? {
            firstName: orcRecord.person.name['given-names']?.value,
            lastName: orcRecord.person.name['family-name']?.value,
          }
        : null;

      const name = namesInOrcProfile?.firstName
        ? `${namesInOrcProfile.firstName} ${namesInOrcProfile.lastName}`
        : undefined;
      /**
       * Users can have multiple emails in orc, but we only want to use the primary one
       * This is also dependent on the email being "public" in their OrcId profile
       * Otherwise we can use an orcid urn as a placeholder
       * Having a unique email is necessary so we need something there
       */
      const primaryEmailInOrcProfile = orcRecord.person.emails.email[0]?.email;
      const email = primaryEmailInOrcProfile ? primaryEmailInOrcProfile : `orcid:${orcid}`;

      user = await createUser({ name, email, orcid });
    }

    console.log('User logging in with OrcId', user);

    const jwtToken = jwt.sign({ email: user.email, orcid }, process.env.JWT_SECRET, { expiresIn: '1y' });
    const cookieObj = {
      orcid_access_token: orcAuthData.orcidAccessToken,
      orcid_refresh_token: orcAuthData.orcidRefreshToken,
      orcid_expires_in: orcAuthData.orcidExpiresIn,
      orcid,
      jwtToken,
    };

    if (closing) {
      const orcData = Buffer.from(JSON.stringify(cookieObj)).toString('base64');
      res.redirect(`${process.env.DAPP_URL}/app/orcid/auth?close=true&orcData=${orcData}`);
    }

    res.status(500).send();
    return;
  } catch (err) {
    console.error('err', err);
    res.status(400).send({ err });
  }
};
