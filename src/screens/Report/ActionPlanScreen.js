import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { graphByPage } from "../../redux/Actions/ActionCreators";
import { getItem } from "redux/Utils/AsyncUtils";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CustomLoader from "../../components/Loader/CustomLoader";

const IMAGE_BASE_URL = "http://35.165.235.204:8001";
class ActionPlanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Anvita",
      userEmail: "",
      graphRes: [],
      imageUrlPath: "",
      modalVisible: false,
      graphData: [],
      tableData: [],
      active: 0,
      isLoading: false,
    };
  }
  // if (checkType === 1) {
  //   let prevData = {
  //     actionPlanData: getItem("actionPlanData") || null,

  //   };

  //   if (
  //     prevData.indicatorName &&
  //     prevData.foodData &&
  //     prevData.additivesData
  //   ) {
  //     this.setState({ isLoading: true });
  //     let postData = {
  //       file_name: "1584439740281-rjfemaleage46zip92234.pdf",
  //       report_type: 1,
  //       page: prevData.foodData.page,
  //       templates: prevData.foodData.templates,
  //     };
  //     // console.log("PostDataGraph_IndicatorsScreen", postData);
  //     this.props.graphByPage(postData);
  //   } else {
  //     this.props.history.push("/report");
  //   }
  // }
  componentDidMount() {
    let prevData = {
      actionPlanData: getItem("actionPlanData") || null,
    };
    this.setState({ isLoading: true });
    let postData = {
      file_name: "1584439740281-rjfemaleage46zip92234.pdf",
      report_type: 1,
      page: prevData.actionPlanData.page,
      templates: prevData.actionPlanData.templates,
    };
    console.log("PostDataGraph", postData);
    this.props.graphByPage(postData);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.ReportReducer.getGraphByPageRes !== prevState.getGraphByPageRes
    ) {
      return {
        getGraphByPageRes: nextProps.ReportReducer.getGraphByPageRes,
        tableData: nextProps.ReportReducer.getGraphByPageRes.tables,
        isLoading: false,
      };
    }
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    console.log(this.state.tableData);
    const { tableData } = this.state;
    return (
      <MasterLayout>
        <div
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            width: "80%",
            margin: "10% auto",
          }}
        >
          {tableData.length ? (
            <Carousel
              showThumbs={true}
              // showStatus={false}
              infiniteLoop
              // emulateTouch
              autoPlay
              useKeyboardArrows
              transitionTime={100}
              // axis="vertical"
              // selectedItem={1}
              nextArrow={{ color: "#0000" }}
            >
              {tableData.map((item) => {
                return (
                  <div
                    style={{ height: 400, backgroundColor: "#fcfcfc" }}
                    className="slide-holder"
                  >
                    <div className="pt-5">
                      <h2>{item.table_title}</h2>
                      <p>{item.data}</p>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          ) : (
            <div
              className="slide-holder"
              style={{ height: 400, backgroundColor: "#fcfcfc" }}
            >
              <div className="pt-5">
                <h2>{""}</h2>
                <p>{""}</p>
              </div>
            </div>
          )}
        </div>
        <CustomLoader loader={this.state.isLoading} />
      </MasterLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ReportReducer: state.ReportReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      graphByPage,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ActionPlanScreen);

const styles = {
  wrapper: {
    paddingTop: 80,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
};
