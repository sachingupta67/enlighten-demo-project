import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { getItem } from "../../redux/Utils/AsyncUtils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  graphByPage,
  clearGraphByPage,
} from "../../redux/Actions/ActionCreators";
import CustomLoader from "components/Loader/CustomLoader";
import CustomButton from "components/Custom/CustomButton";
class FoodAdditiveScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "Priyanka Tiwari",
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
    // console.log('<<selectedData>>', this.props.route.params.selectedData);
    let foodAdditivesData = getItem("additivesData");
    if (foodAdditivesData) {
      if (foodAdditivesData.page && foodAdditivesData.templates) {
        let postData = {
          file_name: "1584439740281-rjfemaleage46zip92234.pdf",
          report_type: 1,
          page: foodAdditivesData.page,
          templates: foodAdditivesData.templates,
        };
        this.setState({ isLoading: true });
        this.props.graphByPage(postData, true);
      }
    }

    // console.log("PostDataGraph_IndicatorsScreen", postData);
    //this.setState({ isLoading: true });
    //this.props.graphByPage(postData, true);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.ReportReducer.getGraphByPageDetailRes !==
      prevState.getGraphByPageRes
    ) {
      let data = nextProps.ReportReducer.getGraphByPageDetailRes;

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

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { tableData } = this.state;
    const GraphUI = (props) => {
      const { data } = props;
      return data.length ? (
        data.map((item, i) => {
          let x = item.data.split("\n");
          return (
            <div key={i}>
              {x.map((value, i) => (
                <div key={i}>
                  <p style={styles.textColor}> {value}</p>
                </div>
              ))}
            </div>
          );
        })
      ) : (
        <div>
          <p style={styles.textColor}> Data not available</p>
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
              <center>{getItem("foodTitle")}</center>
            </h3>
            <div className="mt-4 p-2" style={styles.listWrapper}>
              {tableData.length ? <GraphUI data={tableData} /> : null}
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
      clearGraphByPage,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodAdditiveScreen);

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
    // display: "table-caption",
  },
  btnStyle: {
    background: COLORS.PRIMARY_COLOR,
    borderColor: COLORS.PRIMARY_COLOR,
  },
  listWrapper: { boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)" },
};
