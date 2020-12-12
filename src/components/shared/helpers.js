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

  console.log(`cursor info`);
  /*console.log(index);
  console.log(`old info`);
  console.log(refs?.current[index].cursorInfo);*/
  console.log(`newInfo info`);
  console.log({ node, offSet });

  if (offSet !== -1 && refs?.current?.length > index)
    refs.current[index].cursorInfo = { node, offSet };
};

export const preventBlockFromLosingFocuse = (e) => {
  // prevent the block from losing focuse
  e.preventDefault();
};
