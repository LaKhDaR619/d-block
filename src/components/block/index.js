import "./block.css";

import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";

import { handleKeyUp, handleChange, handleFocuse, addSlash } from "./handlers";

function Block({ index, items, setItems, refs, titleRef }) {
  const item = items[index];

  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
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
          style={{
            opacity: item.focused ? 1 : 0,
            pointerEvents: item.focused ? "auto" : "none",
          }}
          onClick={() => addSlash(index, items, setItems)}
        >
          <AddIcon />
        </IconButton>
      )}
      {item.extra}
      <input
        ref={addRefs}
        onKeyUp={(e) => handleKeyUp(index, e, items, setItems, titleRef, refs)}
        onChange={(e) => handleChange(index, e, items, setItems)}
        tabIndex={index}
        className="input"
        placeholder={items.length === 1 ? "Type '/' fro more" : ""}
        data-id={item.id}
        value={item.value}
        autoComplete="off"
      />
    </div>
  );
}

export default Block;
