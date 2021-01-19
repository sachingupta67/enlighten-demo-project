import React from "react";

// reactstrap components
import { Container, Row, Col, Form, Button } from "reactstrap";

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import ContentWrapperModal from "components/Modal/ContentWrapperModal";
import MasterLayout from "components/Layout/MasterLayout";
import ProfileScreenHeader from "components/Headers/ProfileScreenHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProfileDetails,
  updateProfileDetails,
  clearProfile,
} from "../../redux/Actions/ActionCreators";
import { getItem } from "../../redux/Utils/AsyncUtils";
import { Strings } from "../../redux/Constants";
import validator from "../../redux/dataValidator";
import moment from "moment";
import Colors from "../../redux/Constants/Colors";
import DropDown from "components/DropDown/DropDown";
import profileData from "./ProfileData";
import InputField from "components/Form/InputField";
import { APIUrls } from "../../redux/Constants";
import Axios from "axios";
import CustomLoader from "../../components/Loader/CustomLoader";
import MyNutritionSystem from "./MyNutritionSystem";
import COLORS from "../../redux/Constants/Colors";

class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: "1",
      gender: 0,
      weight: 0,
      age: 0,
      hfeet: 0,
      hinch: 0,
      fitnessGoal: 0,
      diet: 0,
      image: "",
      update: false,
      name: "",
      goalData: [],
      dietData: [],
      isLoading: false,
      imgUpload: false,
      nutrition: false,
    };
  }

  componentDidMount() {
    let user = getItem(Strings.KEY_USER_DATA);
    if (user) {
      const { id, loginToken } = user;
      const postData = {
        userId: id,
      };
      this.props.getProfileDetails(postData, loginToken);
      this.fetchGoalandDiet();
    }
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }

  fetchGoalandDiet = async () => {
    try {
      this.setState({ isLoading: true });
      let resGoal = await Axios(APIUrls.GET_GOAL);
      let resDiet = await Axios(APIUrls.GET_DIET);
      if (resGoal.status === 200 && resDiet.status === 200) {
        this.setState({
          dietData: resDiet.data.data.Diets,
          goalData: resGoal.data.data.Goals,
        });
        this.setState({ isLoading: false });
      }
    } catch (err) {
      this.setState({ isLoading: false });
      alert("Something went wrong");
    }
  };
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };
  onHandleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };
  fileSelectedHandler = async (e) => {
    e.preventDefault();
    this.setState({
      image: e.target.files[0],
      imgUpload: false,
    });
    this.uploadImage();
  };

  uploadImage = () => {
    const { image } = this.state;
    const userId = getItem(Strings.KEY_USER_DATA).id;
    let fd = new FormData();
    fd.append("file", image);
    fd.append("userId", userId);
    console.log(fd);
    this.fetchAPiCallingCode(fd);
    // if (image) {
    //   this.fetchAPiCallingCode(fd);
    // }
  };

  fetchAPiCallingCode(formData) {
    console.log("==FormData 22==", JSON.stringify(formData));
    console.log("==  APIUrls.IMAGE_UPLOAD==", APIUrls.IMAGE_UPLOAD);
    this.setState({ isLoading: true });

    fetch(APIUrls.IMAGE_UPLOAD, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: this.state.token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false });

        console.log("===ImageUpload ", JSON.stringify(responseJson));
      })
      .catch((error) => {
        console.log("Error", error);
        this.setState({ isLoading: false });
      });
  }

  updateProfileHandler = (e) => {
    const {
      name,
      gender,
      weight,
      hfeet,
      hinch,
      fitnessGoal,
      diet,
      age,
    } = this.state;
    e.preventDefault();
    let params = {
      userId: getItem(Strings.KEY_USER_DATA).id,
      firstname: name,
      lastname: name,
      gender: gender,
      weight: weight,
      age: age,
      height_feet: hfeet,
      height_inches: hinch,
      goals: fitnessGoal,
      diet: diet,
    };
    this.setState({ update: !this.state.update });
    //  this.setState({ isLoading: true });
    this.props.updateProfileDetails(params);
  };
  render() {
    document.documentElement.classList.remove("nav-open");
    const {
      activeTab,
      weight,
      gender,
      age,
      hfeet,
      hinch,
      diet,
      fitnessGoal,
      image,
      update,
      name,
      goalData,
      dietData,
      isLoading,
      imgUpload,
    } = this.state;
    const { getProfileRes } = this.props;
    const userProfile = validator.profileDetailsHandler(getProfileRes);
    console.log(userProfile.age, userProfile.gender);
    return (
      <>
        <MasterLayout>
          <ProfileScreenHeader />
          <div className="section profile-content">
            <Container>
              <ContentWrapperModal modal={false} />
              <div className="owner">
                <div
                  className="avatar"
                  onClick={() => {
                    this.setState({ imgUpload: true });
                  }}
                >
                  <img
                    alt="enlighten-365-user"
                    className="img-circle img-no-padding img-responsive"
                    src={
                      userProfile.profileImage ||
                      require("../../assets/img/enlighten-logo.png")
                    }
                    style={{ background: "black" }}
                  />
                  <icon name="edit" />
                </div>
                <br />
                {imgUpload ? (
                  <>
                    <input
                      type="file"
                      onChange={this.fileSelectedHandler}
                      value={image}
                      style={{ marginLeft: "11%" }}
                    />
                  </>
                ) : null}

                <div className="name">
                  <h4 className="title" style={styles.email}>
                    {userProfile.firstname}
                    <br />
                  </h4>
                  <p style={styles.email}>{userProfile.email}</p>
                  <p style={styles.date}>
                    Member since :{moment(userProfile.createdAt).format("LLLL")}
                  </p>
                </div>
              </div>
              <br />

              <Container>
                <Row>
                  <Col className="ml-auto mr-auto" md={`${update ? "1" : "2"}`}>
                    <Button
                      onClick={() => {
                        this.setState({ update: !update });
                      }}
                      className="btn btn-sm"
                      color={`${update ? "primary" : "default"}`}
                    >
                      {update ? "Cancel" : "Update Profile"}
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="ml-auto mr-auto" md="8">
                    <Form
                      className="contact-form"
                      onSubmit={this.updateProfileHandler}
                    >
                      <Row>
                        <InputField
                          label={"Full Name"}
                          placeholder={`${
                            update ? "Enter your name" : userProfile.firstname
                          }`}
                          value={name}
                          name="name"
                          handler={this.onHandleChange}
                          type="text"
                          col={`${update ? "12" : "12"}`}
                          update={update}
                        />

                        {update ? (
                          <DropDown
                            label={"Gender"}
                            data={profileData.gender}
                            value={gender}
                            name="gender"
                            handler={this.onHandleChange}
                            update={update}
                          />
                        ) : (
                          <InputField
                            label={"Gender"}
                            value={userProfile.gender}
                            update={update}
                          />
                        )}

                        <InputField
                          label={"Weight"}
                          placeholder={`${
                            update ? "Enter your weight" : userProfile.weight
                          }`}
                          value={update ? weight : userProfile.weight}
                          name="weight"
                          handler={this.onHandleChange}
                          type="number"
                          update={update}
                        />
                      </Row>
                      <Row>
                        <InputField
                          label={"Age"}
                          placeholder={`${
                            update ? "Enter your age" : userProfile.age
                          }`}
                          value={update ? age : userProfile.age}
                          name="age"
                          handler={this.onHandleChange}
                          type="number"
                          update={update}
                        />
                        {update ? (
                          <>
                            <DropDown
                              label="Height (feet)"
                              data={profileData.heightFit}
                              col="3"
                              name="hfeet"
                              value={hfeet}
                              handler={this.onHandleChange}
                              update={update}
                            />
                            <DropDown
                              label="Height (inches)"
                              data={profileData.heightInch}
                              col="3"
                              name="hinch"
                              value={hinch}
                              handler={this.onHandleChange}
                              update={update}
                            />
                          </>
                        ) : (
                          <>
                            <InputField
                              label="Height (feet)"
                              value={userProfile.height_feet}
                              update={update}
                              col="3"
                            />
                            <InputField
                              label="Height (inches)"
                              value={userProfile.height_inches}
                              update={update}
                              col="3"
                            />
                          </>
                        )}
                      </Row>
                      <Row>
                        {update ? (
                          <>
                            <DropDown
                              label="Fitness Goal"
                              data={goalData}
                              name="fitnessGoal"
                              value={fitnessGoal}
                              handler={this.onHandleChange}
                              update={update}
                            />
                            <DropDown
                              label="Diet Plan"
                              data={dietData}
                              name="diet"
                              value={diet}
                              handler={this.onHandleChange}
                              update={update}
                            />
                          </>
                        ) : (
                          <>
                            <InputField
                              label="Fitness Goal"
                              value={
                                userProfile.goals.length
                                  ? userProfile.goals[0].name
                                  : "Not Found"
                              }
                              update={update}
                            />
                            <InputField
                              label="Diet Plan"
                              value={
                                userProfile.diet.length
                                  ? userProfile.diet[0].name
                                  : "Not Found"
                              }
                              update={update}
                            />
                          </>
                        )}
                      </Row>
                      {update ? (
                        <Row>
                          <Col className=" mr-auto" col="5">
                            <Button
                              // onClick={() => this.updateProfileHandler()}
                              className="btn btn-sm"
                            >
                              Update
                            </Button>
                          </Col>
                        </Row>
                      ) : null}
                    </Form>
                    {/* <p
                      onClick={() =>
                        this.setState({ nutrition: !this.state.nutrition })
                      }
                    >
                      Nutrision
                    </p>
                    {this.state.nutrition ? (
                      <MyNutritionSystem
                        data={{
                          gender: userProfile.gender,
                          age: userProfile.age,
                        }}
                      />
                    ) : null} */}
                    <p
                      className="mt-5"
                      style={{
                        color: COLORS.outline,
                        fontWeight: 500,
                        textAlign: "center",
                        fontSize: 20,
                      }}
                      onClick={() => {
                        if (isLoading) {
                          window.alert("data is loading");
                        } else {
                          let gender = getItem("gender");
                          let age = getItem("age");
                          if (age && gender) {
                            this.props.history.push("/myNutritionResults");
                          } else {
                            window.alert(
                              "Oops something went wrong,try after some time"
                            );
                          }
                        }
                      }}
                    >
                      My Nutrition System Results
                    </p>

                    <div
                      className="mt-4"
                      style={{
                        background: COLORS.colorPrimaryMiddle,
                        textAlign: "center",
                        padding: 10,
                      }}
                    >
                      <p style={{ color: COLORS.WHITE_COLOR, fontWeight: 500 }}>
                        {" "}
                        Order My Custom Blend Now
                      </p>
                      <p style={{ color: COLORS.WHITE_COLOR, fontWeight: 500 }}>
                        Dietary supplements that 'll help to achive your fitness
                        Goal.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Container>
          </div>
          {/* <DemoFooter /> */}
          <CustomLoader loader={isLoading} />
        </MasterLayout>
      </>
    );
  }
}

const mapStateToProps = ({ profile }) => {
  const { getProfileRes, updateProfileRes } = profile;
  return { getProfileRes, updateProfileRes };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProfileDetails,
      updateProfileDetails,
      clearProfile,
    },
    dispatch
  );
};

const styles = {
  date: {
    fontWeight: 600,
  },
  email: {
    fontWeight: 600,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
