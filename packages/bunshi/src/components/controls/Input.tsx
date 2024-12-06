import { getLocaleValue, type Props, type InputProps } from "../../lib";

import withLabel from "./WithLabel";

type ExtendedInputProps = {
  value: string;
  onChange: (value: string) => void;
} & Pick<InputProps, "inputType" | "type"> &
  Pick<Props, "description">;

export default withLabel(
  function Input({
    value,
    description,
    onChange,
    inputType,
    type,
  }: ExtendedInputProps) {
    const As = inputType ?? "input";
    return (
      <div className="flex border border-black rounded focus-within:ring-3 focus-within:ring-black/50">
        <As
          type={type}
          placeholder={getLocaleValue(description)}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 bg-transparent p-2 outline-none placeholder-black/50"
        />
      </div>
    );
  },
  { showDescription: false }
);
