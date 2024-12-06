import { ApiImpl } from "@saitamadotfun/utils";
import type {
  AddDomain,
  AddDomainArgs,
  CreateProject,
  CreateProjectArgs,
  CreateProjectQuery,
  Env,
} from "../models/project.model";

export class ProjectApi extends ApiImpl {
  protected readonly path = "v10/projects";

  create(args: CreateProjectArgs, query?: CreateProjectQuery) {
    return this.xior.post<CreateProject>(
      this.buildPathWithQuery(this.path, query),
      args
    );
  }

  addDomain(
    projectId: CreateProject["id"],
    args: AddDomainArgs,
    query?: CreateProjectQuery
  ) {
    return this.xior.post<AddDomain>(
      this.buildPathWithQuery(this.buildPath(projectId, "domains"), query),
      args
    );
  }

  getDomain(
    projectId: CreateProject["id"],
    domain: string,
    query?: CreateProjectQuery
  ) {
    return this.xior.get<AddDomain>(
      this.buildPathWithQuery(
        this.buildPath(projectId, "domains", domain),
        query
      )
    );
  }

  getDomains(projectId: CreateProject["id"], query?: CreateProjectQuery) {
    return this.xior.get(
      this.buildPathWithQuery(this.buildPath(projectId, "domains"), query)
    );
  }

  updateDomain(
    projectId: CreateProject["id"],
    domain: string,
    args: Partial<Omit<AddDomainArgs, "name">>,
    query?: CreateProjectQuery
  ) {
    return this.xior.patch<AddDomain>(
      this.buildPathWithQuery(
        this.buildPath(projectId, "domains", domain),
        query
      ),
      args
    );
  }

  verifyDomain(
    projectId: CreateProject["id"],
    domain: string,
    query?: CreateProjectQuery
  ) {
    return this.xior.post<AddDomain>(
      this.buildPathWithQuery(
        this.buildPath(projectId, "domains", domain, "verify"),
        query
      )
    );
  }

  deleteDomain(
    projectId: CreateProject["id"],
    domain: string,
    query?: CreateProjectQuery
  ) {
    return this.xior.delete<object>(
      this.buildPathWithQuery(
        this.buildPath(projectId, "domains", domain),
        query
      )
    );
  }

  addEnvironmentVariable(
    id: CreateProject["id"],
    args: Env,
    query?: CreateProjectQuery
  ) {
    return this.xior.post(
      this.buildPathWithQuery(this.buildPath(id, "env"), query),
      args
    );
  }

  delete(id: CreateProject["id"], query?: CreateProjectQuery) {
    return this.xior.delete(this.buildPathWithQuery(id, query));
  }
}
