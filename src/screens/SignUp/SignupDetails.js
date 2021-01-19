import React from "react";
import { Label, Input, Form, FormGroup } from "reactstrap";
import { InputField } from "../../components/Custom/InputField";
import CustomButton from "../../components/Custom/CustomButton";
import COLORS from "redux/Constants/Colors";

class SignupDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cPassword: "",
      checkValue: false,
      signInRes: {},
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCheckBoxValue = (e) => {
    this.setState({ checkValue: !this.state.checkValue });
  };
  handleSubmit = (e, handler) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { name, email, password, cPassword } = this.state;
    if (password !== cPassword) {
      alert("Passwords don't match");
    } else if ((name, email, password)) {
      handler(this.state);
    }
  };

  clearState = () => {};
  render() {
    const { handler } = this.props;
    const { email, name, password, cPassword, checkValue } = this.state;
    return (
      <>
        <div className="p-5" style={styles.wrapper}>
          <Form>
            <InputField
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => this.handleChange(e)}
            />

            <InputField
              placeholder="Email"
              //  title="FIT"
              type="email"
              name="email"
              value={email}
              onChange={(e) => this.handleChange(e)}
            />

            <InputField
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => this.handleChange(e)}
            />

            <InputField
              placeholder="Confirm Password"
              name="cPassword"
              type="password"
              value={cPassword}
              onChange={(e) => this.handleChange(e)}
            />

            <FormGroup check>
              <Label className="form-check-label">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  name="checkValue"
                  value={checkValue}
                  onChange={(e) => this.handleCheckBoxValue(e)}
                />
                I have read and agree to the Terms and Condition
                <span className="form-check-sign">
                  <span className="check"></span>
                </span>
              </Label>
            </FormGroup>

            <div style={styles.buttonBlock}>
              <CustomButton
                title="SIGN UP"
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

export default SignupDetails;

const styles = {
  wrapper: {
    height: 500,
    background: COLORS.WHITE_COLOR,
    borderRadius: 10,
  },
  buttonBlock: {
    marginTop: 40,
  },
  nextButton: { background: COLORS.PRIMARY_COLOR, border: "none" },
};
