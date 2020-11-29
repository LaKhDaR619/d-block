import { Checkbox } from "@material-ui/core";

export const ITEMS = {
  CHECKBOX: (checked, style) => <Checkbox checked={checked} style={style} />,
  BULLETED_LIST: (style) => <span style={style}>•</span>,
  NUMBERED_LIST: () => 1,
  H1: () => "H1",
  H2: () => "H2",
  H3: () => "H3",
};
