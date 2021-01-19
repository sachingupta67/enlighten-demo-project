import React from "react";
import { Button } from "reactstrap";
const ButtonWithIcon = (props) => {
  const { buttonHandler, style, icon, iconShape, iconColor, title } = props;
  return (
    <Button
      className="linkedin-sharrre btn-round btn-block  lg-12"
      color={`${iconColor}-bg`}
      onClick={buttonHandler}
      style={style}
      disabled={false}
    >
      <i className={`fa fa-${icon}-${iconShape || "square"}`} /> {title}
    </Button>
  );
};

export default ButtonWithIcon;
