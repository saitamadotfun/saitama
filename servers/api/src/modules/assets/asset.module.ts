import type ImageKit from "imagekit";
import { Module } from "../../core/module";
import {
  createAsset,
  deleteAssetByUserAndId,
  getAssetsByUser,
} from "./asset.controller";

export class Asset extends Module {
  readonly createAsset = this.withDatabase(createAsset);
  readonly getAssetsByUser = this.withDatabase(getAssetsByUser);
  readonly deleteAssetByUserAndId = this.withDatabase(deleteAssetByUserAndId);

  constructor(
    readonly imagekit: ImageKit,
    ...args: ConstructorParameters<typeof Module>
  ) {
    super(...args);
  }
}
