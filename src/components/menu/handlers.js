export const handleClose = (extra, items, setItems, anchorEl, setAnchorEl) => {
  setAnchorEl(null);
  // if nothing is chosen
  if (!extra) return;

  const index = items.findIndex(
    (item) => item.id === anchorEl.getAttribute("data-id")
  );

  const newItems = [...items];
  const selectedItem = { ...newItems[index] };

  selectedItem.extra = extra;
  selectedItem.value = "";
  selectedItem.readyToDelete = true;

  newItems[index] = selectedItem;

  setItems(newItems);
};
