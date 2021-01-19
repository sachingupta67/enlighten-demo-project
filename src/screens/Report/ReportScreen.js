import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import CustomButton from "components/Custom/CustomButton";
import { reports, reportOverview } from "../../redux/Actions/ActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItem, storeItem } from "../../redux/Utils/AsyncUtils";
import CustomLoader from "../../components/Loader/CustomLoader";
import Strings from "../../redux/Constants/Strings";
import CustomChart from "components/ApexChart";

const IMAGE_BASE_URL = "http://35.165.235.204:8001";
class ReportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Anvita dixit",
      userEmail: "",
      graphRes: [],
      imageUrlPath: "",
      modalVisible: false,
      graphData: [],
      tableData: [],
      userId: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    let user = getItem(Strings.KEY_USER_DATA);

    if (user) {
      this.setState({ userId: user.id, isLoading: true });
      console.log(user);
      this.props.reports(user.id);
    }

    // this.getReportNameApi();
    // this.callReportAPI();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.ReportReducer.getReportsRes !== prevState.getReportsRes) {
      return {
        getReportsRes: nextProps.ReportReducer.getReportsRes,
      };
    }

    if (
      nextProps.ReportReducer.getReportsOverviewRes !==
      prevState.getReportsOverviewRes
    ) {
      return {
        getReportsOverviewRes: nextProps.ReportReducer.getReportsOverviewRes,
        graphsData: nextProps.ReportReducer.getReportsOverviewRes.graphs[0],
        tableData: nextProps.ReportReducer.getReportsOverviewRes.tables[0].data,
        isLoading: false,
        imageUrlPath:
          IMAGE_BASE_URL +
          nextProps.ReportReducer.getReportsOverviewRes.graphs[0].graph_path,
        graphName:
          nextProps.ReportReducer.getReportsOverviewRes.graphs[0].graph_name,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ReportReducer.getReportsRes !== prevState.getReportsRes) {
      if (
        this.props.ReportReducer.statusCodeReports ===
        Strings.HTTP_STATUS_CODE_OK
      ) {
        let postData = {
          file_name: "1584439740281-rjfemaleage46zip92234.pdf",
          report_type: 1,
        };
        this.props.reportOverview(postData);
      }
    }
  }
  onIndicatorClick = (name) => {
    let foodData = this.state.tableData.find((x) => {
      console.log("chaking====>,", x, x.name);
      return x.name === "foods";
    });
    console.log(foodData);

    let additivesData = this.state.tableData.find(
      (x) => x.name === "additives"
    );
    console.log(foodData, additivesData);
    if (foodData && additivesData) {
      storeItem("type", 1);
      storeItem("indicatorName", name);
      storeItem("foodData", foodData);
      storeItem("additivesData", additivesData);
      this.props.history.push("/indicatorScreen");
    } else {
      window.alert(
        this.state.isLoading
          ? "Data is loading"
          : "Data not found yet try after sometime"
      );
    }
  };

  onCirculatoryClick = (name) => {
    storeItem("indicatorName", name);
    storeItem("type", 2);
    this.props.history.push("/indicatorScreen");
  };
  onActionPlanClick = () => {
    if (this.state.isLoading) {
      window.alert("Data is loading!!!");
    } else {
      if (this.state.tableData.length) {
        let findResult = this.state.tableData.find(
          (x) => x.name === "90_steps"
        );
        storeItem("actionPlanData", findResult);
        this.props.history.push("/actionPlanScreen", {
          actionPlanData: findResult,
        });
      } else {
        window.alert("Oops something went wrong ,please try after sometime");
      }
    }
  };

  render() {
    return (
      <MasterLayout>
        <div style={styles.wrapper}>
          <div
            style={styles.wellnessDiv}
            className="mt-5"
            onClick={() => this.props.history.push("/keyOptimizationReport")}
          >
            <img src={this.state.imageUrlPath} style={{ maxWidth: 350 }} />

            <p classNAme="mt-3" style={styles.text}>
              {this.state.graphName}
            </p>
          </div>

          <div style={styles.twoColDiv}>
            <div>
              <p className="py-2" style={styles.textColor}>
                <span>
                  <i className="fa fa-cog" style={styles.icon} />
                </span>
                Gut support
              </p>
              <p style={styles.textColor}>
                <span>
                  <i className="fa fa-cog" style={styles.icon} />
                </span>
                Frequency Interferernce
              </p>
            </div>
            <div>
              <p
                className="py-2"
                style={styles.textColor}
                onClick={() => {
                  if (this.state.isLoading) {
                    window.alert("data is loading!!!");
                  } else {
                    this.onCirculatoryClick(Strings.CIRCULATORY_SUPPORT);
                  }
                }}
              >
                <span>
                  <i className="fa fa-cog" style={styles.icon} />
                </span>
                Circulatory support
              </p>
              <p
                style={styles.textColor}
                onClick={() => {
                  if (this.state.isLoading) {
                    window.alert("data is loading!!!");
                  } else {
                    this.onIndicatorClick("Food Restrictions");
                  }
                }}
              >
                <span>
                  <i className="fa fa-cog" style={styles.icon} />
                </span>
                Food Restrictions
              </p>
            </div>
          </div>
          <div style={styles.buttonWrap} className="mb-5">
            <CustomButton
              className="btn-block my-3"
              title="30 Days Action Plan"
              style={styles.buttonStyle}
              buttonHandler={() => this.onActionPlanClick()}
            />
            <CustomButton
              className="btn-block my-3"
              title="Diet Plan"
              style={styles.buttonStyle}
              buttonHandler={() => alert("hello")}
            />
            <CustomButton
              className="btn-block my-3"
              title="Fitness Plan"
              style={styles.buttonStyle}
              buttonHandler={() => alert("hello")}
            />
            <CustomButton
              className="btn-block my-3"
              title="Progress Tracker"
              style={styles.buttonStyle}
              buttonHandler={() => alert("hello")}
            />
          </div>
        </div>
        {/* <CustomChart xData={""} yData={""} name={""} /> */}
        <CustomLoader loader={this.state.isLoading} />
      </MasterLayout>
    );
  }
}

//export default ReportScreen;
const mapStateToProps = (state) => {
  return {
    ReportReducer: state.ReportReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      reports,
      reportOverview,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);

const styles = {
  wrapper: {
    paddingTop: 80,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontWeight: 700,
    color: COLORS.text_gray,
    fontSize: 22,
    textAlign: "center",
  },
  textColor: {
    fontWeight: 500,
    color: COLORS.outline,
    fontSize: 16,
  },

  wellnessDiv: {
    height: 350,
    textAlign: "center",
  },
  twoColDiv: {
    display: "flex",
    justifyContent: "space-around",
  },
  icon: { color: COLORS.black, fontSize: 20, marginRight: 10 },
  buttonWrap: {
    textAlign: "center",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonStyle: {
    background: COLORS.colorPrimaryDark,
    border: "none",
    // width: "50%",
  },
};
