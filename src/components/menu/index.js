import React from "react";
import { MenuItem, Menu } from "@material-ui/core";

import { handleClose } from "./handlers";
import { ITEMS } from "./constants";

function MyMenu({ items, setItems, anchorEl, setAnchorEl }) {
  const { CHECKBOX, LIST_ITEM } = ITEMS;
  const styles = {
    listItemStyle: { fontSize: 25, margin: "auto", paddingRight: 10 },
  };

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => handleClose(null, items, setItems, anchorEl, setAnchorEl)}
      style={{
        top: 40,
      }}
    >
      <MenuItem
        onClick={() =>
          handleClose(CHECKBOX(), items, setItems, anchorEl, setAnchorEl)
        }
      >
        {CHECKBOX(false)}
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleClose(
            LIST_ITEM(styles.listItemStyle),
            items,
            setItems,
            anchorEl,
            setAnchorEl
          )
        }
      >
        {LIST_ITEM({ fontSize: 25, margin: "auto", paddingRight: 10 })}
      </MenuItem>
    </Menu>
  );
}

export default MyMenu;
