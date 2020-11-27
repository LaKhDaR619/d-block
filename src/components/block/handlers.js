import _uniqueId from "lodash/uniqueId";

const ENTER_KEY = 13;
const BACK_KEY = 8;
const FORWARD_SLASH_KEY = 111;

export const handleChange = (index, event, items, setItems) => {
  const { value } = event.target;

  // spreading the array and the object
  const newItems = [...items];
  const item = { ...items[index] };

  //if (value === "/" && !item.extra) setAnchorEl(refs.current[index]);

  item.value = value;
  item.readyToDelete = false;

  newItems[index] = item;

  setItems(newItems);
};

export const handleFocuse = (index, focused, items, setItems) => {
  const newItems = [...items];
  const item = { ...items[index] };

  item.focused = focused;
  newItems[index] = item;

  setItems(newItems);
};

export const addSlash = (index, items, setItems, refs, setAnchorEl) =>
  handleForwardSlashKey(index, items, setItems, refs, setAnchorEl, true);

export const handleKeyUp = (
  index,
  event,
  items,
  setItems,
  titleRef,
  refs,
  setAnchorEl
) => {
  switch (event.keyCode) {
    case ENTER_KEY:
      handleEnterKey(index, items, setItems);
      break;
    case BACK_KEY:
      handleBackKey(index, items, setItems, refs, titleRef);
      break;
    case FORWARD_SLASH_KEY:
      handleForwardSlashKey(index, items, setItems, refs, setAnchorEl, false);
      break;
    default:
      return;
  }
};

// handling key Ups
const handleEnterKey = (index, items, setItems) => {
  const newItems = [...items];
  const selectedItem = { ...newItems[index] };
  const { value, extra } = selectedItem;

  const newInput = {
    id: _uniqueId("prefix-"),
    value: "",
    focused: true,
    readyToDelete: true,
    extra: extra,
  };

  // in case we have extra and the value is empty
  // we don't add an item and just remove the extra and return
  if (extra && !value) {
    selectedItem.extra = null;
    newItems[index] = selectedItem;
    return setItems(newItems);
  }

  // if we have a value
  selectedItem.focused = false;
  newItems[index] = selectedItem;
  newItems.splice(index + 1, 0, newInput);

  setItems(newItems);
};

const handleBackKey = (index, items, setItems, refs, titleRef) => {
  const newItems = [...items];
  const selectedItem = { ...newItems[index] };
  const { value, extra } = selectedItem;

  // we don't delete directly because the value at first is empty
  // and we want to allow for empty inputs
  if (selectedItem.readyToDelete) {
    // if there is an extra we just remove it
    if (extra) {
      selectedItem.extra = null;
      newItems[index] = selectedItem;

      setItems(newItems);
      return;
    }

    // we always leave at least one item
    if (newItems.length === 1) {
      titleRef.current.focus();
      return;
    }

    // delete The Item
    newItems.splice(index, 1);
    // delete The Ref
    refs.current.splice(index, 1);

    if (index > 0) refs.current[index - 1].focus();
    else if (index === 0) titleRef.current.focus();

    setItems(newItems);
  }
  // if the value just became '' we don't delete the block directly
  // so the user can have empty valued blocks
  else if (value === "") {
    // put the ready to Delete flag
    selectedItem.readyToDelete = true;
    newItems[index] = selectedItem;
    setItems(newItems);
  }
};

const handleForwardSlashKey = (
  index,
  items,
  setItems,
  refs,
  setAnchorEl,
  ignorValue
) => {
  if (ignorValue) {
    // if ignore value, that means we want to open the menu using the button
    // we simply add a '/' and show the menu
    const newItems = [...items];
    const selectedItem = { ...newItems[index] };

    selectedItem.value = "/";
    newItems[index] = selectedItem;

    setItems(newItems);
    setAnchorEl(refs.current[index]);
  } else {
    // else if we came from the keyup function then we check the value
    const { value } = items[index];
    if (value === "/") setAnchorEl(refs.current[index]);
  }
};
