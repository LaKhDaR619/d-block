import React, { useEffect, useRef, useState } from "react";

import _uniqueId from "lodash/uniqueId";

import Title from "../title";
import Block from "../block";
import MyMenu from "../menu";

import { focuseByRef } from "../shared/handlers";

export default function Editor() {
  const refs = useRef([]);
  const titleRef = useRef();

  const [items, setItems] = useState([
    {
      id: _uniqueId("prefix-"),
      value: "",
      focused: true,
      readyToDelete: true,
      extra: null,
    },
  ]);

  useEffect(() => {
    const focusedItem = items.find((item) => item.focused);
    if (focusedItem) {
      const focusedRef = refs.current.find(
        (ref) => ref.getAttribute("data-id") === focusedItem.id
      );
      focuseByRef(focusedRef);
    }
  }, [items]);

  return (
    <>
      <Title titleRef={titleRef} items={items} setItems={setItems} />
      {items.map((item, index) => (
        <Block
          key={item.id}
          index={index}
          items={items}
          setItems={setItems}
          refs={refs}
          titleRef={titleRef}
        />
      ))}
      <MyMenu items={items} setItems={setItems} />
    </>
  );
}
