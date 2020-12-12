import _uniqueId from "lodash/uniqueId";

import {
  focuseByCursorPosition,
  isNumber,
  setCursorInfo,
  addingToNumberedList,
  removingFromNumberedList,
} from "../shared/helpers";
import { getLastChildCursorInfo, syncStateWithRefs } from "./helpers";

const ENTER_KEY = 13;
const BACK_KEY = 8;
const FORWARD_SLASH_KEY = 111;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;

export const handleInput = (
  event,
  keyCodeRef,
  index,
  blocks,
  setBlocks,
  refs
) => {
  console.log("input");

  const target = event.target;
  let value = "";
  let newValue = "";

  if (keyCodeRef.current === ENTER_KEY) {
    const firstChild = target.firstChild;
    const lastChild = target.lastChild;

    // we are in chrome
    // this means the new line is in the last div
    if (lastChild?.nodeName === "DIV") {
      newValue = lastChild.innerHTML === "<br>" ? "" : lastChild.innerHTML;

      // removing the new created line after storing it's value
      lastChild.remove();

      value = target.innerHTML;
      // this condition so i won't handle Add Line Twice duplicated
      if (firstChild?.nodeName !== "DIV")
        handleAdd(index, blocks, setBlocks, value, newValue);
    }
    // we are still in chrome
    // this means that the old line is empty
    if (firstChild?.nodeName === "DIV") {
      value = "";
      // removing the old line because it's just a div with br inside
      firstChild.remove();

      // puting the rest of html in the new value
      newValue = target.innerHTML;
      target.innerHTML = "";
      handleAdd(index, blocks, setBlocks, value, newValue);
    }
    // we are in firefox
    else {
      // testing
      /*value = target.innerHTML;
      handleEnterKey(index, blocks, setBlocks, value, newValue);*/
    }

    // return so we can make less code bellow
    return;
  } else if (keyCodeRef.current === BACK_KEY) {
    // set focused node and the cursor offset
    setCursorInfo(refs, index);
  }
  // rest of the characters

  syncStateWithRefs(target, index, blocks, setBlocks);
};

export const handleKeyDown = (
  event,
  keyCodeRef,
  index,
  blocks,
  setBlocks,
  refs,
  titleRef
) => {
  const keyCode = event.keyCode;

  if (keyCode === UP_ARROW_KEY) handleUpArrowKey(index, refs, titleRef);
  if (keyCode === DOWN_ARROW_KEY) handleDownArrowKey(index, refs);
  if ([UP_ARROW_KEY, DOWN_ARROW_KEY].includes(keyCode))
    return event.preventDefault();

  keyCodeRef.current = keyCode;

  // the only key handlend in keydown because it doesn't invoke onInput when no change happens
  if (keyCode === BACK_KEY) {
    // handling deleting blocks
    const target = event.target;
    const firstChild = target.firstChild;
    const focusedNode = refs.current[index].cursorInfo.node;
    const offSet = refs.current[index].cursorInfo.offSet;

    const remaining_value = target.innerHTML;

    // checking if the user isn't selecting multiple chars
    // if the user selecting multiple chars and deleting we just return
    const selectionRange = window.getSelection().getRangeAt(0);
    if (
      selectionRange?.startContainer !== selectionRange?.endContainer ||
      selectionRange?.startOffset !== selectionRange?.endOffset
    ) {
      return;
    }

    // checking if the focused node is the first node or one if it's children
    let shouldDelete = false;

    const parent = firstChild;
    let current_node = focusedNode;
    while (true) {
      // we also break if the parent is null (the parent doesn't have any children)
      if (current_node === parent || parent === null) {
        shouldDelete = true;
        break;
      }

      current_node = current_node.parentElement;

      if (!current_node) break;
    }

    if (shouldDelete && offSet === 0) {
      event.preventDefault();
      handleDelete(index, blocks, setBlocks, refs, titleRef, remaining_value);
    }
  }
};

// handling block adding
const handleAdd = (index, blocks, setBlocks, value, newValue) => {
  let newBlocks = [...blocks];
  const selectedBlock = { ...newBlocks[index] };
  selectedBlock.value = value;
  let { extra, type } = selectedBlock;

  // in case we have extra and the values are empty
  // we don't add an item and just remove the extra and return
  if (extra && !value && !newValue) {
    selectedBlock.extra = null;
    newBlocks[index] = selectedBlock;

    if (isNumber(extra)) newBlocks = removingFromNumberedList(newBlocks, index);

    return setBlocks(newBlocks);
  }

  const newBlock = {
    id: _uniqueId("prefix-"),
    TAG: "p",
    // if the type is a header we don't use it on the next block
    type: type === "Header" ? "Paragraph" : type,
    value: newValue,
    style: {},
    focused: true,
    readyToDelete: true,
    extra: extra,
  };

  selectedBlock.focused = false;
  newBlocks[index] = selectedBlock;
  newBlocks.splice(index + 1, 0, newBlock);

  // if it's a numbered list we add to it
  if (isNumber(extra)) newBlocks = addingToNumberedList(newBlocks, index + 1);

  setBlocks(newBlocks);
};

const handleDelete = (
  index,
  blocks,
  setBlocks,
  refs,
  titleRef,
  remaining_value
) => {
  let newBlocks = [...blocks];
  const selectedBlock = { ...newBlocks[index] };
  const { extra } = selectedBlock;

  if (extra) {
    selectedBlock.extra = null;
    newBlocks[index] = selectedBlock;

    if (isNumber(extra)) newBlocks = removingFromNumberedList(newBlocks, index);

    return setBlocks(newBlocks);
  }

  // if we are in the first block
  if (index === 0) {
    // i had to put this first or the state won't update
    focuseByCursorPosition(
      titleRef.current.childNodes[0],
      titleRef.current.innerHTML.length
    );

    // we always leave at least one item
    if (newBlocks.length !== 1 && newBlocks[index].value === "") {
      // delete The Item and append the rest of the value
      newBlocks.splice(index, 1);
      // delete The Ref
      refs.current.splice(index, 1);

      return setBlocks(newBlocks);
    }

    return;
  }

  // delete The Item and append the rest of the value
  newBlocks.splice(index, 1);
  const prev_Block = { ...newBlocks[index - 1] };
  prev_Block.value += remaining_value;
  newBlocks[index - 1] = prev_Block;
  // delete The Ref
  refs.current.splice(index, 1);
  // appending the rest of the html
  // we create a temp span to create the children then adding them to the old block
  // then we make the cursor info either the temp
  const temp_node = document.createElement("span");
  // creating all the children
  temp_node.innerHTML = remaining_value;

  // setting the focused node (if there is a first child we focuse it else we focuse the parent)
  let node, offSet;

  if (!temp_node.childNodes[0]) {
    [node, offSet] = getLastChildCursorInfo(refs.current[index - 1].el);
  } else {
    node = temp_node.childNodes[0];
    offSet = 0;
  }

  refs.current[index - 1].cursorInfo.node = node;
  refs.current[index - 1].cursorInfo.offSet = offSet;

  // adding all the children to the old block
  while (temp_node.childNodes.length > 0) {
    refs.current[index - 1].el.appendChild(temp_node.childNodes[0]);
  }

  // checking the numbered list
  if (isNumber(newBlocks[index - 1].extra))
    newBlocks = addingToNumberedList(newBlocks, index - 1);

  // don't repeat the work, the same as pressing up key
  handleUpArrowKey(index, refs, titleRef);

  setBlocks(newBlocks);
};

export const handleForwardSlashKey = (
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
    const newBlocks = [...blocks];
    const selectedBlock = { ...newBlocks[index] };

    selectedBlock.value = "/";
    newBlocks[index] = selectedBlock;

    // reseting the value innerHTML (using Refs)
    refs.current[index].el.innerHTML = "/";

    setBlocks(newBlocks);
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
  else {
    focuseByCursorPosition(
      refs.current[index - 1].cursorInfo.node,
      refs.current[index - 1].cursorInfo.offSet
    );
  }
};

const handleDownArrowKey = (index, refs) => {
  if (index + 1 < refs.current.length) {
    const { node, offSet } = refs.current[index + 1].cursorInfo;
    focuseByCursorPosition(node, offSet);
  }
};
