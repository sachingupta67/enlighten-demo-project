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
import CustomLoader from "components/Loader/CustomLoader";

class MyNutritionSystem extends React.Component {
  constructor() {
    super();
    this.state = {
      graphData: [],
      tableData: [],

      baseTargetData: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    let postData = {
      age: getItem("age"),
      gender: getItem("gender"),
      userId: getItem(Strings.KEY_USER_DATA).id,
    };
    // console.log("postData Profile", JSON.stringify(postData));
    this.setState({ isLoading: true });
    this.props.addBaseTarget(postData);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.HomeReducer.addBaseTargetRes !== prevState.responseData) {
      return {
        baseTargetData: nextProps.HomeReducer.addBaseTargetRes || [],
        responseData: nextProps.HomeReducer.addBaseTargetRes,
        isLoading: false,
      };
    }
  }
  render() {
    console.log(this.state);
    const { baseTargetData } = this.state;
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
          <div style={{ display: "flex", border: "1px solid black" }}>
            <div
              className="p-2"
              style={{
                width: "33.33%",
                textAlign: "center",
                fontWeight: 500,
                borderRight: "1px solid black",
              }}
            >
              Lable
            </div>
            <div
              className="p-2"
              style={{
                width: "33.33%",
                textAlign: "center",
                fontWeight: 500,
                borderRight: "1px solid black",
              }}
            >
              Base RDA
            </div>
            <div
              className="p-2"
              style={{ width: "33.33%", textAlign: "center", fontWeight: 500 }}
            >
              My Target
            </div>
          </div>
          {baseTargetData.length
            ? baseTargetData.map((item, i) => {
                console.log("checking=====>", item);
                return (
                  <div style={{ display: "flex", border: "1px solid black" }}>
                    <div
                      className="p-2"
                      style={{
                        width: "33.33%",
                        textAlign: "center",
                        fontWeight: 500,
                        borderRight: "1px solid black",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="p-2"
                      style={{
                        width: "33.33%",
                        textAlign: "center",
                        fontWeight: 500,
                        borderRight: "1px solid black",
                      }}
                    >
                      {item.base}
                    </div>
                    <div
                      className="p-2"
                      style={{
                        width: "33.33%",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {item.target}
                    </div>
                  </div>
                );
              })
            : null}
          <CustomLoader loader={this.state.isLoading} />
        </div>
      </MasterLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    HomeReducer: state.HomeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addBaseTarget,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNutritionSystem);
