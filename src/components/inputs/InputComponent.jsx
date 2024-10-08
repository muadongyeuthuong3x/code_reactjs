import React from "react";
import { AutoComplete, Form } from "antd";

function InputComponent(props) {
  const {
    width = 200,
    placeholder = "Add Data",
    onChange,
    value,
    name: name,
    height = 30,
    rules = [],
    ...rest
  } = props;

  return (
    <Form.Item
      label=""
      name={name}
      rules= {rules}
      defaultValue = {{
        
      }}
    >
      <AutoComplete
        style={{
          width: width,
          height: height,
        }}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
        value={value}
      />
    </Form.Item>
  );
}

export default InputComponent;
