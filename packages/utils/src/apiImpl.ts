import { join } from "path";
import { joinPath, XiorInstance } from "xior";

export abstract class ApiImpl {
  protected abstract path: string;

  constructor(protected readonly xior: XiorInstance) {}

  protected readonly buildPath = (...path: string[]) => {
    return joinPath(this.path, join(...path));
  };

  protected readonly buildPathWithQuery = <T extends object>(
    path: string,
    query?: T
  ) => {
    const q = new URLSearchParams(query as Record<string, string>);
    return path + "?" + q.toString();
  };
}
