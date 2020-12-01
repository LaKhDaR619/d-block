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
  const block = blocks[index];

  const addButtonStyle = {
    opacity: block.focused ? 1 : 0,
    pointerEvents: block.focused ? "auto" : "none",
  };

  const showToolbar = lastFocused.current === index;

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
      />
    </div>
  );
}

export default Block;
