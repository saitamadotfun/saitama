import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";

export const createDB = <T extends typeof schema>(
  schema: T,
  connection: string
) => drizzle({ schema, connection });

export const db = createDB(schema, process.env.DATABASE_URL!);
export type Database = typeof db;
