import {
  and,
  Column,
  eq,
  gt,
  gte,
  like,
  lt,
  lte,
  ne,
  or,
  sql,
  SQL,
  Table,
} from "drizzle-orm";
import { normalizeValue } from "./normalize";

export const Grammer = {
  eq,
  lt,
  lte,
  gt,
  gte,
  like,
  ne,
};

export const mapFilters = function (column: Column) {
  return (filters: string[], value: any) => {
    const queries: SQL[] = [];

    if (filters.length === 0) return eq(column, normalizeValue(column, value));

    for (const filter of filters) {
      if (filter in Grammer) {
        const grammer = Grammer[filter as unknown as keyof typeof Grammer](
          column,
          normalizeValue(column, value)
        );
        queries.push(grammer);
      } else queries.push(eq(column, value));
    }

    if (queries.length > 0) return or(...queries);
    return queries.at(0);
  };
};

export type QueryBuilder<T extends Table> = {
  [key in keyof T["_"]["columns"] | (string & {})]?: (
    filter: string[],
    value: string
  ) => SQL | undefined;
};

export const queryBuilder = <T extends Table, U extends T["_"]["columns"]>(
  table: T,
  columns: (keyof U)[],
  condition: typeof and | typeof or = and
) => {
  const builder: QueryBuilder<T> = Object.fromEntries(
    columns.map((column) => {
      const typedColumn = column as unknown as keyof T;
      if (typedColumn in table)
        return [column, mapFilters(table[typedColumn] as Column)];
      return [column, sql`${column}`];
    })
  );

  return (query: Record<string, string>) => {
    const sqlWrappers: (SQL | undefined)[] = [];

    for (const [key, value] of Object.entries(query)) {
      const [column, ...filters] = key.split("__");
      if (column in builder && builder[column]) {
        const results = builder[column](filters, value);
        sqlWrappers.push(results);
      }
    }
    if (sqlWrappers.length > 0) return condition(...sqlWrappers);

    return sqlWrappers.at(0);
  };
};
