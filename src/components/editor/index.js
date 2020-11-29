import React, { useEffect, useRef, useState } from "react";

import _uniqueId from "lodash/uniqueId";

import Title from "../title";
import Block from "../block";
import MyMenu from "../menu";

export default function Editor() {
  const refs = useRef([]);
  const titleRef = useRef();
  // menu
  const [anchorEl, setAnchorEl] = useState(null);

  const [blocks, setBlocks] = useState([
    {
      id: _uniqueId("prefix-"),
      Type: "p",
      value: "",
      style: "",
      focused: true,
      readyToDelete: true,
      extra: null,
    },
  ]);

  useEffect(() => {
    let info = "";

    blocks.map((block, index) => (info += `${index}: ${block.focused}\n`));
    //console.log(info);
  }, [blocks]);

  return (
    <>
      <Title titleRef={titleRef} refs={refs} />
      <button onClick={() => document.execCommand("bold")}>Bold</button>
      <button onClick={() => document.execCommand("italic")}>Italic</button>
      {blocks.map((item, index) => (
        <Block
          key={item.id}
          index={index}
          blocks={blocks}
          setBlocks={setBlocks}
          refs={refs}
          titleRef={titleRef}
          setAnchorEl={setAnchorEl}
        />
      ))}
      <MyMenu
        blocks={blocks}
        setBlocks={setBlocks}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
}
