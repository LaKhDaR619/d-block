import { useState } from "react";
import "./block.css";

import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import { handleFocuse, addSlash } from "./handlers";
import Editable from "../editable";
import Toolbar from "../Toolbar";
import { preventBlockFromLosingFocuse } from "../shared/helpers";

function Block({
  index,
  blocks,
  setBlocks,
  refs,
  titleRef,
  setAnchorEl,
  ...rest
}) {
  // forcing the block to update (we put it here so the whole block updates (editable + toolbar))
  // the reason we need to render because we have half of the site handled using refs and changing refs
  // doesn't update things like the toolbar that we are handling it using state
  const [_, set_] = useState(0);

  const forceBlockUpdate = () => set_(Math.random());

  const block = blocks[index];

  const showToolbar = block.focused && block.value !== "";
  const showAddButton =
    block.focused && block.value === "" && !block.extra && block.TAG === "p";

  return (
    <div
      className="input-container"
      onFocus={() =>
        handleFocuse(index, true, blocks, setBlocks, refs, forceBlockUpdate)
      }
      onBlur={() => handleFocuse(index, false, blocks, setBlocks, refs)}
      {...rest}
    >
      {showToolbar ? (
        <Toolbar
          el={refs?.current[index]?.el}
          focusedNode={refs?.current[index]?.cursorInfo?.node}
        />
      ) : null}
      {showAddButton ? (
        <IconButton
          size="small"
          onClick={() => addSlash(index, blocks, setBlocks, refs, setAnchorEl)}
          onMouseDownCapture={preventBlockFromLosingFocuse}
        >
          <AddIcon />
        </IconButton>
      ) : (
        <div style={{ width: 30 }} />
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
