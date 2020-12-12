import { handleForwardSlashKey } from "../editable/handlers";
import { setCursorInfo } from "../shared/helpers";

export const handleFocuse = (
  index,
  focused,
  blocks,
  setBlocks,
  refs,
  forceBlockUpdate
) => {
  let newBlocks = [...blocks];
  const selectedBlock = { ...blocks[index] };

  // we have a problem with uodating the state twice, react only takes the last update
  // so i'm working around it by setting all other blocks to !focused
  if (focused) {
    // change the selection place
    document.onselectionchange = function () {
      setCursorInfo(refs, index);
      forceBlockUpdate();
    };
    // handling the focused state
    newBlocks = newBlocks.map((block) => {
      block.focused = block.id === selectedBlock.id;

      return block;
    });
  } else {
    selectedBlock.focused = focused;
    newBlocks[index] = selectedBlock;
    document.onselectionchange = null;
  }

  setBlocks(newBlocks);
};

export const addSlash = (index, blocks, setBlocks, refs, setAnchorEl) => {
  handleForwardSlashKey(index, blocks, setBlocks, refs, setAnchorEl, true);
};
