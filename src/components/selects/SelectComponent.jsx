import React from "react";
import { Select, Form } from "antd";

function SelectComponent(props) {
  const {
    options,
    defaultValue,
    width,
    name,
    rules = [],
    handleChange,
    ...rest
  } = props;
  return (
    <Form.Item label="" name={name} rules={rules}>
      <Select
        defaultValue={defaultValue}
        style={{
          width: width,
        }}
        onChange={handleChange}
        options={options}
        {...rest}
      />
    </Form.Item>
  );
}

export default SelectComponent;
