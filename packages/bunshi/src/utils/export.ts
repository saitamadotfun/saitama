export const toPlainObject = <T extends object>(value: T): object => {
  if (value instanceof Map)
    return Object.fromEntries(
      value.entries().map(([key, value]) => [key, toPlainObject(value)])
    );
  if (value instanceof Array) return value.map(toPlainObject);
  else return value;
};
