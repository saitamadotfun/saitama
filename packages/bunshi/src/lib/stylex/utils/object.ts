export const mergeObject = <T extends object, U extends object>(
  a: T,
  b: U
): T => {
  const result = {} as Record<keyof T, any>;

  const compare = <T extends unknown, U extends unknown>(
    oldValue: T,
    newValue: U
  ) => {
    if (oldValue && newValue && typeof newValue === "object")
      return mergeObject(oldValue, newValue);
    else if (oldValue && oldValue !== newValue) return newValue;
    else if (newValue) return newValue;
    return oldValue;
  };

  for (const [key, value] of Object.entries(b)) {
    if (Array.isArray(value))
      result[key as keyof T] = value.map((value, index) => {
        const oldValue = (a[key as keyof T] as any[])[index];
        return compare(oldValue, value);
      });
    else if (typeof value === "object")
      result[key as keyof T] = mergeObject(a[key as keyof T] as object, value);
    else result[key as keyof T] = compare(a[key as keyof T], value);
  }

  return result;
};
