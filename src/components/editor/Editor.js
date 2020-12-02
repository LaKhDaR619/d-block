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

  const [title, setTitle] = useState("Title");
  const [blocks, setBlocks] = useState([
    {
      id: _uniqueId("prefix-"),
      type: "Paragraph",
      TAG: "p",
      value: "",
      style: {},
      focused: true,
      readyToDelete: true,
      extra: null,
    },
  ]);

  // so we can show the toolbar in the last focused block
  const lastFocused = useRef(0);

  useEffect(() => {
    //console.log(info);
  }, [blocks]);

  const [json, setJson] = useState("");

  const handleSave = () => {
    const temp = {};

    temp.title = title;
    temp.blocks = blocks.map((block) => {
      return {
        type: block.type,
        value: block.value,
      };
    });

    setJson(temp);
  };

  return (
    <>
      <Title
        title={title}
        setTitle={setTitle}
        titleRef={titleRef}
        refs={refs}
      />

      {blocks.map((item, index) => (
        <Block
          key={item.id}
          index={index}
          blocks={blocks}
          setBlocks={setBlocks}
          refs={refs}
          titleRef={titleRef}
          setAnchorEl={setAnchorEl}
          lastFocused={lastFocused}
        />
      ))}
      <MyMenu
        blocks={blocks}
        setBlocks={setBlocks}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
      <button onClick={handleSave}>Save</button>
      <br />
      <br />
      <div>{JSON.stringify(json, null, 2)}</div>
    </>
  );
}
