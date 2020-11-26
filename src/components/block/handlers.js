import _uniqueId from "lodash/uniqueId";
import { focuseByRef } from "../shared/handlers";

export const handleKeyUp = (index, event, items, setItems, titleRef, refs) => {
  const newItems = [...items];
  const selectedItem = { ...newItems[index] };
  const { id, value, extra } = selectedItem;

  // back key
  if (event.keyCode === 8) {
    // we don't delete directly because the value at first is empty
    // and we want to allow for empty inputs
    if (selectedItem.readyToDelete) {
      if (extra) {
        selectedItem.extra = null;
        newItems[index] = selectedItem;

        setItems(newItems);
        return;
      }

      // we always leave at least one item
      if (items.length === 1) {
        focuseByRef(titleRef.current);
        return;
      }

      // delete The Item
      newItems.splice(index, 1);
      // delete The Ref
      refs.current = refs.current.filter(
        (ref) => ref.getAttribute("data-id") !== selectedItem.id
      );

      if (index > 0) newItems[index - 1].focused = true;
      else if (index === 0) focuseByRef(titleRef.current);

      setItems(newItems);
    } else if (value === "") {
      // put the ready to Delete flag
      setItems(
        newItems.map((item) => {
          if (item.id === id) item.readyToDelete = true;
          return item;
        })
      );
    }
  }
  // enter key code
  else if (event.keyCode === 13) {
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

    selectedItem.focused = false;
    newItems[index] = selectedItem;
    newItems.splice(index + 1, 0, newInput);

    setItems(newItems);
  }
};

export const handleChange = (index, event, items, setItems, setAnchorEl) => {
  const { value } = event.target;

  // spreading the array and the object
  const newItems = [...items];
  const item = { ...items[index] };

  if (value === "/" && !item.extra)
    setAnchorEl(document.getElementById(item.id));

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

export const addSlash = (index, items, setItems) =>
  handleChange(index, "/", items, setItems);
