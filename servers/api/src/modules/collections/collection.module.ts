import { Module } from "../../core/module";
import {
  createCollection,
  updateCollectionById,
} from "./collection.controller";

export class Collection extends Module {
  readonly createCollection = this.withDatabase(createCollection);
  readonly updateCollectionById = this.withDatabase(updateCollectionById);
}
