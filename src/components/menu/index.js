import React from "react";
import { MenuItem, Menu } from "@material-ui/core";

import { handleClose } from "./handlers";
import { ITEMS } from "./constants";

function MyMenu({ blocks, setBlocks, anchorEl, setAnchorEl }) {
  const { CHECKBOX, BULLETED_LIST, NUMBERED_LIST, H1, H2, H3 } = ITEMS;
  const styles = {
    listItemStyle: { fontSize: 25, margin: "auto", paddingRight: 10 },
  };

  const selectedData = { Type: "p", value: "", extra: null };

  const selectItem = (selectedData) => {
    handleClose(selectedData, blocks, setBlocks, anchorEl, setAnchorEl);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => handleClose(null)}
      style={{
        top: 40,
      }}
    >
      <MenuItem
        onClick={() => selectItem({ ...selectedData, extra: CHECKBOX() })}
      >
        {CHECKBOX(false)}
      </MenuItem>
      <MenuItem
        onClick={() =>
          selectItem({
            ...selectedData,
            extra: BULLETED_LIST(styles.listItemStyle),
          })
        }
      >
        {BULLETED_LIST({ fontSize: 25, margin: "auto", paddingRight: 10 })}
      </MenuItem>
      <MenuItem
        onClick={() =>
          selectItem({
            ...selectedData,
            extra: NUMBERED_LIST(),
          })
        }
      >
        {NUMBERED_LIST()}
      </MenuItem>
      <MenuItem onClick={() => selectItem({ ...selectedData, Type: H1() })}>
        {H1()}
      </MenuItem>
      <MenuItem onClick={() => selectItem({ ...selectedData, Type: H2() })}>
        {H2()}
      </MenuItem>
      <MenuItem onClick={() => selectItem({ ...selectedData, Type: H3() })}>
        {H3()}
      </MenuItem>
    </Menu>
  );
}

export default MyMenu;
