import { useState } from "react";
import "./block.css";

import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import { handleFocuse, addSlash } from "./handlers";
import Editable from "../editable";
import Toolbar from "../Toolbar";

function Block({
  index,
  blocks,
  setBlocks,
  refs,
  titleRef,
  setAnchorEl,
  lastFocused,
}) {
  // forcing the block to update (we put it here so the whole block updates (editable + toolbar))
  const [_, forceBlockUpdate] = useState(0);

  const block = blocks[index];

  const addButtonStyle = {
    opacity: block.focused ? 1 : 0,
    pointerEvents: block.focused ? "auto" : "none",
  };

  const showToolbar = block.focused;

  return (
    <div
      className="input-container"
      onFocus={() => handleFocuse(index, true, blocks, setBlocks, lastFocused)}
      onBlur={() => handleFocuse(index, false, blocks, setBlocks, lastFocused)}
    >
      {showToolbar ? (
        <Toolbar
          el={refs?.current[index]?.el}
          focusedNode={refs?.current[index]?.cursorInfo.node}
        />
      ) : null}
      {block.value || block.extra ? (
        <IconButton size="small" className="iconButton">
          <MoreVertIcon />
        </IconButton>
      ) : (
        <IconButton
          size="small"
          style={addButtonStyle}
          onClick={() => addSlash(index, blocks, setBlocks, refs, setAnchorEl)}
        >
          <AddIcon />
        </IconButton>
      )}
      <div style={{ margin: "auto", paddingRight: 10 }}>{block.extra}</div>
      <Editable
        TAG={block.TAG}
        index={index}
        refs={refs}
        blocks={blocks}
        setBlocks={setBlocks}
        titleRef={titleRef}
        setAnchorEl={setAnchorEl}
        forceBlockUpdate={forceBlockUpdate}
      />
    </div>
  );
}

export default Block;
