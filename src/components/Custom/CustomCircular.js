import React from "react";

const CustomCircular = (props) => {
  return (
    <div
      style={{
        width: "25%",
        paddingRight: 30,
        textAlign: "center",
      }}
    >
      {props.children}
    </div>
  );
};

export default CustomCircular;
