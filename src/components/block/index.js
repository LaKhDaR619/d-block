import "./block.css";

import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import { handleFocuse, addSlash } from "./handlers";
import Editable from "../editable";

function Block({ index, blocks, setBlocks, refs, titleRef, setAnchorEl }) {
  const block = blocks[index];

  const addButtonStyle = {
    opacity: block.focused ? 1 : 0,
    pointerEvents: block.focused ? "auto" : "none",
  };

  return (
    <div
      className="input-container"
      onFocus={() => handleFocuse(index, true, blocks, setBlocks)}
      onBlur={() => handleFocuse(index, false, blocks, setBlocks)}
    >
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
        Type={block.Type}
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
