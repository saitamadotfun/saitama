import type { Layer, ExtractProps } from "../lib";

export const getDefaultProps = <T extends Layer[]>(layers: T) => {
  const props = new Map<
    T[number]["key"],
    Map<
      T[number]["children"][number]["key"],
      Partial<ExtractProps<T[number]["children"][number]["argsType"]>>
    >
  >();

  for (const layer of layers) {
    props.set(layer.key, new Map());
    for (const child of layer.children)
      props.get(layer.key)!.set(child.key, child.args);
  }

  return props;
};

export const safeProps = async <T extends object | Promise<never>>(
  props: T
) => {
  const safeProps = await Promise.resolve(props).catch(() => ({}));

  return new Proxy(safeProps, {
    get(target, key) {
      if (key in target) return target[key as keyof typeof target];
      else return {};
    },
  }) as Record<string, any>;
};
