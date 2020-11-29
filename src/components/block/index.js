import "./block.css";

import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import { handleKeyUp, handleKeyDown, handleFocuse, addSlash } from "./handlers";

function Block({ index, blocks, setBlocks, refs, titleRef, setAnchorEl }) {
  const block = blocks[index];

  const addButtonStyle = {
    opacity: block.focused ? 1 : 0,
    pointerEvents: block.focused ? "auto" : "none",
  };

  const addRefs = (el) => {
    const refAdded = refs.current.find((ref) => ref.el === el);

    if (el && !refAdded) {
      // adding and focusing the new element
      el.focus();
      refs.current.splice(index, 0, {
        el,
        cursorInfo: { node: el.childNodes[0], offSet: 0 },
      });
    }
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
      {block.extra}
      <div
        ref={addRefs}
        onKeyDown={handleKeyDown}
        onKeyUp={(e) =>
          handleKeyUp(index, e, blocks, setBlocks, titleRef, refs, setAnchorEl)
        }
        className="block"
        contentEditable
        data-id={block.id}
        //placeholder={blocks.length === 1 ? "Type '/' fro more" : ""}
      ></div>
    </div>
  );
}

export default Block;
