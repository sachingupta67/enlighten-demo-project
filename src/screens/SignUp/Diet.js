import React from "react";
import COLORS from "../../redux/Constants/Colors";
import APIUrls from "../../redux/Constants/APIUrls";
import Strings from "../../redux/Constants/Strings";
import CustomLoader from "../../components/Loader/CustomLoader";
import Axios from "axios";

class Diet extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      dietData: [],
    };
  }
  componentDidMount() {
    this.fetchAPICall(APIUrls.GET_DIET);
  }
  fetchAPICall = async (APIURL) => {
    try {
      this.setState({ isLoading: true });
      let res = await Axios(APIURL);
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.data);

        this.setState({ dietData: res.data.data.Diets });
        this.setState({ isLoading: false });
      }
    } catch (err) {
      this.setState({ isLoading: false });
      alert("Something went wrong");
    }
  };
  render() {
    const { handler } = this.props;
    const { dietData } = this.state;
    return (
      <div style={styles.wrapper}>
        <p
          style={{
            textAlign: "center",
            color: COLORS.WHITE_COLOR,
            fontWeight: 600,
          }}
        >
          Select the diet you are currently on
        </p>
        {dietData.length
          ? dietData.map((item, i) => (
              <div
                className="py-2 my-3"
                style={styles.dietData}
                key={i}
                onClick={() => handler(item._id)}
              >
                <p style={styles.titleColor}> {item.name}</p>
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
    background: COLORS.colorPrimaryDark,
    padding: "1rem",
    height: 500,
    overflowY: "scroll",
  },
  dietData: {
    backgroundColor: COLORS.WHITE_COLOR,
    borderRadius: 5,
    textAlign: "center",
  },
  titleColor: { color: COLORS.colorPrimaryDark, fontWeight: "700" },
};

export default Diet;
