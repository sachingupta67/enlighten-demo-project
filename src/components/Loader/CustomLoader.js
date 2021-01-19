import React from "react";
import { Spinner } from "reactstrap";
import Colors from "../../redux/Constants/Colors";
const CustomLoader = ({ loader }) => {
  return (
    <>
      {loader ? (
        <div style={styles.loaderContainer}>
          <Spinner animation="grow" variant="info" />
        </div>
      ) : null}
    </>
  );
};

const styles = {
  loaderContainer: {
    position: "absolute",
    background: Colors.WHITE_COLOR,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 99,
    width: 100,
    height: 100,
    borderRadius: 8,
    lineHeight: "110px",
    textAlign: "center",
    color: Colors.colorPrimaryDark,
  },
};
export default CustomLoader;
