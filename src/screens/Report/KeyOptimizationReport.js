import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { connect } from "react-redux";
import { storeItem } from "redux/Utils/AsyncUtils";
const IMAGE_BASE_URL = "http://35.165.235.204:8001";
class KeyOptimizationReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Anvita Dixit",
      userEmail: "",
      graphRes: [],
      imageUrlPath: "",
      modalVisible: false,
      graphData: [],
      tablesData: [],
    };
  }
  componentDidMount() {
    if (!this.state.tablesData.length) {
      this.props.history.push("/report");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.ReportReducer.getReportsOverviewRes !==
      prevState.getReportsOverviewRes
    ) {
      console.log(
        "KEY_getReportsResOverview_Anvi>>",
        JSON.stringify(nextProps.ReportReducer.getReportsOverviewRes.graphs)
      );
      console.log(
        "tables_PRIYANKA>>",
        JSON.stringify(
          nextProps.ReportReducer.getReportsOverviewRes.tables[0].data[0]
        )
      );
      return {
        getReportsOverviewRes: nextProps.ReportReducer.getReportsOverviewRes,
        graphsData: nextProps.ReportReducer.getReportsOverviewRes.graphs[0],
        tablesData:
          nextProps.ReportReducer.getReportsOverviewRes.tables[0].data,
        isLoading: false,
        imageUrlPath:
          IMAGE_BASE_URL +
          nextProps.ReportReducer.getReportsOverviewRes.graphs[0].graph_path,
        graphName:
          nextProps.ReportReducer.getReportsOverviewRes.graphs[0].graph_name,
      };
    }
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    console.log(this.state);
    console.log(this.props.ReportReducer);
    const GraphUI = (props) => {
      const { data } = props;
      return data.map((item, i) => {
        return (
          <div>
            <div
              style={styles.listView}
              key={i}
              onClick={() => {
                storeItem("selectedData", item);
                this.props.history.push("/keyOptimizationDetails", {
                  selectedData: item,
                });
              }}
            >
              <p style={styles.textColor}> {this.Capitalize(item.name)}</p>
              <p>
                <i className="fa fa-angle-right" />
              </p>
            </div>
            <hr />
          </div>
        );
      });
    };
    const { tablesData } = this.state;
    return (
      <MasterLayout>
        <div style={styles.wrapper}>
          <div style={styles.wellnessDiv} className="mt-5">
            <img src={this.state.imageUrlPath} style={{ maxWidth: 350 }} />

            <p classNAme="mt-3" style={styles.text}>
              {this.state.graphName}
            </p>
          </div>

          <div className="mt-5 pt-3 px-3" style={styles.listWrapper}>
            {tablesData.length ? <GraphUI data={tablesData} /> : null}
          </div>
        </div>
      </MasterLayout>
    );
  }
}
//export default KeyOptimizationReport;
const mapStateToProps = (state) => {
  return {
    ReportReducer: state.ReportReducer,
  };
};

export default connect(mapStateToProps)(KeyOptimizationReport);

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
    height: 350,
    textAlign: "center",
  },
  listView: { display: "flex", justifyContent: "space-between" },
  listWrapper: { boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)" },
  textColor: { color: COLORS.black, fontWeight: 500 },
};
