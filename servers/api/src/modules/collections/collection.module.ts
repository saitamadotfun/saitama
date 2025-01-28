import { Module } from "../../core/module";
import {
  createCollection,
  getCollectionById,
  updateCollectionById,
} from "./collection.controller";

export class Collection extends Module {
  readonly createCollection = this.withDatabase(createCollection);
  readonly getCollectionById = this.withDatabase(getCollectionById);
  readonly updateCollectionById = this.withDatabase(updateCollectionById);
}
