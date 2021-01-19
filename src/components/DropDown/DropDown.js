import React from "react";
import { Row, Col, Input } from "reactstrap";

const DropDown = (props) => {
  const { label, data, col, name, handler, update } = props;
  return (
    <Col md={`${col || "6"}`}>
      <label>{label}</label>
      <Input
        type="select"
        className="form-control"
        name={name}
        onChange={handler}
        disabled={!update}
      >
        {data.length ? (
          data.map((item, i) => (
            <option value={item.id || item._id}>
              {item.value || item.name}
            </option>
          ))
        ) : (
          <option value={0}> Male</option>
        )}
      </Input>
    </Col>
  );
};

export default DropDown;
