import React, { useEffect, useState } from "react";
import "./toolbar.css";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";

const items = [
  FormatBoldIcon,
  FormatItalicIcon,
  FormatUnderlinedIcon,
  FormatAlignLeftIcon,
  FormatAlignCenterIcon,
  FormatAlignRightIcon,
];

const checkFormats = (parent, child) => {
  const result = [];

  let current_node = child?.parentElement;

  if (!current_node) return;

  while (current_node !== parent && current_node) {
    console.log(parent);
    console.log(current_node);

    if (
      ["b", "strong"].includes(current_node.tagName.toLowerCase()) ||
      current_node.style.fontWeight === "bold"
    )
      result.push("bold");
    if (["em", "i"].includes(current_node.tagName.toLowerCase()))
      result.push("italic");
    else if (current_node.tagName.toLowerCase() === "u")
      result.push("underline");

    current_node = current_node.parentElement;
  }

  return result;
};

function Toolbar({ el, focusedNode }) {
  const [formats, setFormats] = useState(() => []);
  const [alignment, setAlignment] = useState("left");

  const handleFormat = (event, newFormats) => {
    // checking if the old formats needs to be set (if the format is removed we apply it)
    formats.map((format) => {
      if (!newFormats.includes(format)) document.execCommand(format);
    });

    // checking if the new formats needs to be set (if the format is added we apply it)
    newFormats.map((format) => {
      if (!formats.includes(format)) document.execCommand(format);
    });

    el.focus();

    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    // setting the style
    el.style.textAlign = newAlignment;
    el.focus();

    setAlignment(newAlignment);
  };

  useEffect(() => {
    console.log("checking formats");
    console.log(focusedNode);
    setFormats(checkFormats(el, focusedNode));
    setAlignment(el?.style?.textAlign);
  }, [el, focusedNode]);

  return (
    <div className="block-toolbar">
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton value="underline" aria-label="underline">
          <FormatUnderlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="left aligned">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          <FormatAlignRightIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default Toolbar;
