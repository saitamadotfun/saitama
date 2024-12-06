import type ImageKit from "imagekit";
import type { FastifyInstance } from "fastify";

import type { Database } from "../db";
import type { Bumfi, Vercel } from "../lib";

import { Auth } from "./auth/auth.module";
import { User } from "./users/user.module";
import { Site } from "./sites/site.module";
import { Asset } from "./assets/asset.module";
import { Domain } from "./domains/domain.module";
import { Member } from "./members/member.module";
import { Webhook } from "./webhooks/webhook.module";
import { Template } from "./templates/template.module";
import { Workspace } from "./workspaces/workspace.module";
import { Deployment } from "./deployments/deployment.module";

import { AuthRoute } from "./auth/auth.route";
import { UserRoute } from "./users/user.route";
import { SiteRoute } from "./sites/site.route";
import { AssetRoute } from "./assets/asset.route";
import { DomainRoute } from "./domains/domain.route";
import { MemberRoute } from "./members/member.route";
import { WebhookRoute } from "./webhooks/webhook.route";
import { TemplateRoute } from "./templates/template.route";
import { WorkspaceRoute } from "./workspaces/workspace.route";
import { DeploymentRoute } from "./deployments/deployment.route";
import { PaymentRoute } from "./payments/payment.route";
import { Payment } from "./payments/payment.module";

export default class Module {
  readonly auth: Auth;
  readonly user: User;
  readonly site: Site;
  readonly asset: Asset;
  readonly domain: Domain;
  readonly member: Member;
  readonly webhook: Webhook;
  readonly payment: Payment;
  readonly template: Template;
  readonly workspace: Workspace;
  readonly deployment: Deployment;

  constructor(
    private readonly database: Database,
    private readonly fastify: FastifyInstance,
    private readonly vercel: Vercel,
    private readonly bumfi: Bumfi,
    private readonly imagekit: ImageKit
  ) {
    this.user = new User(this.database);
    this.member = new Member(this.database);

    this.asset = new Asset(this.imagekit, this.database);

    this.domain = new Domain(this.vercel, this.database);
    this.site = new Site(this.vercel, this.bumfi, database);
    this.auth = new Auth(this.vercel, this.bumfi, this.database);
    this.deployment = new Deployment(this.vercel, this.database);
    this.webhook = new Webhook(this.vercel, this.bumfi, database);
    this.template = new Template(this.vercel, this.bumfi, database);
    this.workspace = new Workspace(this.vercel, this.bumfi, database);
    this.payment = new Payment(this.vercel, this.bumfi, this.database);
  }

  registerRoutes() {
    const routes = [
      new AuthRoute(this.auth, this.fastify),
      new UserRoute(this.user, this.fastify),
      new SiteRoute(this.site, this.fastify),
      new AssetRoute(this.asset, this.fastify),
      new MemberRoute(this.member, this.fastify),
      new DomainRoute(this.domain, this.fastify),
      new PaymentRoute(this.payment, this.fastify),
      new WebhookRoute(this.webhook, this.fastify),
      new TemplateRoute(this.template, this.fastify),
      new WorkspaceRoute(this.workspace, this.fastify),
      new DeploymentRoute(this.deployment, this.fastify),
    ];
    routes.map((route) => route.registerRoutes());
  }
}
