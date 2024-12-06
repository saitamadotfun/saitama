import { ApiImpl } from "@saitamadotfun/utils";
import type { Customer, CustomerArgs, Response } from "../models";

export class CustomerApi extends ApiImpl {
  path = "v1/customers";

  retrieve(id: Customer["id"]) {
    return this.xior.get<Response<Customer>>(this.buildPath(id));
  }

  create(args: CustomerArgs) {
    return this.xior.post<Response<Customer>>(this.path, args);
  }
}
