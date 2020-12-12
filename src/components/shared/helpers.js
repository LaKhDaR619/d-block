export const focuseByCursorPosition = (node, offSet) => {
  const sel = window.getSelection();

  try {
    console.log("focuseByCursorPosition");
    console.log(node);
    console.log(offSet);
    console.log(node.textContent.length);
    if (node.textContent.length >= offSet) sel.setPosition(node, offSet);
  } catch (err) {
    console.error(err.message);
  }
};

export const setCursorInfo = (refs, index) => {
  const sel = window.getSelection();
  const node = sel.anchorNode;
  const offSet = sel.rangeCount > 0 ? sel.getRangeAt(0).startOffset : -1;

  /*console.log(`cursor info`);
  console.log(index);
  console.log(`old info`);
  console.log(refs?.current[index].cursorInfo);
  console.log(`newInfo info`);
  console.log({ node, offSet });*/

  if (offSet !== -1 && refs?.current?.length > index)
    refs.current[index].cursorInfo = { node, offSet };
};

export const preventBlockFromLosingFocuse = (e) => {
  // prevent the block from losing focuse
  e.preventDefault();
};

export const isNumber = (value) => {
  return !isNaN(value) && value !== null;
};

export const addingToNumberedList = (blocks, index) => {
  const newBlocks = [...blocks];

  if (index > 0) {
    if (isNumber(newBlocks[index - 1].extra)) {
      newBlocks[index].extra = newBlocks[index - 1].extra + 1;
    }
  }

  for (let i = index + 1; i < newBlocks.length; i++) {
    // when we find a non numbered list extra we break
    if (!isNumber(newBlocks[i].extra)) break;

    // else we set the write number
    newBlocks[i].extra = newBlocks[i - 1].extra + 1;
  }

  return newBlocks;
};

export const removingFromNumberedList = (blocks, index) => {
  const newBlocks = [...blocks];

  for (let i = index + 1; i < newBlocks.length; i++) {
    if (!isNumber(newBlocks[i].extra)) break;

    newBlocks[i].extra = i - index;
  }

  return newBlocks;
};
