import React from "react";
import "./title.css";

function Title({ items, setItems, titleRef }) {
  const handleTitleKeyUp = (e) => {
    if (e.keyCode === 13) {
      const newItems = [...items];
      newItems[0].focused = true;
      setItems(newItems);
    }
    // key down
    else if (e.keyCode === 40) {
      //
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
