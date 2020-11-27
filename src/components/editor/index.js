import React, { useEffect, useRef, useState } from "react";

import _uniqueId from "lodash/uniqueId";

import Title from "../title";
import Block from "../block";
import MyMenu from "../menu";
import { isFocused } from "../block/handlers";

export default function Editor() {
  const refs = useRef([]);
  const titleRef = useRef();
  // menu
  const [anchorEl, setAnchorEl] = useState(null);

  const [items, setItems] = useState([
    {
      id: _uniqueId("prefix-"),
      value: "",
      focused: true,
      readyToDelete: true,
      extra: null,
    },
  ]);

  useEffect(() => {}, [items]);

  return (
    <>
      <Title titleRef={titleRef} refs={refs} />
      {items.map((item, index) => (
        <Block
          key={item.id}
          index={index}
          items={items}
          setItems={setItems}
          refs={refs}
          titleRef={titleRef}
          setAnchorEl={setAnchorEl}
        />
      ))}
      <MyMenu
        items={items}
        setItems={setItems}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
}
