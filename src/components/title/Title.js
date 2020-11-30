import React, { useEffect, useState } from "react";
import { focuseByCursorPosition } from "../shared/helpers";
import "./title.css";

function Title({ title, setTitle, titleRef, refs }) {
  useEffect(() => {
    //console.log(title);
  });

  const handleKeyDown = (event) => {
    if ([13, 40].includes(event.keyCode)) event.preventDefault();
  };

  const handleKeyUp = (event) => {
    event.preventDefault();

    setTitle(event.target.innerHTML);

    // enter or key down
    if ([13, 40].includes(event.keyCode)) {
      const { node, offSet } = refs.current[0].cursorInfo;

      focuseByCursorPosition(node, offSet);
      console.log(offSet);
    }
  };

  return (
    <div
      ref={titleRef}
      className="title"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      //contentEditable
    >
      Title
    </div>
  );
}

export default Title;
