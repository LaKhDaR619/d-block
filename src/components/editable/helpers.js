export const syncStateWithRefs = (target, index, blocks, setBlocks) => {
  const newBlocks = [...blocks];
  const selectedBlock = { ...newBlocks[index] };
  selectedBlock.value = target.innerHTML;
  selectedBlock.readyToDelete = false;
  newBlocks[index] = selectedBlock;

  setBlocks(newBlocks);
};

// getting the last child and it's offset
// if there is not children returning the parent with offset 0
export const getLastChildCursorInfo = (parent) => {
  if (!parent.lastChild) return [parent, 0];

  let current_child = parent.lastChild;

  while (true) {
    if (!current_child.lastChild) return [current_child, current_child.length];
    current_child = current_child.lastChild;
  }
};
