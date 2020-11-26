export const focuseByRef = (ref) => {
  if (ref) ref.focus();
};

export const handleClose = (extra, items, setItems, anchorEl, setAnchorEl) => {
  setAnchorEl(null);
  // if nothing is chosen
  if (!extra) return;

  const newItems = [...items];
  setItems(
    newItems.map((item) => {
      if (item.id === anchorEl.getAttribute("id")) {
        item.extra = extra;
        item.value = "";
        item.readyToDelete = true;
      }
      return item;
    })
  );
};
