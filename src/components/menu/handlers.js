export const handleClose = (
  extra,
  blocks,
  setBlocks,
  anchorEl,
  setAnchorEl
) => {
  setAnchorEl(null);
  // if nothing is chosen
  if (!extra) return;

  const index = blocks.findIndex(
    (item) => item.id === anchorEl.getAttribute("data-id")
  );

  const newItems = [...blocks];
  const selectedItem = { ...newItems[index] };

  selectedItem.extra = extra;
  selectedItem.value = "";
  selectedItem.readyToDelete = true;

  newItems[index] = selectedItem;

  setBlocks(newItems);
};
