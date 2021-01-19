import React from "react";

import { Input, Col } from "reactstrap";
const InputField = (props) => {
  const { value, handler, type, placeholder, name, label, update, col } = props;

  return (
    <Col md={`${col || "6"}`}>
      <label>{label}</label>
      <Input
        placeholder={placeholder}
        type={type || "text"}
        name={name}
        value={value}
        onChange={handler}
        required
        disabled={!update || false}
      />
    </Col>
  );
};

export default InputField;
