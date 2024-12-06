import xior, { type XiorInstance } from "xior";
import {
  AssetApi,
  AuthApi,
  CollectionApi,
  DeploymentApi,
  DomainApi,
  MemberApi,
  PaymentApi,
  SiteApi,
  TemplateApi,
  UserApi,
  WorkspaceApi,
} from "./api";

export * from "./models";

export class Api {
  private readonly xior: XiorInstance;
  readonly auth: AuthApi;
  readonly user: UserApi;
  readonly site: SiteApi;
  readonly asset: AssetApi;
  readonly domain: DomainApi;
  readonly member: MemberApi;
  readonly payment: PaymentApi;
  readonly template: TemplateApi;
  readonly workspace: WorkspaceApi;
  readonly collection: CollectionApi;
  readonly deployment: DeploymentApi;

  constructor(
    baseURL: string,
    accessToken?: string | null,
    keyword: string = "Bearer"
  ) {
    this.xior = xior.create({
      baseURL,
      headers: {
        Authorization: keyword + " " + accessToken,
      },
    });

    this.auth = new AuthApi(this.xior);
    this.user = new UserApi(this.xior);
    this.site = new SiteApi(this.xior);
    this.asset = new AssetApi(this.xior);
    this.domain = new DomainApi(this.xior);
    this.member = new MemberApi(this.xior);
    this.payment = new PaymentApi(this.xior);
    this.template = new TemplateApi(this.xior);
    this.workspace = new WorkspaceApi(this.xior);
    this.collection = new CollectionApi(this.xior);
    this.deployment = new DeploymentApi(this.xior);
  }
}
