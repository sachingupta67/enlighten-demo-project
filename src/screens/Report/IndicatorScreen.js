import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { getItem, storeItem } from "../../redux/Utils/AsyncUtils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  graphByPage,
  circulatoryReport,
} from "../../redux/Actions/ActionCreators";
import CustomLoader from "components/Loader/CustomLoader";
import CustomButton from "components/Custom/CustomButton";
class IndicatorScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "Anvita Dixit",
      userEmail: "",
      graphRes: [],
      imageUrlPath: "",
      modalVisible: false,
      graphData: [],
      tableData: [],
      graphImpText: [],
    };
  }

  componentDidMount() {
    let checkType = getItem("type");

    if (checkType === 1) {
      let prevData = {
        indicatorName: getItem("indicatorName") || null,
        foodData: getItem("foodData") || null,
        additivesData: getItem("additivesData") || null,
      };

      if (
        prevData.indicatorName &&
        prevData.foodData &&
        prevData.additivesData
      ) {
        this.setState({ isLoading: true });
        let postData = {
          file_name: "1584439740281-rjfemaleage46zip92234.pdf",
          report_type: 1,
          page: prevData.foodData.page,
          templates: prevData.foodData.templates,
        };
        // console.log("PostDataGraph_IndicatorsScreen", postData);
        this.props.graphByPage(postData);
      } else {
        this.props.history.push("/report");
      }
    }
    if (checkType === 2) {
      let postData = {
        file_name: "1584439740281-rjfemaleage46zip92234.pdf",
        report_type: 1,
      };
      this.setState({ isLoading: true });
      this.props.circulatoryReport(postData);
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (getItem("type") === 1) {
      if (
        nextProps.ReportReducer.getGraphByPageRes !==
        prevState.getGraphByPageRes
      ) {
        let data = nextProps.ReportReducer.getGraphByPageRes;

        if (data !== undefined) {
          return {
            isLoading: false,
            getGraphByPageRes: data,
            tableData:
              data.tables !== undefined &&
              data.tables !== null &&
              data.tables.length > 0
                ? data.tables
                : [],
            tableName:
              data.tables !== undefined &&
              data.tables !== null &&
              data.tables.length > 0
                ? data.tables[0].table_title
                : "",
          };
        }
      }
    }
    if (getItem("type") === 2) {
      if (
        nextProps.ReportReducer.getCirculatoryRepost !==
        prevState.getCirculatoryRepost
      ) {
        let data = nextProps.ReportReducer.getCirculatoryRepost;

        if (data !== undefined) {
          return {
            isLoading: false,
            getCirculatoryRepost: data.tables,
            tableData:
              data.tables !== undefined &&
              data.tables !== null &&
              data.tables.length > 0
                ? data.tables
                : [],
          };
        }
      }
    }
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  foodAdditives = () => {
    if (getItem("additivesData") && getItem("foodData")) {
      this.props.history.push("/foodAdditivesScreen");
    } else {
      window.alert("Additives and food data required");
    }
  };

  render() {
    const { tableData } = this.state;
    const GraphUI = (props) => {
      const { data } = props;
      return data.length ? (
        data.map((item, i) => {
          let x = item.data.split("\n");
          return (
            <>
              {x.map((value, i) => (
                <div key={i}>
                  <p style={styles.textColor}> {value}</p>
                </div>
              ))}
            </>
          );
        })
      ) : (
        <div>
          <p style={styles.textColor}> Data Not Available</p>
        </div>
      );
    };
    return (
      <MasterLayout>
        {this.state.isLoading === true ? (
          <CustomLoader loader={this.state.isLoading} />
        ) : (
          <div style={styles.wrapper}>
            <h3 style={{ fontWeight: 500 }}>
              <center>{getItem("indicatorName")}</center>
            </h3>
            <div className="mt-4 p-2" style={styles.listWrapper}>
              {tableData.length ? <GraphUI data={tableData} /> : null}
            </div>
            <div style={{ textAlign: "center", marginTop: 100 }}>
              {getItem("type") === 1 ? (
                <CustomButton
                  title="Food Additives"
                  style={styles.btnStyle}
                  buttonHandler={() => this.foodAdditives()}
                />
              ) : null}
            </div>
          </div>
        )}
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
      circulatoryReport,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorScreen);

const styles = {
  wrapper: {
    paddingTop: 80,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  textColor: {
    color: COLORS.TEXT_COLOR,
    fontWeight: 500,
  },
  btnStyle: {
    background: COLORS.PRIMARY_COLOR,
    borderColor: COLORS.PRIMARY_COLOR,
  },
  listWrapper: { boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)" },
};
