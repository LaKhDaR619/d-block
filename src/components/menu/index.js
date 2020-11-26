import React, { useState } from "react";
import { MenuItem, Menu, Checkbox } from "@material-ui/core";

import { handleClose } from "../shared/handlers";

function MyMenu({ items, setItems }) {
  // menu
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Menu
      id="simple-menu"
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
          handleClose(<Checkbox />, items, setItems, anchorEl, setAnchorEl)
        }
      >
        <Checkbox checked={false} />
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleClose(
            <span style={{ fontSize: 25, margin: "auto", paddingRight: 10 }}>
              •
            </span>,
            items,
            setItems,
            anchorEl,
            setAnchorEl
          )
        }
      >
        <span style={{ fontSize: 25, margin: "auto" }}>•</span>
      </MenuItem>
    </Menu>
  );
}

export default MyMenu;
