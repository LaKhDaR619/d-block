import React, { useEffect, useState } from "react";
import "./toolbar.css";

import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import { preventBlockFromLosingFocuse } from "../shared/helpers";

const formatData = [
  { label: "bold", icon: FormatBoldIcon },
  { label: "italic", icon: FormatItalicIcon },
  { label: "underline", icon: FormatUnderlinedIcon },
];

const alignmentData = [
  { label: "left", icon: FormatAlignLeftIcon },
  { label: "center", icon: FormatAlignCenterIcon },
  { label: "right", icon: FormatAlignRightIcon },
];

const checkFormats = (parent, child) => {
  const result = [];
  let current_node = child;

  if (!current_node || !parent) return [];

  while (true) {
    if (
      // checking the tag and the styles
      ["b", "strong"].includes(current_node?.tagName?.toLowerCase()) ||
      current_node?.style?.fontWeight === "bold"
    )
      result.push("bold");
    if (
      ["em", "i"].includes(current_node?.tagName?.toLowerCase()) ||
      current_node?.style?.fontStyle === "italic"
    )
      result.push("italic");
    if (
      current_node?.tagName?.toLowerCase() === "u" ||
      current_node?.style?.textDecoration === "underline"
    )
      result.push("underline");

    current_node = current_node?.parentElement;

    if (current_node !== parent && !current_node) break;
  }

  return result;
};

function Toolbar({ el, focusedNode }) {
  const [formats, setFormats] = useState(() => []);
  const [alignment, setAlignment] = useState("left");

  const handleFormat = (event, newFormats) => {
    // checking if the old formats needs to be set (if the format is removed we apply it)
    formats?.forEach((format) => {
      if (!newFormats.includes(format)) document.execCommand(format);
    });

    // checking if the new formats needs to be set (if the format is added we apply it)
    newFormats?.forEach((format) => {
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
    setFormats(checkFormats(el, focusedNode));
    setAlignment(el?.style?.textAlign);
  }, [el, focusedNode]);

  return (
    <div
      className="block-toolbar"
      onMouseDownCapture={preventBlockFromLosingFocuse}
    >
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        {formatData.map((data) => (
          <ToggleButton
            key={data.label}
            value={data.label}
            aria-label={data.label}
          >
            <data.icon />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        {alignmentData.map((data) => (
          <ToggleButton
            key={data.label}
            value={data.label}
            aria-label={data.label}
          >
            <data.icon />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default Toolbar;
