import React from "react";
import "./editable.css";
import { handleKeyDown, handleKeyUp } from "../block/handlers";
import { setCursorInfo } from "../shared/helpers";

function Editable({
  TAG,
  index,
  blocks,
  setBlocks,
  titleRef,
  refs,
  setAnchorEl,
  forceBlockUpdate,
}) {
  const block = blocks[index];

  const addRefs = (el) => {
    const refAdded = refs.current.find((ref) => ref.el === el);

    if (el && !refAdded) {
      console.log(el);
      console.log(el.childNodes);

      // adding and focusing the new element
      el.focus();
      refs.current.splice(index, 0, {
        el,
        cursorInfo: { node: el, offSet: 0 },
      });
    }
  };

  const handleMouseUp = () => {
    setCursorInfo(refs, index);
    // forcing the block to update because changing the refs (HTML) doesn't update react controled components
    forceBlockUpdate(Math.random);
  };

  return (
    <TAG
      ref={addRefs}
      onKeyDown={handleKeyDown}
      onKeyUp={(e) =>
        handleKeyUp(index, e, blocks, setBlocks, titleRef, refs, setAnchorEl)
      }
      className="block"
      contentEditable
      data-id={block.id}
      onMouseUp={handleMouseUp}
      style={block.style}
    ></TAG>
  );
}

export default Editable;
