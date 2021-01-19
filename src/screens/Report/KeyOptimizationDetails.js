import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { graphByPage } from "../../redux/Actions/ActionCreators";
import { getItem } from "redux/Utils/AsyncUtils";
import CustomLoader from "components/Loader/CustomLoader";
const IMAGE_BASE_URL = "http://35.165.235.204:8001";
class KeyOptimizationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Priyanka Tiwari",
      userEmail: "",
      graphRes: [],
      imageUrlPath: "",
      modalVisible: false,
      graphData: [],
      tableData: [],
      graphImpText: [],
      data: {},
      graphs: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    // console.log("<<selectedData>>", this.props.route.params.selectedData);
    let data = getItem("selectedData");
    this.setState({ data: data, isLoading: true });
    const { page, templates } = data;
    let postData = {
      file_name: "1584439740281-rjfemaleage46zip92234.pdf",
      report_type: 1,
      page: page,
      templates: templates,
    };
    console.log("PostDataGraph", postData);
    this.props.graphByPage(postData);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(
    //   "getGraphByPageRes_PRIYANKA>>",
    //   JSON.stringify(nextProps.ReportReducer.getGraphByPageRes)
    // );
    if (
      nextProps.ReportReducer.getGraphByPageRes !== prevState.getGraphByPageRes
    ) {
      let data = nextProps.ReportReducer.getGraphByPageRes;

      if (data !== undefined) {
        return {
          getGraphByPageRes: data,
          graphsData:
            data.graphs !== undefined &&
            data.graphs !== null &&
            data.graphs.length > 0
              ? data.graphs[0]
              : "",
          tableData:
            data.tables !== undefined &&
            data.tables !== null &&
            data.tables.length > 0
              ? data.tables
              : [],
          isLoading: false,
          imageUrlPath:
            data.graphs !== undefined &&
            data.graphs !== null &&
            data.graphs.length > 0
              ? IMAGE_BASE_URL + data.graphs[0].graph_path
              : "",
          graphName:
            data.graphs !== undefined &&
            data.graphs !== null &&
            data.graphs.length > 0
              ? data.graphs[0].graph_name
              : "",
          graphImpText:
            data.graphs !== undefined &&
            data.graphs !== null &&
            data.graphs.length > 0
              ? data.graphs[0].imp_text
              : "",
        };
      }
    }
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  render() {
    // console.log(this.state.data);
    // console.log(this.props.ReportReducer);
    console.log("text=========", this.state);
    const GraphUI = (props) => {
      const { data } = props;
      return data.map((item, i) => {
        return (
          <div>
            <div style={styles.listView} key={i}>
              <p style={styles.textColor}> {this.capitalize(item)}</p>
            </div>
            <hr />
          </div>
        );
      });
    };
    const TableUI = (props) => {
      const { data } = props;
      return data.map((item, i) => {
        let text = [];
        var finalData = item.data;
        var upperCaseWords = item.data.match(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g);
        if (upperCaseWords !== null) {
          upperCaseWords.forEach((element) => {
            text.push(element + " ");
          });

          for (var i = 0; i < upperCaseWords.length; i++) {
            console.log("upperCaseWords[i]==>", upperCaseWords[i]);
            finalData = finalData.replace(upperCaseWords[i], "");
          }
        }

        return (
          <div key={i} className="my-5">
            <p className="mb-3" style={{ fontWeight: "bold" }}>
              {text}
            </p>
            <p style={{ fontWeight: 500 }}>{finalData}</p>
          </div>
        );
      });
    };
    const { graphImpText, tableData } = this.state;
    return (
      <MasterLayout>
        {this.state.isLoading === true ? (
          <CustomLoader loader={this.state.isLoading} />
        ) : (
          <div className="mb-4" style={styles.wrapper}>
            <div style={styles.wellnessDiv} className="mt-5">
              <img
                src={this.state.imageUrlPath}
                style={{ maxWidth: 400, textAlign: "center" }}
              />

              <p classNAme="mt-3" style={styles.text}>
                {this.state.graphName}
              </p>
            </div>

            <div className="mt-5 pt-3 px-3" style={styles.listWrapper}>
              {graphImpText.length ? <GraphUI data={graphImpText} /> : null}
            </div>
            <div className="p-2" style={styles.listWrapper}>
              {tableData.length ? <TableUI data={tableData} /> : null}
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
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyOptimizationDetails);

const styles = {
  wrapper: {
    paddingTop: 80,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontWeight: 700,
    color: COLORS.text_gray,
    fontSize: 22,
    textAlign: "center",
  },

  hrBorder: { border: "3px solid gray", width: "30%" },
  wellnessDiv: {
    textAlign: "center",
  },
  listView: { display: "flex", justifyContent: "space-between" },
  listWrapper: { boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)" },
  textColor: { color: COLORS.black, fontWeight: 500 },
};
