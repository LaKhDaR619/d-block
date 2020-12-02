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

  const newItems = [...blocks];
  const selectedItem = { ...newItems[index] };

  selectedItem.TAG = TAG;
  selectedItem.type = type;
  selectedItem.style = style;
  selectedItem.extra = extra;
  selectedItem.value = "";
  selectedItem.readyToDelete = true;

  newItems[index] = selectedItem;

  // reseting the value innerHTML (using Refs)
  anchorEl.innerHTML = "";
  anchorEl.focus();

  setBlocks(newItems);
};
