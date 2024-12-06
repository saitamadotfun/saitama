export { Secret } from "./secret";
export { ApiImpl } from "./apiImpl";

export const safeTry =
  <T extends (...args: any[]) => any>(fn: T) =>
  (...args: Parameters<T>): ReturnType<T> | null => {
    try {
      return fn(...args);
    } catch {
      return null;
    }
  };
