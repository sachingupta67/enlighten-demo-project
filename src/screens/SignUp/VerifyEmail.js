import React from "react";
import { Form } from "reactstrap";
import { InputField } from "../../components/Custom/InputField";
import CustomButton from "../../components/Custom/CustomButton";
import COLORS from "redux/Constants/Colors";
class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, handler) => {
    e.preventDefault();
    const { otp } = this.state;
    const { otpValue } = this.state;
    console.log(otp, otpValue);
    if (otp == otpValue) {
      handler(true);
    } else {
      window.alert("entered OTP is not valid");
    }
  };

  render() {
    console.log(this.state);
    const { otp } = this.state;
    const { handler } = this.props;
    return (
      <>
        <div className="p-5" style={styles.wrapper}>
          <p style={styles.titleStyle}>You are just one step away!</p>
          <p className="mb-5" style={styles.titleStyle}>
            A one time passcode has been sent to your email address. Please
            enter the code below to verify email address.
          </p>
          <Form>
            <InputField
              placeholder="OTP"
              type="number"
              value={otp}
              name="otp"
              onChange={(e) => this.handleChange(e)}
              inputFieldStyle={styles.inputField}
            />

            <div style={styles.buttonBlock}>
              <CustomButton
                title="Verify"
                className="btn-block"
                style={styles.nextButton}
                buttonHandler={(e) => this.handleSubmit(e, handler)}
              />
            </div>
          </Form>
        </div>
      </>
    );
  }
}

export default VerifyEmail;

const styles = {
  wrapper: {
    height: 500,
    background: COLORS.WHITE_COLOR,
    borderRadius: 10,
  },
  inputField: {
    border: "1px solid gray",
    borderBottom: "none",
    paddingLeft: 10,
  },
  titleStyle: { textAlign: "center", fontWeight: "bold" },
  buttonBlock: {
    marginTop: 40,
  },
  nextButton: { background: COLORS.PRIMARY_COLOR, border: "none" },
};
