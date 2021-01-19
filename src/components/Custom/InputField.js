import React from "react";
import { Input, InputGroup } from "reactstrap";
import COLORS from "../../redux/Constants/Colors";
export const InputField = (props) => {
  const {
    type,
    name,
    id,
    placeholder,
    autoComplete,
    title,
    onChange,
    value,
    inputFieldStyle,
    minimum,
  } = props;
  return (
    <>
      <InputGroup style={styles.wrapper}>
        <Input
          type={type}
          name={name}
          value={value}
          id={id}
          min={minimum}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{ ...styles.inputStyle, ...inputFieldStyle }}
          onChange={onChange}
          required
        />
        {title ? <span style={styles.spanStyle}>{title}</span> : null}
      </InputGroup>
    </>
  );
};

const styles = {
  wrapper: {
    borderBottom: "1px solid",
    borderColor: COLORS.TEXT_COLOR,
    marginBottom: 20,
  },
  inputStyle: {
    border: "none",
    padding: 0,
    borderRadius: 0,
  },
  spanStyle: {
    border: "1px solid",
    //width: "20%",
    borderColor: COLORS.PRIMARY_COLOR,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "center",
    borderRadius: 20,
    color: COLORS.PRIMARY_COLOR,
  },
};
