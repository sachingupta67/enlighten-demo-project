import React from "react";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

import MasterLayout from "components/Layout/MasterLayout";
import Axios from "axios";
import Goal from "./Goal";
import Diet from "./Diet";
import Gender from "./Gender";
import Signup from "./Signup";
import SignupDetails from "./SignupDetails";
import VerifyEmail from "./VerifyEmail";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  registerUser,
  clearAuthReducer,
} from "../../redux/Actions/ActionCreators";
import APIUrls from "../../redux/Constants/APIUrls";
import Strings from "../../redux/Constants/Strings";
import CustomLoader from "../../components/Loader/CustomLoader";
import { storeItem } from "../../redux/Utils/AsyncUtils";
import { history } from "../../utility/history";
class SignupFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      selectedDiet: "",
      selectedGender: "",
      selectedGoal: "",
      signup: {},
      signupDetails: {},
      selectedGoalName: "",
      otp: null,
      signInRes: "",

      //   yourHeightInches: "",
      //   yourHeightFit: "",
      //   yourAge: "",
      //   yourWeight: "",
      //   goalWeight: "",
    };
  }

  goalHandler = (id, name) => {
    //console.log("goal handler data---->", item);
    this.setState({
      active: this.state.active + 1,
      selectedGoal: id,
      selectedGoalName: name,
    });
  };

  dietHandler = (id) => {
    this.setState({
      active: this.state.active + 1,
      selectedDiet: id,
    });
  };

  genderHandler = (value) => {
    this.setState({ active: this.state.active + 1, selectedGender: value });
  };

  firstSignupScreen = (data) => {
    this.setState({ active: this.state.active + 1, signup: data });
  };

  secondSignupScreen = (data) => {
    this.setState({ signupDetails: data }, () => {
      let postData = {
        goals: this.state.selectedGoal,
        diet: this.state.selectedDiet,
        gender: this.state.selectedGender,
        age: this.state.signup.age,
        height_inches: this.state.signup.heightInches,
        height_feet: this.state.signup.heightFeet,
        weight: this.state.signup.weight,
        set_goal_weight: this.state.signup.goalWeight,
        set_goal_weeks: this.state.signup.weeks,
        email: data.email,
        firstname: data.name,
        lastname: data.name,
        password: data.password,
        confirm_password: data.cPassword,
        autoLogin: true,
        socialLogin: false,
      };
      this.verifyEmailHandler({ name: data.name, email: data.email });
      this.props.registerUser(postData);
    });
  };

  verifyEmailHandler = async (data) => {
    try {
      let res = await Axios.post(APIUrls.VERIFY_EMAIL, { ...data });
      if (res) {
        this.setState({ otp: res.data.otp });
      }
    } catch (err) {
      alert("Somethingwent wrong");
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("gettttt---->");

    console.log(nextProps);

    if (nextProps.auth) {
      if (nextProps.auth.registerRes) {
        if (nextProps.auth.registerRes.logindata) {
          const { _id, loginToken } = nextProps.auth.registerRes.logindata;
          const userInfo = { id: _id, loginToken: loginToken };
          storeItem(Strings.KEY_USER_DATA, userInfo);

          nextProps.history.push("/home");
          return { active: 8 };
        }
      }
    }
    // if (nextProps.AuthReducer.registerRes !== prevState.signInRes) {
    //   console.log(
    //     "GETDERIVED STATE Auth registerRes --",
    //     nextProps.AuthReducer.registerRes
    //   );
    //   console.log(
    //     "GETDERIVED STATE state registerRes --",
    //     prevState.registerRes
    //   );
    //   return {
    //     signInRes: nextProps.AuthReducer.registerRes,
    //     loginRes: nextProps.AuthReducer.registerRes.logindata,
    //     isLoading: false,
    //   };
    // }
    // Return null if the state hasn't changed
    return null;
  }

  goToHomeHandler = (data) => {
    console.log(data, this.props);
  };
  render() {
    // console.log(this.state);
    const { active, otp } = this.state;

    return (
      <>
        <MasterLayout>
          <div
            className="page-header"
            style={{
              backgroundImage: "url(" + require("assets/img/mainbg.jpg") + ")",
              zIndex: -1,
              position: "absolute",
            }}
          >
            <div className="filter" />

            <div className="footer register-footer text-center">
              <h6>
                © {new Date().getFullYear()}, made with{" "}
                <i className="fa fa-heart heart" /> by Smart Data
              </h6>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              borderRadius: 10,
              overflow: "hidden",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div>
              <p
                style={{
                  color: "#66615b",
                  fontWeight: "800",
                  position: "absolute",
                  top: "2%",
                  left: "2%",
                }}
                onClick={() => {
                  if (this.state.active === 1) {
                    this.props.history.push("/");
                  } else {
                    this.setState({ active: this.state.active - 1 });
                  }
                }}
              >{`< Back`}</p>
              {active === 1 ? <Goal handler={this.goalHandler} /> : null}
              {active === 2 ? <Diet handler={this.dietHandler} /> : null}
              {active === 3 ? <Gender handler={this.genderHandler} /> : null}
              {active === 4 ? (
                <Signup
                  handler={this.firstSignupScreen}
                  prevData={this.state}
                />
              ) : null}
              {active === 5 ? (
                <SignupDetails handler={this.secondSignupScreen} />
              ) : null}
              {active === 6 ? (
                <VerifyEmail otpValue={otp} handler={this.goToHomeHandler} />
              ) : null}
            </div>
          </div>
        </MasterLayout>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth: auth };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      registerUser,
      clearAuthReducer,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupFlow);
