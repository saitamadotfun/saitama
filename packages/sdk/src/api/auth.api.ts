import { ApiImpl } from "@saitamadotfun/utils";
import type { UserAndToken } from "../models";

export class AuthApi extends ApiImpl {
  protected readonly path = "auth";

  signInWithIdToken(
    idToken: string,
    query?: Record<"siteId" | (string & {}), string>
  ) {
    return this.xior.post<UserAndToken>(
      this.buildPathWithQuery(this.buildPath("idToken"), query),
      { idToken }
    );
  }
}
