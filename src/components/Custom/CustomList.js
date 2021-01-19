import React from "react";
import COLORS from "../../redux/Constants/Colors";
const CustomList = (props) => {
  const { handler, key } = props;
  return (
    <div key={key || null}>
      <div onClick={handler}>
        <div
          className="mt-4"
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              width: "10%",
              textAlign: "center",
            }}
          >
            <img src={props.src} style={{ maxWidth: 40 }} />
          </div>
          <div style={{ width: "80%" }}>
            <p
              style={{
                fontWeight: 600,
                color: COLORS.TEXT_COLOR,
              }}
            >
              {props.heading}
            </p>
            <p
              style={{
                fontWeight: 400,
                color: COLORS.TEXT_COLOR,
              }}
            >
              {props.title}
            </p>
          </div>
        </div>
      </div>
      <hr style={{ margin: 0 }} />
    </div>
  );
};

export default CustomList;
