import clsx from "clsx";
import type { Props } from "../../lib";

type WithLabelProps<
  T extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>
    | ((...args: any[]) => React.ReactNode)
> = Pick<Props, "title" | "description"> & React.ComponentProps<T>;

export default function withLabel<
  T extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>
    | ((...args: any[]) => React.ReactNode)
>(
  component: T,
  {
    inline,
    showDescription,
  }: { inline?: boolean; showDescription?: boolean } = {
    inline: false,
    showDescription: true,
  }
) {
  return ({ title, description, ...props }: WithLabelProps<T>) => {
    const As = component;
    return (
      <div
        className={clsx(
          "flex",
          inline ? "flex-row items-center space-x-2" : " flex-col space-y-2"
        )}
      >
        <label>
          <p className="capitalize">{title}</p>
          {showDescription && (
            <p className="text-xs text-black/75">{description}</p>
          )}
        </label>
        <As
          {...(props as any)}
          description={description}
        />
      </div>
    );
  };
}
