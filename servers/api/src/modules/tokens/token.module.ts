import { Module } from "../../core/module";
import { createToken, getTokenById } from "./token.controller";

export class Token extends Module {
  readonly createToken = this.withDatabase(createToken);
  readonly getTokenById = this.withDatabase(getTokenById);
}
