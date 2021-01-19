import React from "react";
import { Row, Col, Form } from "reactstrap";
import { InputField } from "../../components/Custom/InputField";
import CustomButton from "../../components/Custom/CustomButton";
import COLORS from "redux/Constants/Colors";
import Range from "react-range-progress";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      heightFeet: "",
      heightInches: "",
      weight: "",
      goalWeight: "",
      value: "",
      weeks: 0,
      perWeekWt: 0.0,
      selectedGoalName: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onRangeChanged = (sliderValue) => {
    this.setState({ value: sliderValue });
    var splitData = sliderValue.toString().split(".");
    var getWeeksValue = splitData[0];
    var current_wt = 160;
    var goal_wt = 130;
    var wt_diff =
      goal_wt - current_wt > 0 ? goal_wt - current_wt : -(goal_wt - current_wt);

    if (getWeeksValue <= 5) {
      let perWeek = wt_diff / 6;
      this.setState({ weeks: 6, perWeekWt: perWeek.toFixed(2) });
    } else {
      this.setState({
        weeks: getWeeksValue,
        perWeekWt: wt_diff / getWeeksValue,
      });
    }

    if (goal_wt === 0) {
      this.setState({ weeks: 0, perWeekWt: 0.0 });
    }
  };
  handleSubmit = (e, handler) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { age, heightFeet, heightInches, weight, goalWeight } = this.state;
    if ((age, heightFeet, heightInches, weight, goalWeight)) {
      //  localStorage.setItem("key", "value");
      //history.push("/home");
      console.log("submit=====");
      console.log(age, heightInches, heightFeet, weight, goalWeight);
      handler(this.state);
    }
  };

  render() {
    const { handler, prevData } = this.props;
    const { selectedGoalName } = prevData;
    console.log(this.state);
    const {
      age,
      heightFeet,
      weight,
      goalWeight,
      heightInches,
      weeks,
      perWeekWt,
      value,
    } = this.state;
    return (
      <>
        <div className="p-5" style={styles.wrapper}>
          <Form>
            <InputField
              placeholder="Your Age"
              type="number"
              minimum="0"
              value={age}
              name="age"
              onChange={(e) => this.handleChange(e)}
              required
            />
            <Row>
              <Col>
                <InputField
                  placeholder="Your Height"
                  type="number"
                  title="FIT"
                  name="heightFeet"
                  value={heightFeet}
                  onChange={(e) => this.handleChange(e)}
                />
              </Col>
              <Col>
                <InputField
                  title="INCHES"
                  type="number"
                  name="heightInches"
                  value={heightInches}
                  onChange={(e) => this.handleChange(e)}
                />
              </Col>
            </Row>
            <InputField
              placeholder="Your Weight"
              title="POUND"
              name="weight"
              value={weight}
              onChange={(e) => this.handleChange(e)}
            />
            <InputField
              placeholder="Goal Weight"
              title="POUND"
              name="goalWeight"
              value={goalWeight}
              onChange={(e) => this.handleChange(e)}
            />
            <p className="mb-3">Set Your Goal</p>
            <Range
              value={parseInt(value)}
              fillColor={{
                r: 97,
                g: 202,
                b: 185,
                a: 0.75,
              }}
              trackColor={{
                r: 97,
                g: 202,
                b: 185,
                // a: 0.5,
                a: 0.75,
              }}
              height={8}
              width="100%"
              onChange={(value) => this.onRangeChanged(value)}
            />
            <p className="mt-3">{weeks} Weeks - Gradual</p>
            <p style={{ fontSize: 12 }}>
              {selectedGoalName} {perWeekWt} pound/week
            </p>
            <div style={styles.buttonBlock}>
              <CustomButton
                title="NEXT"
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

export default Signup;

const styles = {
  wrapper: {
    height: 500,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  buttonBlock: {
    // width: "90%",
    // marginLeft: "auto",
    // marginRight: "auto",
    marginTop: 40,
  },
  nextButton: { background: COLORS.PRIMARY_COLOR, border: "none" },
};
