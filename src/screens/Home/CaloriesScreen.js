import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProfileDetails,
  updateProfileDetails,
  clearProfile,
  addBaseTarget,
} from "../../redux/Actions/ActionCreators";
import { getItem } from "../../redux/Utils/AsyncUtils";
import { Strings } from "../../redux/Constants";
import COLORS from "redux/Constants/Colors";
import CustomCircular from "../../components/Custom/CustomCircular";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import CustomChart from "../../components/ApexChart";
class CaloriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      active: 0,
    };
  }
  componentDidMount() {
    let data = getItem("homeData");
    this.setState({ data: data });
  }
  render() {
    const { eatenValue, calLeft } = this.state.data;
    const DIET_DETAILS = getItem("DIET_DETAILS") || [];
    const data = {
      fill: true,
      series: [
        {
          data: [0, 626, 73, 160, 219, 517, 800],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        // stroke: {
        //   curve: "straight",
        // },

        // grid: {
        //   row: {
        //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        //     opacity: 0.5,
        //   },
        // },
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      },
    };

    return (
      <MasterLayout>
        <div
          style={{
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid",
              borderColor: COLORS.PRIMARY_COLOR,
            }}
          >
            <div
              className="p-2"
              style={{
                width: "33.33%",
                textAlign: "center",
                fontWeight: 500,
                borderRight: "1px solid",
                borderColor: COLORS.PRIMARY_COLOR,
                color:
                  this.state.active === 0
                    ? COLORS.WHITE_COLOR
                    : COLORS.PRIMARY_COLOR,
                backgroundColor:
                  this.state.active === 0
                    ? COLORS.PRIMARY_COLOR
                    : COLORS.WHITE_COLOR,
              }}
              onClick={() => this.setState({ active: 0 })}
            >
              Today
            </div>
            <div
              className="p-2"
              style={{
                width: "33.33%",
                textAlign: "center",
                fontWeight: 500,
                borderRight: "1px solid",
                borderColor: COLORS.PRIMARY_COLOR,
                color:
                  this.state.active === 1
                    ? COLORS.WHITE_COLOR
                    : COLORS.PRIMARY_COLOR,
                backgroundColor:
                  this.state.active === 1
                    ? COLORS.PRIMARY_COLOR
                    : COLORS.WHITE_COLOR,
              }}
              onClick={() => this.setState({ active: 1 })}
            >
              Week
            </div>
            <div
              className="p-2"
              style={{
                width: "33.33%",
                textAlign: "center",
                fontWeight: 500,
                color:
                  this.state.active === 2
                    ? COLORS.WHITE_COLOR
                    : COLORS.PRIMARY_COLOR,
                backgroundColor:
                  this.state.active === 2
                    ? COLORS.PRIMARY_COLOR
                    : COLORS.WHITE_COLOR,
              }}
              onClick={() => this.setState({ active: 2 })}
            >
              Month
            </div>
          </div>

          {this.state.active === 0 ? (
            <div>
              <div
                className="mt-5"
                style={{
                  width: "20%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgressbarWithChildren
                  value={this.state.eatenValue}
                  styles={buildStyles({
                    textColor: COLORS.colorPrimaryDark,
                    pathColor: COLORS.colorPrimaryDark,
                    trailColor: COLORS.light_green,
                  })}
                >
                  {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                  <img
                    style={{ width: 50 }}
                    src={require("../../assets/img/calorie.png")}
                  />
                </CircularProgressbarWithChildren>
              </div>

              <p className="mt-4" style={{ textAlign: "center", fontSize: 25 }}>
                <span style={{ fontSize: 30, fontWeight: "700" }}>
                  {eatenValue}
                </span>
                /1300 kcal
              </p>
              <div>
                <hr />
                <p style={styles.textStyle}> Recommended Calories</p>
                <p style={styles.textStyle}>1300</p>

                <hr />
                <p style={styles.textStyle}> Eaten Calories</p>
                <p style={styles.textStyle}>{eatenValue || 0}</p>

                <hr />
                <p style={styles.textStyle}> Left Calories</p>
                <p style={styles.textStyle}>{calLeft}</p>

                <hr />
                <p style={styles.textStyle}> Burned Calories</p>
                <p style={styles.textStyle}>0</p>

                <hr />
                <p style={styles.textStyle}> Diet Plan</p>
                <p style={styles.textStyle}>
                  {DIET_DETAILS.length ? DIET_DETAILS[0].name : ""}
                </p>
              </div>
            </div>
          ) : null}
          {this.state.active === 1 ? (
            <div className="mt-5">
              <CustomChart options={data.options} series={data.series} />
            </div>
          ) : null}
          {this.state.active === 2 ? <p>hello second</p> : null}
        </div>
      </MasterLayout>
    );
  }
}

export default CaloriesScreen;
const styles = {
  textStyle: { fontWeight: 500, fontSize: 18 },
};
