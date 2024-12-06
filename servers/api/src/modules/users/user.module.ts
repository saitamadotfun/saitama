import { Module } from "../../core/module";
import {
  createUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "./user.controller";

export class User extends Module {
  readonly createUser = this.withDatabase(createUser);
  readonly getUserById = this.withDatabase(getUserById);
  readonly updateUserById = this.withDatabase(updateUserById);
  readonly deleteUserById = this.withDatabase(deleteUserById);
}
