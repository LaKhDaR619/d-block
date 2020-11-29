import React from "react";
import { handleKeyDown, handleKeyUp } from "../block/handlers";

function Editable({
  Type,
  index,
  blocks,
  setBlocks,
  titleRef,
  refs,
  setAnchorEl,
}) {
  const block = blocks[index];

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
    <Type
      ref={addRefs}
      onKeyDown={handleKeyDown}
      onKeyUp={(e) =>
        handleKeyUp(index, e, blocks, setBlocks, titleRef, refs, setAnchorEl)
      }
      className="block"
      contentEditable
      data-id={block.id}
    ></Type>
  );
}

export default Editable;

/* div
        ref={addRefs}
        onKeyDown={handleKeyDown}
        onKeyUp={(e) =>
          handleKeyUp(index, e, blocks, setBlocks, titleRef, refs, setAnchorEl)
        }
        className="block"
        contentEditable
        data-id={block.id}
        //placeholder={blocks.length === 1 ? "Type '/' fro more" : ""}
      ></div> */
