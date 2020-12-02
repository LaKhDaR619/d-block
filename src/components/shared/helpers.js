export const focuseByCursorPosition = (node, offSet) => {
  const sel = window.getSelection();

  sel.setPosition(node, offSet);
};

export const setCursorInfo = (refs, index) => {
  const sel = window.getSelection();
  const node = sel.anchorNode;
  const offSet = sel.rangeCount > 0 ? sel.getRangeAt(0).startOffset : -1;

  //console.log(`new Node: ${node}`);
  //console.log(`old Node: ${refs.current[index].cursorInfo.node}`);
  if (offSet !== -1 && refs.current)
    refs.current[index].cursorInfo = { node, offSet };
};
