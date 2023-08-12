import { Annotation, IpldUrl } from "./ResearchObject";

export interface CompositionObject {
  version: number | string;
}
export interface CompositionObjectPreviewResult {
  title: string;
  abstract: string;
  doi: string;
  pdf: string;
  publishedDate: Date;
  blob: string;
}

export interface CompositionObjectV1 extends CompositionObject {
  version: "desci-nodes-0.1.0" | "desci-nodes-0.2.0" | 1;
  title?: string;
  image?: string | IpldUrl;
  researchObjectCids: string[] | [];
  components: CompositionObjectV1Component[];
  attributes?: CompositionObjectV1Attributes[];
  history?: CompositionObjectV1History[];
  tags?: CompositionObjectV1Tags[];
  organizations?: CompositionObjectV1Organization[];
  dpid?: CompositionObjectV1Dpid;
  researchFields?: string[];
  authors?: CompositionObjectV1Author[];
}

export interface CompositionObjectV1Dpid {
  prefix: string;
  id: string;
}

export interface CompositionObjectV1Organization {
  id: string;
  name: string;
  subtext?: string;
}
export interface CompositionObjectV1Tags {
  name: string;
}

export interface CompositionObjectV1Component {
  id: string;
  cid: string;
  name: string;
  type: CompositionObjectComponentType;
  icon?: any;
  payload: any;
  primary?: boolean;
  starred?: boolean;
}

export interface CompositionObjectV1Author {
  name: string;
  orcid?: string;
  googleScholar?: string;
  role: CompositionObjectV1AuthorRole;
  organizations?: CompositionObjectV1Organization[];
  github?: string;
}

export interface CompositionObjectV1History {
  title: string;
  author?: any; // does not refer to CompositionObject author for credit purpose, refers to the on-chain identity of the account who made the publication, this should not be stored in manifest and used in client only
  content: string;
  date?: number; // utc seconds
  transaction?: CompositionObjectTransaction;
}

export interface CompositionObjectTransaction {
  id: string;
  cid: string;
  chainId?: string;
}

export enum CompositionObjectValidationType {
  GRANT = "grant",
  REVIEW = "review",
  CONFERENCE = "conference",
  AUDIT = "audit",
  CERTIFICATION = "certification",
  CERTIFICATION_ARC = "certification-arc",
}
export interface CompositionObjectValidationDeposit {
  token: string;
  address: string;
  amount: string;
}

export interface CompositionObjectV1Validation {
  type: CompositionObjectValidationType;
  title: string;
  subtitle: string;
  transactionId?: string;
  contractAddress?: string;
  tokenId?: string;
  url?: string;
  deposits?: CompositionObjectValidationDeposit[];
}

export enum CompositionObjectAttributeKey {
  ACM_AVAILABLE = "available",
  ACM_FUNCTIONAL = "functional",
  ACM_REUSABLE = "reusable",
  ACM_REPRODUCED = "reproduced",
  ACM_REPLICATED = "replicated",
  AUTHORSHIP_VERIFIED = "authorship-verified",
  COMPUTATIONAL_REPRODUCIBILITY = "computational-reproducibility",
}

export interface CompositionObjectV1Attributes {
  key: CompositionObjectAttributeKey;
  value: boolean;
}

export enum CompositionObjectComponentType {
  RESEARCH_NODE = 'research-node',
  DATA = "data",
  COMPUTE = "compute",
  API = 'api',
  UNKNOWN = "unknown",
}

export enum CompositionObjectComponentDocumentSubtype {
  RESEARCH_ARTICLE = "research-article",
  PREREGISTERED_REPORT = "preregistered-report",
  PREREGISTERED_ANALYSIS_PLAN = "preregistered-analysis-plan",
  SUPPLEMENTARY_INFORMATION = "supplementary-information",
  PRESENTATION_DECK = "presentation-deck",
  OTHER = "other",
}

export enum CompositionObjectComponentLinkSubtype {
  COMMUNITY_DISCUSSION = "community-discussion",
  VIDEO_RESOURCE = "video-resource",
  EXTERNAL_API = "external-api",
  RESTRICTED_DATA = "restricted",
  PRESENTATION_DECK = "presentation-deck",
  OTHER = "other",
}

export type CompositionObjectComponentSubtypes =
  | CompositionObjectComponentDocumentSubtype
  | CompositionObjectComponentLinkSubtype;

/*
export interface CommonComponentPayload {
  title?: string;
  keywords?: string[];
  description?: string;
  licenseType?: string;
  path?: string;
}
export interface PdfComponentPayload {
  url: string;
  annotations?: CompositionObjectComponentAnnotation[];
}

export interface ExternalLinkComponentPayload {
  url: string;
  archives?: ExternalLinkArchive[];
}

export interface ExternalLinkArchive {
  url: string | IpldUrl;
  accessDate: number; // utc seconds
}
export type Path = string;
export interface DataComponentMetadata extends CommonComponentPayload {
  ontologyPurl?: string;
  cedarLink?: string;
  controlledVocabTerms?: string[];
}
export interface DataComponentPayload {
  cid: string;
  subMetadata: Record<Path, DataComponentMetadata>;
}

export interface DataBucketComponent extends CompositionObjectV1Component {
  type: CompositionObjectComponentType.DATA_BUCKET;
  id: "root";
  name: "root";
  payload: DataBucketComponentPayload;
}
export interface DataBucketComponentPayload {
  
  cid: string;
}


export interface PdfComponent extends CompositionObjectV1Component {
  type: CompositionObjectComponentType.PDF;
  subtype?: CompositionObjectComponentDocumentSubtype;
  payload: PdfComponentPayload & CommonComponentPayload;
}

export interface ExternalLinkComponent extends CompositionObjectV1Component {
  type: CompositionObjectComponentType.LINK;
  subtype?: CompositionObjectComponentLinkSubtype;
  payload: ExternalLinkComponentPayload & CommonComponentPayload;
}
export interface DataComponent extends CompositionObjectV1Component {
  type: CompositionObjectComponentType.DATA;
  payload: DataComponentPayload & DataComponentMetadata;
}

export interface CodeComponent extends CompositionObjectV1Component {
  type: CompositionObjectComponentType.CODE;
  payload: {
    language?: string;
    code?: string;
    url?: string;
    externalUrl?: string;
  } & CommonComponentPayload;
}
export interface TerminalComponent extends CompositionObjectV1Component {
  type: CompositionObjectComponentType.TERMINAL;
  payload: {
    logs: string;
  } & CommonComponentPayload;
}
*/
export type CompositionAnnotation = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    pageIndex?: number;
    move?: boolean;
    id: string;
    text?: string;
    title?: string;
};
export type CompositionObjectComponentAnnotation = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  pageIndex?: number;
  id: string;
  text?: string;
  title?: string;
  __client?: any; // client-only variables, deleted before saving to server
};

export enum CompositionObjectV1AuthorRole {
  AUTHOR = "Author",
  NODE_STEWARD = "Node Steward",
}
