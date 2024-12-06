import { queryBuilder } from "../../core/db";
import { sites } from "../../db/schema";

export const sitesFilter = queryBuilder(sites, ["workspace", "deleted"]);
