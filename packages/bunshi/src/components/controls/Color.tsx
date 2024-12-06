import color from "color";
import { MdOpacity } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";

import withLabel from "./WithLabel";

type ColorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default withLabel(function Color({ value, onChange }: ColorProps) {
  const clr = useMemo(() => color(value), [value]);

  const [hex, setHex] = useState(clr.hex());
  const [alpha, setAlpha] = useState(clr.alpha() * 100);

  useEffect(() => {
    try {
      onChange(
        color(hex)
          .alpha(alpha / 100)
          .hexa()
          .toString()
      );
    } catch {}
  }, [hex, alpha]);

  return (
    <div className="flex space-x-4">
      <div className="flex-1 flex space-x-2 items-center border px-2 rounded-md focus-within:border-black">
        <div
          className="size-6 rounded shadow"
          style={{ background: value }}
        />
        <input
          value={hex}
          onChange={(event) => {
            const value = event.target.value;
            setHex(value);
          }}
          className="flex-1 w-full bg-transparent py-2"
        />
      </div>
      <div className="flex items-center border px-2 rounded focus-within:border-black">
        <input
          type="number"
          value={alpha}
          max={100}
          min={0}
          onChange={(event) => {
            const value = event.target.value;
            setAlpha(Number(value));
          }}
          className="flex-1 bg-transparent py-2"
        />
        <MdOpacity />
      </div>
    </div>
  );
});
