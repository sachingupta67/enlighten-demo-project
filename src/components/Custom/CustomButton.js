import React from "react";
import { Button } from "reactstrap";
const CustomButton = (props) => {
  const { buttonHandler, style, title, className } = props;
  return (
    <Button
      className={className}
      onClick={buttonHandler}
      style={style}
      disabled={false}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
