import React from "react";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import ButtonWithIcon from "components/Buttons/ButtonWithIcon";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import MasterLayout from "components/Layout/MasterLayout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  loginUser,
  clearAuthReducer,
} from "../../redux/Actions/ActionCreators";
import Axios from "axios";
import SignupFlow from "screens/SignUp";
class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      isFBLoggedIn: false,
      email: "",
      password: "",
      signInRes: "",
      isLoading: false,
    };
  }

  toggleAuthProcess = (e) => {
    // e.preventDefault();
    // this.setState({ login: !this.state.login });
    this.props.history.push("/signup");
  };

  responseFacebook = (response) => {
    if (response.accessToken) {
      this.fetchFacebookUserDetails(response.accessToken);
    }
  };
  responseGoogle = ({ accessToken, profileObj }) => {
    if (accessToken) {
      const { googleId, imageUrl, email, name } = profileObj;
      let data = {
        email: email,
        platform: "2", //google-login
        device: "WEB",
        social_id: googleId,
        socialLogin: true,
        firstname: name,
        profileImage: imageUrl,
      };
      console.log(data);

      this.props.loginUser(data);
    }
  };
  generalLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      let data = {
        email: email,
        password: password,
        device: "WEB",
        socialLogin: false,
        googleLogin: false,
      };
      this.props.loginUser(data);
    }
  };

  fetchFacebookUserDetails = async (token) => {
    try {
      let res = await Axios(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
      );

      if (res) {
        const { id, name, email, picture } = res.data;
        let data = {
          email: email,
          platform: "1", //facebook-login
          device: "WEB",
          social_id: id,
          socialLogin: true,
          firstname: name,
        };
        this.props.loginUser(data);
      }
    } catch (err) {
      alert("Oops something went wrong,try after some time");
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.signInRes !== prevState.signInRes) {
      return true;
    }
    // Return null if the state hasn't changed
    return null;
  }
  activeGoogleLogin = () => {
    this.setState({ googleLogin: true });
  };
  render() {
    const { login, email, password, googleLogin } = this.state;
    const {
      REACT_APP_FACEBOOK_APP_ID,
      REACT_APP_GOOGLE_CLIENT_ID,
    } = process.env;
    return (
      <>
        <MasterLayout>
          <div
            className="page-header"
            style={{
              backgroundImage: "url(" + require("assets/img/mainbg.jpg") + ")",
            }}
          >
            <div className="filter" />
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" lg="4">
                  <Card
                    className="card-register ml-auto mr-auto"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <h3 className="title mx-auto">Welcome</h3>
                    <div className="social-line text-center">
                      <FacebookLogin
                        appId={REACT_APP_FACEBOOK_APP_ID}
                        autoLoad={false}
                        callback={this.responseFacebook}
                        render={(renderProps) => (
                          <ButtonWithIcon
                            iconColor="facebook"
                            buttonHandler={renderProps.onClick}
                            icon="facebook"
                            title="facebook"
                          />
                        )}
                      />
                      {googleLogin ? (
                        <GoogleLogin
                          clientId={REACT_APP_GOOGLE_CLIENT_ID}
                          render={(renderProps) => (
                            <ButtonWithIcon
                              iconColor="google"
                              buttonHandler={renderProps.onClick}
                              icon="google"
                              iconShape="plus"
                              title="google"
                            />
                          )}
                          buttonText="Login"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={"single_host_origin"}
                          isSignedIn={true}
                        />
                      ) : (
                        <ButtonWithIcon
                          iconColor="google"
                          buttonHandler={this.activeGoogleLogin}
                          icon="google"
                          iconShape="plus"
                          title="google"
                        />
                      )}
                    </div>
                    <Form
                      className="register-form"
                      onSubmit={this.generalLogin}
                    >
                      <label>Email</label>
                      <Input
                        placeholder="Email"
                        type="text"
                        name={"email"}
                        value={email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        required
                      />
                      <label>Password</label>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        required
                      />
                      <Button block className="btn-round" color="primary">
                        {/* {login ? "Login" : "Register"} */}
                        Login
                      </Button>
                    </Form>

                    <div className="forgot">
                      <Button
                        className="btn-link"
                        color="danger"
                        onClick={(e) => e.preventDefault()}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <div className="forgot">
                      <Button
                        className="btn-link"
                        color="info"
                        onClick={this.toggleAuthProcess}
                        style={{ marginTop: "-10px" }}
                      >
                        {/* {`Want to ${login ? "register" : "login"}?`} */}
                        Want to Register
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
            <div className="footer register-footer text-center">
              <h6>
                © {new Date().getFullYear()}, made with{" "}
                <i className="fa fa-heart heart" /> by Smart Data
              </h6>
            </div>
          </div>
        </MasterLayout>
      </>
    );
  }
}

const mapStateToProps = ({ auth, error, loader }) => {
  return { auth: auth };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginUser,
      clearAuthReducer,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
