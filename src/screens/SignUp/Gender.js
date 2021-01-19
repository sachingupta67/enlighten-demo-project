import React from "react";
import COLORS from "../../redux/Constants/Colors";
import CustomButton from "../../components/Custom/CustomButton";
const Gender = (props) => {
  const { handler } = props;
  const data = [
    {
      id: 1,
      value: "Female",
    },
    {
      id: 2,
      value: "Male",
    },
  ];
  return (
    <>
      <div style={styles.wrapper}>
        <div style={{ paddingTop: 200 }}>
          <p style={styles.message}>HI!</p>
          <p style={styles.title}>Let's start with the basics</p>
          <div style={styles.buttonWrap}>
            {data.length
              ? data.map((item, i) => (
                  <CustomButton
                    key={i}
                    className="mx-2"
                    title={item.value}
                    style={styles.buttonStyle}
                    buttonHandler={() => {
                      handler(item.value);
                    }}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  wrapper: {
    backgroundColor: COLORS.white,
    textAlign: "center",
    height: 500,
    // paddingTop: 200,
  },
  message: { color: COLORS.colorPrimaryDark, fontWeight: "bold" },
  title: {
    fontWeight: "bold",
  },

  buttonStyle: {
    backgroundColor: COLORS.colorPrimaryDark,
    border: COLORS.colorPrimaryDark,
  },
  buttonStyleMale: {
    backgroundColor: COLORS.colorPrimaryDark,
    border: COLORS.colorPrimaryDark,
  },
};

export default Gender;
