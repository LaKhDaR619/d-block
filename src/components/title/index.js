import React from "react";
import "./title.css";

function Title({ items, setItems, titleRef, refs }) {
  const handleTitleKeyUp = (e) => {
    // enter or key down
    if (e.keyCode === 13 || e.keyCode === 40) {
      refs.current[0].focus();
    }
  };

  return (
    <input
      ref={titleRef}
      placeholder="Title"
      className="title input"
      onKeyUp={(e) => handleTitleKeyUp(e)}
    ></input>
  );
}

export default Title;
