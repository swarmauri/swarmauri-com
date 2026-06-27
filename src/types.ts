export interface Package {
  name: string;
  layer: string;
  family: string;
  maturity: string;
  version: string;
  description: string;
  installCommand: string;
  importExample: string;
  sourcePath: string;
  role: string;
  pythonVersion: string;
  dependencies: string[];
  docsLink: string;
  workspace: boolean;
  order: number;
  orderSource: string;
  orderReason: string;
}

export interface LayerInfo {
  id: string;
  name: string;
  count: number;
  meaning: string;
  description: string;
}

export interface FamilyInfo {
  name: string;
  count: number;
  description: string;
}

export interface MaturityInfo {
  name: string;
  count: number;
  description: string;
}

export interface GuideTopic {
  id: string;
  title: string;
  description: string;
  codeBlock: string;
  explanation: string;
}

export interface UpdatePost {
  id: string;
  slug?: string;
  title: string;
  date: string;
  category: "Release Notes" | "Package Highlights" | "Architecture Notes" | "Tutorials" | "Community";
  summary: string;
  content: string;
}

export interface ClaimRecord {
  id: string;
  claim: string;
  category: "Security" | "Integrations" | "Packaging" | "Maturity" | "Architecture";
  package: string;
  verification: string;
  status: "Verified" | "Supported" | "Planned";
  details: string;
  citation?: string;
  about?: string;
  firstAppearance?: string;
  author?: string;
  reviewRating?: "t0" | "t1" | "t2" | "t3" | "t4";
}

export interface CareerRole {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}
