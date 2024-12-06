import type { Props } from "../../lib";

import Map from "./Map";
import List from "./List";
import Asset from "./Asset";
import Color from "./Color";
import Radio from "./Radio";
import Input from "./Input";
import Switch from "./Switch";
import Select from "./Select";

type Args<T> = {
  value: T;
  onChange: (value: T) => void;
} & Props;

export default function Control({ ...props }: Args<any>) {
  props.value;
  switch (props.control) {
    case "color":
      return <Color {...props} />;
    case "input":
      return <Input {...props} />;
    case "radio":
      return <Radio {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "select":
      return <Select {...props} />;
    case "map":
      return <Map {...props} />;
    case "list":
      return <List {...props} />;
    case "asset":
      return <Asset {...props} />;
  }
}
