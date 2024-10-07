import React from "react";
import SelectComponent from "./SelectComponent.jsx";
import { options } from "../../enum/ListOption.js";
export default {
  title: "Select",
  component: SelectComponent,
};

export const SelectOptionOne = () => (
  <SelectComponent
    options={options}
    defaultValue={options[0].value}
    width={150}
  />
);
export const SelectOptionTwo = () => (
  <SelectComponent
    options={options}
    defaultValue={options[0].value}
    width={200}
  />
);
