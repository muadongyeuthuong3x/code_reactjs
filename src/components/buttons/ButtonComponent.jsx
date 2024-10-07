import React from "react";
import { Button as AntButton, Form } from "antd";
import classNames from "classnames";

function CustomButton(props) {
  const {
    variant = "primary",
    children,
    onClick,
    type = "submit",
    ml,
    right,
    ...rest
  } = props;
  const classes = classNames({
    [`bg-primary text-black ${ml}`]: variant === "primary",
    [`bg-secondary text-black ${ml}`]: variant === "secondary",
  });
  
  return (
    <Form.Item>
      <AntButton className={classes} {...rest} onClick={onClick} type= "primary">
        {children}
      </AntButton>
    </Form.Item>
  );
}

export default CustomButton;
