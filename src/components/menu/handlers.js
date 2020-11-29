export const handleClose = (
  selectedData,
  blocks,
  setBlocks,
  anchorEl,
  setAnchorEl
) => {
  setAnchorEl(null);
  // if nothing is chosen
  if (!selectedData) return;

  const { Type, value, extra } = selectedData;

  const index = blocks.findIndex(
    (block) => block.id === anchorEl.getAttribute("data-id")
  );

  const newItems = [...blocks];
  const selectedItem = { ...newItems[index] };

  selectedItem.Type = Type;
  selectedItem.extra = extra;
  selectedItem.value = "";
  selectedItem.readyToDelete = true;

  newItems[index] = selectedItem;

  // reseting the value innerHTML (using Refs)
  anchorEl.innerHTML = "";

  setBlocks(newItems);
};
