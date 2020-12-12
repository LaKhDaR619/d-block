import { isNumber, addingToNumberedList } from "../shared/helpers";

export const handleClose = (
  setAnchorEl,
  selectedData,
  blocks,
  setBlocks,
  anchorEl
) => {
  setAnchorEl(null);
  // if nothing is chosen
  if (!selectedData) return;

  const { TAG, type, extra, style } = selectedData;

  const index = blocks.findIndex(
    (block) => block.id === anchorEl.getAttribute("data-id")
  );

  let newBlocks = [...blocks];
  const selectedBlock = { ...newBlocks[index] };

  selectedBlock.TAG = TAG;
  selectedBlock.type = type;
  selectedBlock.style = style;
  selectedBlock.extra = extra;
  selectedBlock.value = "";
  selectedBlock.readyToDelete = true;

  newBlocks[index] = selectedBlock;

  // reseting the value innerHTML (using Refs)
  anchorEl.innerHTML = "";
  anchorEl.focus();

  // checking the numbered lists
  if (isNumber(extra)) {
    newBlocks = addingToNumberedList(newBlocks, index, extra);
  }

  setBlocks(newBlocks);
};
