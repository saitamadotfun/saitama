import { ApiImpl } from "@saitamadotfun/utils";
import type {
  CreatePlanArgs,
  ListArgs,
  Paginated,
  Plan,
  Response,
} from "../models";

export class PlanApi extends ApiImpl {
  protected readonly path = "plan";

  readonly list = (args?: Record<keyof ListArgs, string>) => {
    return this.xior.get<Paginated<Plan>>(
      this.buildPathWithQuery(this.path, args)
    );
  };

  readonly create = (data: CreatePlanArgs) => {
    return this.xior.post<Response<Plan>>(this.path, data);
  };

  readonly retrieve = (id: Plan["id"]) => {
    return this.xior.get<Response<Plan>>(this.buildPath(id));
  };
}
