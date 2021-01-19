import React from "react";
import COLORS from "../../redux/Constants/Colors";
const CustomRestaurantList = (props) => {
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
              width: 50,
              height: 50,
              borderRadius: 25,
              textAlign: "center",
              background: COLORS.text_gray,
              position: "relative",
            }}
          >
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                color: COLORS.WHITE_COLOR,
                fontWeight: 500,
                fontSize: 20,
              }}
            >
              {props.avatar}
            </p>
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
            <p
              style={{
                fontWeight: 400,
                color: COLORS.TEXT_COLOR,
              }}
            >
              {props.phone}
            </p>
            <p
              style={{
                fontWeight: 400,
                color: COLORS.SECONDARY_COLOR,
              }}
            >
              {props.website}
            </p>
          </div>
        </div>
      </div>
      <hr style={{ margin: 0 }} />
    </div>
  );
};

export default CustomRestaurantList;
