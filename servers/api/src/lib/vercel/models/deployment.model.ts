import { Framework } from "./constants";

export type CreateDeploymentQuery = {
  slug: string;
  teamId: string;
  forceNew: "0" | "1";
  skipAutoDetectionConfirmation: "0" | "1";
};

export type CreateDeploymentArgs = {
  name: string;
  deploymentId?: string;
  files?: (
    | {
        data: string;
        file: string;
        encoding?: "base64" | "utf-8";
      }
    | {
        file: string;
        sha?: string;
        size?: number;
      }
  )[];
  gitMetadata?: {
    commitAuthorName?: string;
    commitMessage?: string;
    commitRef?: string;
    commitSha?: string;
    dirty?: boolean;
    remoteUrl?: string;
  };
  gitSource?:
    | {
        ref: string;
        repoId: number | string;
        type: "github";
        sha?: string;
      }
    | {
        org: string;
        ref: string;
        repo: string;
        type: "github";
        sha?: string;
      }
    | {
        projectId: string | number;
        ref: string;
        type: "gitlab";
        sha?: string;
      }
    | {
        ref: string;
        repoUUid: string;
        type: "bitbucket";
        sha?: string;
        workspaceUuid?: string;
      }
    | {
        owner: string;
        ref: string;
        slug: string;
        type: "bitbucket";
        sha?: string;
      };
  meta?: object;
  monoRepoManager?: string | null;
  project?: string;
  projectSettings?: {
    buildCommand?: string | null;
    commandForIgnoringBuildStep?: string | null;
    devCommand?: string | null;
    framework?: Framework;
  };
  installCommand?: string | null;
  nodeVersion?: string;
  outputDirectory?: string | null;
  rootDirectory?: string | null;
  serverlessFunction?: string | null;
  skipGitConnectDuringLink?: boolean;
  sourceFilesOutsideRootDirectory?: boolean;
  target?: "production" | "staging";
  withLatestCommit?: boolean;
};

export type CreateDeployment = {
  id: string;
  alias: string[];
  aliasAssigned: boolean;
  aliasAssignedAt: Record<string, string> | null | number | boolean;
  aliasError: Record<"code" | "message", string>;
  aliasFinal: string | null;
  aliasWarning: Record<"action" | "code" | "link" | "message", string> | null;
  alwaysRefuseToBuild: boolean;
  autoAssignCustomDomains: boolean;
  automaticAliases: [];
  bootedAt: number;
  build: Record<"env", []>;
  buildArtifactUrls: [];
  buildErrorAt: number;
  buildSkipped: boolean;
  buildAt: number;
  builds: [];
  createdAt: number;
  checksConclusion: "succeeded" | "failed" | "skipped" | "canceled";
  checksState: "registered" | "running" | "completed";
  connectBuildsEnabled: boolean;
  connectConfigurationId: string;
  createdIn: number;
  creator: Record<"avatar" | "uid" | "username", string>;
  crons: Record<"path" | "schedule", string>[];
  customEnvironment: Record<"id", string>;
  defaultRoute: string;
  deletedAt: number | null;
  env: [];
  version: number;
  userAliases: [];
  url: string;
  undeletedAt: number;
  type: "LAMBDAS";
  ttyBuildLogs: boolean;
  team: Record<"avatar" | "id" | "name" | "slug", string>;
  target: "staging" | "production" | null;
  status:
    | "CANCELED"
    | "ERROR"
    | "QUEUED"
    | "BUILDING"
    | "INITIALIZING"
    | "READY";
  source:
    | "cli"
    | "git"
    | "import"
    | "import/repo"
    | "clonne/repo"
    | "api-trigger-git-deploy"
    | "redeploy";
  softDeletedByRetention: boolean;
  routes: [] | null;
  regions: [];
  readySubstate: "STAGED" | "PROMOTED";
  readyStateReason: string;
  readyState:
    | "CANCELED"
    | "ERROR"
    | "QUEUED"
    | "BUILDING"
    | "INITIALIZING"
    | "READY";
  ready: number;
  public: boolean;
  projectSettings: Record<
    | "buildCommand"
    | "commandForIgnoringBuildStep"
    | "devCommand"
    | "framework"
    | "installCommand"
    | "outputDirectory"
    | "speednInsights"
    | "webAnalytics",
    string
  >;
  projectId: string;
  project: Record<"framework" | "id" | "name", string>;
  previewCommentsEnabled: boolean;
  plan: "pro" | "enterprise" | "hobby";
  passiveRegions: [];
  passiveConnectConfigurationId: string;
  ownerId: string;
  oidcTokensClaims: Record<
    | "aud"
    | "environment"
    | "iss"
    | "owner"
    | "owner_id"
    | "project"
    | "project_id"
    | "scope"
    | "sub",
    string
  >;
  name: string;
  monorepoManager: string;
  meta: object;
  lambdas: Record<
    | "createdAt"
    | "entrypoint"
    | "id"
    | "output"
    | "readyState"
    | "readtState"
    | "readyStateAt",
    any
  >;
  isInSystemBuildsQueue: boolean;
  isInConcurrentBuildsQueue: boolean;
  isFirstBranchDeployment: boolean;
  integrations: Record<
    "completedAt" | "skippedAt" | "skippedBy" | "startedAt" | "status",
    string
  >;
  inspectorUrl: string;
  initReadyAt: number;
  gitSource: Record<
    | "defaultBranch"
    | "name"
    | "namespace"
    | "ownerType"
    | "path"
    | "private"
    | "projectId"
    | "type"
    | "url"
    | "repo"
    | "repoId"
    | "repoOwnerId"
    | "slug"
    | "workspaceUuid",
    any
  >;
  gitRepo: Record<
    | "prId"
    | "ref"
    | "repoId"
    | "sha"
    | "type"
    | "org"
    | "projectId"
    | "workspaceUuuid"
    | "owner"
    | "repoUUid"
    | "slug",
    any
  >;
  functions: object;
  flags: any;
  errorStep: string;
  errorMessage: string | null;
  errorLink: string;
  errorCode: string;
};
