import React from "react";
import COLORS from "../../redux/Constants/Colors";
import APIUrls from "../../redux/Constants/APIUrls";
import Strings from "../../redux/Constants/Strings";
import CustomLoader from "../../components/Loader/CustomLoader";
import Axios from "axios";
import { storeItem } from "redux/Utils/AsyncUtils";
class Goal extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      goalData: [],
    };
  }
  componentDidMount() {
    this.fetchAPICall(APIUrls.GET_GOAL);
  }
  fetchAPICall = async (APIURL) => {
    try {
      this.setState({ isLoading: true });
      let res = await Axios(APIURL);
      if (res.status === 200) {
        this.setState({ goalData: res.data.data.Goals });
        this.setState({ isLoading: false });
      }
    } catch (err) {
      this.setState({ isLoading: false });
      alert("Something went wrong");
    }
  };
  render() {
    const { handler } = this.props;
    const { goalData } = this.state;
    return (
      <div style={styles.wrapper}>
        <p
          style={{
            textAlign: "center",
            color: COLORS.WHITE_COLOR,
            fontWeight: 600,
          }}
        >
          What's your goal?
        </p>
        {goalData.length
          ? goalData.map((item, i) => (
              <div
                className="py-2 my-3"
                style={styles.goalData}
                key={i}
                onClick={() => {
                  // storeItem("dietPlan", item.name);
                  handler(item._id, item.name);
                }}
              >
                <p style={styles.headingColor}> {item.name}</p>
                <p style={styles.titleStyle}> {item.label}</p>
              </div>
            ))
          : null}
        <CustomLoader loader={this.state.isLoading} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    background: COLORS.PRIMARY_COLOR,
    padding: "1rem",
    height: 500,
    paddingTop: 120,
  },
  goalData: {
    backgroundColor: COLORS.WHITE_COLOR,
    borderRadius: 5,
    textAlign: "center",
  },
  headingColor: { color: COLORS.PRIMARY_COLOR, fontWeight: "700" },
  titleStyle: { fontWeight: "700" },
};

export default Goal;
