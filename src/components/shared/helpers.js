export const focuseByCursorPosition = (node, offSet) => {
  const sel = window.getSelection();

  sel.setPosition(node, offSet);
};
