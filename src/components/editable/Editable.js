import React, { useRef } from "react";
import "./editable.css";
import { handleInput, handleKeyDown, handleKeyUp } from "./handlers";

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
  const keyCodeRef = useRef(0);

  const block = blocks[index];

  const addRefs = (el) => {
    const refAdded = refs.current.find((ref) => ref.el === el);

    if (el && !refAdded) {
      el.innerHTML = block.value;
      // adding and focusing the new element
      el.focus();
      refs.current.splice(index, 0, {
        el,
        cursorInfo: { node: el, offSet: 0 },
      });
    }
  };

  const handleMouseUp = () => {
    // setCursorInfo(refs, index);
    // forcing the block to update because changing the refs (HTML) doesn't update react controled components
    forceBlockUpdate();
  };

  return (
    <TAG
      data-id={block.id}
      contentEditable
      suppressContentEditableWarning={true}
      style={block.style}
      className="block"
      ref={addRefs}
      onKeyDown={(e) =>
        handleKeyDown(e, keyCodeRef, index, blocks, setBlocks, refs, titleRef)
      }
      onInput={(e) =>
        handleInput(e, keyCodeRef, index, blocks, setBlocks, refs)
      }
      onMouseUp={handleMouseUp}
    />
  );
}

export default Editable;
