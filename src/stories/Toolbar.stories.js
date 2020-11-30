import React from "react";

import Toolbar from "../components/Toolbar";

const Default = {
  title: "Example/Toolbar",
  component: Toolbar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default Default;

const Template = (args) => <Toolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
