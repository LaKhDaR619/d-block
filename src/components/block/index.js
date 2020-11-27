import "./block.css";

import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import { handleKeyUp, handleChange, handleFocuse, addSlash } from "./handlers";

function Block({ index, items, setItems, refs, titleRef, setAnchorEl }) {
  const item = items[index];
  const addButtonStyle = {
    opacity: item.focused ? 1 : 0,
    pointerEvents: item.focused ? "auto" : "none",
  };

  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      // adding and focusing the new element
      el.focus();
      refs.current.splice(index, 0, el);
    }
  };

  return (
    <div
      className="input-container"
      onFocus={() => handleFocuse(index, true, items, setItems)}
      onBlur={() => handleFocuse(index, false, items, setItems)}
    >
      {item.value || item.extra ? (
        <IconButton size="small" className="iconButton">
          <MoreVertIcon />
        </IconButton>
      ) : (
        <IconButton
          size="small"
          style={addButtonStyle}
          onClick={() => addSlash(index, items, setItems, refs, setAnchorEl)}
        >
          <AddIcon />
        </IconButton>
      )}
      {item.extra}
      <input
        ref={addRefs}
        onKeyUp={(e) =>
          handleKeyUp(index, e, items, setItems, titleRef, refs, setAnchorEl)
        }
        onChange={(e) =>
          handleChange(index, e, items, setItems, setAnchorEl, refs)
        }
        tabIndex={index}
        className="input"
        placeholder={items.length === 1 ? "Type '/' fro more" : ""}
        value={item.value}
        autoComplete="off"
        data-id={item.id}
      />
    </div>
  );
}

export default Block;
