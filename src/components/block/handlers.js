import _uniqueId from "lodash/uniqueId";

import { focuseByCursorPosition } from "../shared/helpers";

const ENTER_KEY = 13;
const BACK_KEY = 8;
const FORWARD_SLASH_KEY = 111;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;

export const handleChange = (index, event, blocks, setBlocks) => {
  const { value } = event.target;

  // spreading the array and the object
  const newBlocks = [...blocks];
  const selectedBlock = { ...blocks[index] };

  selectedBlock.value = value;
  selectedBlock.readyToDelete = false;

  newBlocks[index] = selectedBlock;

  setBlocks(newBlocks);
};

export const handleFocuse = (index, focused, blocks, setBlocks) => {
  let newBlocks = [...blocks];
  const selectedBlock = { ...blocks[index] };

  // we have a problem with uodating the state twice, react only takes the last update
  // so i'm working around it by setting all other blocks to !focused
  if (focused) {
    newBlocks = newBlocks.map((block) => {
      block.focused = block.id === selectedBlock.id;

      return block;
    });
  } else {
    selectedBlock.focused = focused;
    newBlocks[index] = selectedBlock;
  }

  setBlocks(newBlocks);
};

export const addSlash = (index, blocks, setBlocks, refs, setAnchorEl) =>
  handleForwardSlashKey(index, blocks, setBlocks, refs, setAnchorEl, true);

export const handleKeyDown = (event) => {
  // so the browser doesn't add a <br />
  if ([13, 38, 40].includes(event.keyCode)) event.preventDefault();
};

export const handleKeyUp = (
  index,
  event,
  blocks,
  setBlocks,
  titleRef,
  refs,
  setAnchorEl
) => {
  event.preventDefault();

  // working as handleChange
  const newBlocks = [...blocks];
  const selectedBlock = { ...newBlocks[index] };
  // storing the Prev value so we allow for empty values
  const prev_value = selectedBlock.value;
  selectedBlock.value = event.target.innerHTML;
  selectedBlock.readyToDelete = false;
  newBlocks[index] = selectedBlock;

  setBlocks(newBlocks);
  // end handle Change

  // set focused node and the cursor offset
  const sel = window.getSelection();
  const node = sel.anchorNode;
  const offSet = sel.rangeCount > 0 ? sel.getRangeAt(0).startOffset : -1;

  if (offSet !== -1) refs.current[index].cursorInfo = { node, offSet };
  //

  switch (event.keyCode) {
    case ENTER_KEY:
      handleEnterKey(index, newBlocks, setBlocks, refs);
      break;
    case BACK_KEY:
      handleBackKey(index, newBlocks, setBlocks, refs, titleRef, prev_value);
      break;
    case FORWARD_SLASH_KEY:
      handleForwardSlashKey(
        index,
        newBlocks,
        setBlocks,
        refs,
        setAnchorEl,
        false
      );
      break;
    case UP_ARROW_KEY:
      handleUpArrowKey(index, refs, titleRef);
      break;
    case DOWN_ARROW_KEY:
      handleDownArrowKey(index, refs);
      break;
    default:
      return;
  }
};

// handling key Ups
const handleEnterKey = (index, blocks, setBlocks, refs) => {
  const newBlocks = [...blocks];
  const selectedBlock = { ...newBlocks[index] };
  let { value, extra } = selectedBlock;

  // in case we have extra and the value is empty
  // we don't add an item and just remove the extra and return
  if (extra && !value) {
    selectedBlock.extra = null;
    newBlocks[index] = selectedBlock;
    return setBlocks(newBlocks);
  }

  // if it's a numbered list we add to it
  if (!isNaN(extra) && extra !== null) {
    extra += 1;

    // changing the rest of the numbered lists
    for (let i = index + 1; i < newBlocks.length; i++) {
      if (isNaN(newBlocks[i].extra)) break;

      if (i === index + 1) newBlocks[i].extra = newBlocks[i - 1].extra + 2;
      else newBlocks[i].extra = newBlocks[i - 1].extra + 1;
    }
  }

  // if we have a value, we add a new Block
  const newInput = {
    id: _uniqueId("prefix-"),
    Type: "p",
    value: "",
    style: "",
    focused: true,
    readyToDelete: true,
    extra: extra,
  };

  selectedBlock.focused = false;
  newBlocks[index] = selectedBlock;
  newBlocks.splice(index + 1, 0, newInput);

  setBlocks(newBlocks);
};

const handleBackKey = (
  index,
  blocks,
  setBlocks,
  refs,
  titleRef,
  prev_value
) => {
  if (!["<br>", ""].includes(prev_value)) return;

  const newBlocks = [...blocks];
  const selectedBlock = { ...newBlocks[index] };
  const { extra } = selectedBlock;

  if (extra) {
    selectedBlock.extra = null;
    newBlocks[index] = selectedBlock;

    setBlocks(newBlocks);
    return;
  }

  // we always leave at least one item
  if (newBlocks.length === 1) {
    focuseByCursorPosition(
      titleRef.current.childNodes[0],
      titleRef.current.innerHTML.length
    );
    return;
  }

  // delete The Item
  newBlocks.splice(index, 1);
  // delete The Ref
  refs.current.splice(index, 1);

  // don't repeat the work, the same as pressing up key
  handleUpArrowKey(index, refs, titleRef);

  setBlocks(newBlocks);
};

const handleForwardSlashKey = (
  index,
  blocks,
  setBlocks,
  refs,
  setAnchorEl,
  ignorValue
) => {
  if (ignorValue) {
    // if ignore value, that means we want to open the menu using the button
    // we simply add a '/' and show the menu
    const newItems = [...blocks];
    const selectedItem = { ...newItems[index] };

    selectedItem.value = "/";
    newItems[index] = selectedItem;

    setBlocks(newItems);
    setAnchorEl(refs.current[index].el);
  } else {
    // else if we came from the keyup function then we check the value
    const { value } = blocks[index];
    if (value === "/") setAnchorEl(refs.current[index].el);
  }
};

const handleUpArrowKey = (index, refs, titleRef) => {
  if (index === 0)
    focuseByCursorPosition(
      titleRef.current.childNodes[0],
      titleRef.current.innerHTML.length
    );
  else
    focuseByCursorPosition(
      refs.current[index - 1].cursorInfo.node,
      refs.current[index - 1].cursorInfo.offSet
    );
};
const handleDownArrowKey = (index, refs) => {
  if (index + 1 < refs.current.length) {
    const { node, offSet } = refs.current[index + 1].cursorInfo;
    console.log(node, offSet);
    focuseByCursorPosition(node, offSet);
  }
};
