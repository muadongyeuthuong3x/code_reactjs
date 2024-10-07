import React from "react";
import InputComponent from "./InputComponent";

export default {
  title: "Input",
  component: InputComponent,
};


export const Small = () => <InputComponent placeholder="Small size" width={100} height={30} />;
export const Large = () => <InputComponent placeholder="Large size"  width={150} height={30}/>