import React from "react";
import { MenuItem, Menu } from "@material-ui/core";

import { handleClose } from "./handlers";
import { ITEMS } from "./constants";

function MyMenu({ blocks, setBlocks, anchorEl, setAnchorEl }) {
  const { CHECKBOX, BULLETED_LIST, NUMBERED_LIST, H1, H2, H3 } = ITEMS;
  const styles = {
    listItemStyle: { fontSize: 25, margin: "auto", paddingRight: 10 },
  };

  const selectedData = { TAG: "p", type: "Paragraph", extra: null, style: {} };

  const selectItem = (selectedData) => {
    handleClose(setAnchorEl, selectedData, blocks, setBlocks, anchorEl);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => handleClose(setAnchorEl)}
      style={{
        top: 40,
      }}
    >
      <MenuItem
        onClick={() =>
          selectItem({ ...selectedData, extra: CHECKBOX(), type: "CheckBox" })
        }
      >
        {CHECKBOX(false)}
      </MenuItem>
      <MenuItem
        onClick={() =>
          selectItem({
            ...selectedData,
            type: "Bulleted List",
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
            type: "Numbered List",
            extra: NUMBERED_LIST(),
          })
        }
      >
        {NUMBERED_LIST()}
      </MenuItem>
      <MenuItem
        onClick={() =>
          selectItem({
            ...selectedData,
            TAG: H1(),
            type: "Header",
            style: { fontWeight: "bold" },
          })
        }
      >
        {H1()}
      </MenuItem>
      <MenuItem
        onClick={() =>
          selectItem({
            ...selectedData,
            TAG: H2(),
            type: "Header",
            style: { fontWeight: "bold" },
          })
        }
      >
        {H2()}
      </MenuItem>
      <MenuItem
        onClick={() =>
          selectItem({
            ...selectedData,
            TAG: H3(),
            type: "Header",
            style: { fontWeight: "bold" },
          })
        }
      >
        {H3()}
      </MenuItem>
    </Menu>
  );
}

export default MyMenu;
