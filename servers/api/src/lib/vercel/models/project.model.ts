import { Framework } from "./constants";
import { CreateDeployment } from "./deployment.model";

export type Env = {
  gitbranch?: string;
  key: string;
  target: ("production" | "preview" | "development")[];
  type?: "system" | "secret" | "encrypted" | "plain" | "sensitive";
  value: string;
};

export type CreateProjectQuery = {
  slug?: string;
  teamId?: string;
};

export type CreateProjectArgs = {
  name: string;
  buildCommand?: string | null;
  commandForIgnoringBuildStep?: string | null;
  devCommand?: string | null;
  enabledAffectedProjectsDeployments?: boolean;
  environmentVariables?: Env[];
  framework?: Framework;
  gitRepository: {
    repo: string;
    type: "github" | "gitlab" | "bitbucket";
  };
  installCommand?: string;
  oidcTokenConfig?: {
    enabled: boolean;
    issurerMode: "team" | "global";
  };
  outputDirectory?: string | null;
  publicSource?: string | null;
  rootDirectory?: string | null;
  serverlessFunctionRegion?: string | null;
  enableAffectedProjectsDeployments?: boolean;
  /** @deprecated */
  skipGitConnectDuringLink?: boolean;
};

export type CreateProject = {
  accountId: string;
  analytics: {
    canceledAt: number | null;
    disabledAt: number;
    enabledAt: number;
    id: string;
    paidAt: number;
    sampleRatePercent: number | null;
    spendLimitInDollars: number | null;
  };
  autoAssignCustomDomains: boolean;
  autoAssignCustomDomainsUpdatedBy: string;
  autoExposeSystemEnvs: boolean;
  buildCommand: string | null;
  commandForIgnoringBuildStep: string | null;
  concurrentBucketName: string;
  connectConfigurationId: string | null;
  createdAt: number;
  crons: {
    definitions: { host: string; path: string; schedule: string }[];
    deploymentId: string | null;
    disabledAt: number | null;
    enabledAt: number;
    updatedAt: number;
  };
  customEnvironments: [];
  customerSupportCodeVisibility: boolean;
  dataCache: {
    storageSizeBytes: number | null;
    unlimited: boolean;
    userDisabled: boolean;
  };
  deploymentExpiration: {
    deploymentsToKeep: number;
    expirationDays: number;
    expirationDaysCanceled: number;
    expirationDaysErrored: number;
    expirationDaysProducation: number;
  };
  devCommand: string | null;
  directoryListing: boolean;
  enabledAffecredProjectsDeployments: boolean;
  enablePreviewFeedback: boolean | null;
  enableProductionFeedback: boolean | null;
  env: {
    comment: string;
    configurationId: string | null;
    contentHint: object;
    createdAt: number;
    createdBy: number;
    customEnvironmentIds: [];
    decrypted: boolean;
    edgeConfigId: string | null;
    edgeConfigTokenId: null;
    gitBranch: string;
    id: string;
    internalContentHint: object | null;
    key: string;
    sunsetSecretId: string;
    target: object;
    type: "system" | "encrypted" | "plain" | "sensitive" | "secret";
    updatedAt: number;
    value: string;
    vsmValue: string;
  }[];
  framework: Framework;
  gitComments: {
    onCommit: boolean;
    onPullRequest: boolean;
  };
  gitForkProtection: boolean;
  gitLFS: boolean;
  hasActiveBrancges: boolean;
  hasFloatingAliases: boolean;
  id: string;
  installCommand: string;
  ipBuckets: { bucket: string; supportUtil: number }[];
  lastAliasRequest: {
    fromDeplotmentId: string;
    jobStatus: string;
    requestedAt: number;
    toDeploymentId: string;
    type: "promote" | "rollback";
  } | null;
  lastRoolbackTarget: object | null;
  lastDeployments: Pick<
    CreateDeployment,
    | "alias"
    | "aliasAssigned"
    | "aliasError"
    | "aliasFinal"
    | "automaticAliases"
    | "buildAt"
    | "builds"
    | "checksConclusion"
    | "checksState"
    | "connectBuildsEnabled"
    | "connectConfigurationId"
    | "createdAt"
    | "createdIn"
    | "creator"
    | "deletedAt"
    | "id"
    | "meta"
    | "monorepoManager"
    | "name"
    | "oidcTokensClaims"
    | "plan"
    | "previewCommentsEnabled"
    | "readySubstate"
    | "readyState"
    | "target"
    | "type"
  >[];
  link: {
    type: "github";
    repo: string;
    repoId: number;
    org: string;
    repoOwnerId: number;
    gitCredentialId: string;
    productionBranch: string;
    createdAt: number;
    updatedAt: string;
    deployHooks: [];
  };
  live: boolean;
  name: string;
  nodeVersion: string;
  oidcTokenConfig: object;
  optionsAllowlist: object;
  outputDirectory: string | null;
  passiveConnectConfiguraration: string | null;
  passwordProtection: object | null;
  paused: boolean;
  permissions: object;
  productionDeploymentsFastLance: boolean;
  protectionBypass: object;
  publicSource: boolean | null;
  resourceConfig: object;
  webAnalytics: object;
  updateAt: number;
  trustIps: object | null;
  transferredFromAccountId: string;
  transferToAccounId: string;
  transferStartedAt: number;
  transferCompletedAt: number;
  tier: "standard" | "advanced" | "critical";
  targets: object;
  ssoProtection: object | null;
  speedInsights: object;
  sourceFilesOutsideRootDirectory: boolean;
  skipGitConnectDuringLink: boolean;
  skewProtectionMaxAge: number;
  skewProtectionBoundaryAt: number;
  serverlessFunctionZeroConfigFailover: boolean;
  serverlessFunctionRegion: string | null;
  security: object;
  rootDirectory: string | null;
  resorceConfig: object;
};

export type AddDomainArgs = {
  name: string;
  gitBranch?: string | null;
  redirect?: string | null;
  redirectStatusCode?: number | null;
};

export type AddDomain = {
  apexName: string;
  createdAt: number;
  customEnvironmentId: string | null;
  gitBranch: string | null;
  name: string;
  projectId: string;
  redirect: string | null;
  redirectStatusCode: number | null;
  updateAt: number;
  verification: {
    domain: string;
    reason: string;
    type: string;
    value: string;
  }[];
  verified: boolean;
};
