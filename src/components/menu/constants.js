import { Checkbox } from "@material-ui/core";

export const ITEMS = {
  CHECKBOX: (checked, style) => <Checkbox checked={checked} style={style} />,
  LIST_ITEM: (style) => <span style={style}>•</span>,
};
