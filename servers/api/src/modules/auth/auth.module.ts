import { ExtendedModule } from "../extended";
import { User } from "../users/user.module";
import { signInWithIdToken } from "./auth.controller";

export class Auth extends ExtendedModule {
  signInWithIdToken = this.withDatabase(signInWithIdToken);

  readonly user = new User(this.database);
}
