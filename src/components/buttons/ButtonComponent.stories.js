import React from "react";
import CustomButton from "./ButtonComponent.jsx";
import { action } from '@storybook/addon-actions';

export default {
  title: "Button",
  component: CustomButton,
};

export const Primary = () => (
  <CustomButton variant="primary" onClick={action("Click handler")()}>
    Primary
  </CustomButton>
);
export const Secondary = () => (
  <CustomButton variant="secondary" onClick={action("Click handler secondary")}>
    Secondary
  </CustomButton>
);
