import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { Input, InputGroup } from "reactstrap";
import CustomList from "components/Custom/CustomList";
import {
  getRecentFood,
  getFrequentFood,
} from "../../redux/Actions/ActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItem } from "../../redux/Utils/AsyncUtils";
import Strings from "../../redux/Constants/Strings";
import CustomLoader from "../../components/Loader/CustomLoader";
import { storeItem } from "../../redux/Utils/AsyncUtils";
const KEYS_TO_FILTERS = ["food_name"];
class FrequentRecent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      getRecentData: [],
      newFilterList: [],
      searchPlaceholder: "Search",
      searchText: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    let user = getItem(Strings.KEY_USER_DATA);
    if (user) {
      this.setState({ userId: user.id, isLoading: true });
      console.log(user);
      this.props.getRecentFood(user.id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("<< getRecentRes >>", nextProps.FoodTypeReducer.getRecentRes);
    if (nextProps.FoodTypeReducer.getRecentRes !== prevState.getRecentData) {
      // this.setState({ isLoading: false });
      return {
        isLoading: false,
        getRecentData: nextProps.FoodTypeReducer.getRecentRes,
        newFilterList: nextProps.FoodTypeReducer.getRecentRes,
      };
    }
    return null;
  }
  searchUpdated = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    const { searchText, getRecentData, newFilterList } = this.state;
    console.log(searchText);
    if (searchText !== "" && newFilterList.length) {
      let filteredValue = getRecentData.filter((item, i) =>
        item.food_name.toLowerCase().match(searchText.toLowerCase())
      );
      this.setState({ newFilterList: filteredValue });
    }
    if (searchText === "" || searchText.length === 0) {
      this.setState({ newFilterList: getRecentData });
    }
  };

  gotoFoodDetails = (name) => {
    storeItem("foodName", name);
    this.props.history.push("/foodDetailScreen", { foodName: name });
  };
  render() {
    const { newFilterList, searchText, getRecentData } = this.state;
    console.log(this.state);

    return (
      <MasterLayout>
        <div style={styles.wrapper}>
          <h3>
            <center style={{ fontWeight: "bold", color: COLORS.TEXT_COLOR }}>
              {getItem("title")}
            </center>
          </h3>
          <div
            className="my-5"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              className="searchbar-container"
              style={{
                border: "1px solid gray",
                borderRadius: 5,
                width: "90%",
              }}
            >
              <form onSubmit={this.handleSubmit}>
                <InputGroup>
                  <div className="p-2">
                    <i className="fa fa-search" />
                  </div>
                  <form>
                    <Input
                      type="text"
                      placeholder="Search ..."
                      name="searchText"
                      value={searchText}
                      onChange={(e) => this.searchUpdated(e)}
                      style={{ border: "none" }}
                    />
                  </form>
                </InputGroup>
              </form>
            </div>
            <div className="pt-2" style={{ width: "5%" }}>
              <p
                style={{ fontWeight: 500, color: COLORS.TEXT_COLOR }}
                onClick={() => {
                  console.log(this.state.getRecentData);
                  this.setState({
                    newFilterList: [...getRecentData],
                    searchText: "",
                  });
                }}
              >
                Cancel
              </p>
            </div>
          </div>
          {newFilterList && newFilterList.length ? (
            newFilterList.map((item, i) => {
              return (
                <div onClick={() => this.gotoFoodDetails(item.food_name)}>
                  <CustomList
                    key={i}
                    src={"https://d2xdmhkmkbyw75.cloudfront.net/7353_thumb.jpg"}
                    heading={item.food_name}
                    title={`${item.cal != null ? item.cal : 0} Cal ${
                      item.servings
                    } servings`}
                  />
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: "center" }}>
              <img
                className="mt-5"
                src={require("../../assets/img/sun.png")}
                style={{ maxWidth: 60 }}
              />
              <p style={{ fontWeight: 500 }}>
                You haven't added any planes yet
              </p>
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
    FoodTypeReducer: state.FoodTypeReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getRecentFood,
      getFrequentFood,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FrequentRecent);

const styles = {
  wrapper: {
    paddingTop: 80,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  listWrap: {
    border: "1px solid ",
    borderColor: COLORS.blue_400,
    borderRadius: 10,
  },
  breakfastDiv: {
    background: COLORS.PRIMARY_COLOR,
    color: COLORS.WHITE_COLOR,
    fontWeight: 500,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
};
