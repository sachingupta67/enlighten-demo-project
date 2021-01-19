import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import Strings from "../../redux/Constants/Strings";
import { Input, InputGroup } from "reactstrap";
import {
  getFoodListNutrition,
  clearFoodTypeReducer,
} from "../../redux/Actions/ActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItem } from "redux/Utils/AsyncUtils";
import { storeItem } from "../../redux/Utils/AsyncUtils";
import CustomList from "../../components/Custom/CustomList";
import SpeachToText from "../../components/Speech";

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userEmail: "",
      isSearchList: false,
      searchTextValue: "",
      foodItemList: [],
      isModelVisible: 0,
      results: "",
      listening: false,
      speech: "I am listening",
      speechValue: 0,
    };
  }

  /********************MAIN DATA FROM REDUX************ */

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.FoodTypeReducer.foodListRes !== prevState.foodListRes) {
      return {
        foodItemList: nextProps.FoodTypeReducer.foodListRes,
        isLoading: false,
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.FoodTypeReducer.foodListRes !==
      prevProps.FoodTypeReducer.foodListRes
    ) {
      this.clearState();
    }
  }

  searchUpdated(text) {
    if (text !== "") {
      // const filteredFoodList = this.state.allServiceItemList.filter(createFilter(term, KEYS_TO_FILTERS))
      this.setState({ isSearchList: true, searchTextValue: text });
      let postData = {
        query: text,
      };
      this.props.getFoodListNutrition(postData);
    } else {
      this.setState({
        isSearchList: false,
        searchTextValue: "",
      });
    }
  }
  clearState() {
    this.setState({ foodItemList: [] });
  }

  goToCatList = () => {
    this.props.history.push("/categoryList");
  };
  gotoFoodDetails = (name) => {
    storeItem("foodName", name);
    this.props.history.push("/foodDetailScreen", { foodName: name });
  };
  toggleListen = () => {
    this.setState({ listening: !this.state.listening });
  };
  setSpeechValue = (value) => {
    this.setState({ speechValue: value });
    if (value.length) {
      this.setState({ isSearchList: true, searchTextValue: value });
      let postData = {
        query: value,
      };
      this.props.getFoodListNutrition(postData);
    }
  };

  /**************************************************** */
  render() {
    const {
      foodItemList,
      isSearchList,
      speech,
      listening,
      speechValue,
      search,
    } = this.state;
    return (
      <MasterLayout>
        <div style={styles.wrapper}>
          <div
            className="my-3"
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
                  <Input
                    type="text"
                    placeholder={`${
                      listening
                        ? speechValue
                          ? speechValue
                          : "I am listening"
                        : "Search"
                    }`}
                    //size="45"
                    //value={this.state.text}
                    onChange={(e) => {
                      e.preventDefault();

                      // console.log("checking valye=====>", e.target.value);
                      this.searchUpdated(e.target.value);
                    }}
                    style={{ border: "none" }}
                  />
                </InputGroup>
              </form>
            </div>
            <div
              className="pt-2"
              style={{ width: "5%" }}
              onClick={() => this.toggleListen()}
            >
              <i className="fa fa-microphone" style={{ fontSize: 25 }} />
              <SpeachToText
                onResult={this.setSpeechValue}
                active={this.state.listening}
              />
            </div>
          </div>
          {isSearchList
            ? foodItemList.length
              ? foodItemList.map((item, i) => (
                  <CustomList
                    handler={() => {
                      this.gotoFoodDetails(item.food_name);
                    }}
                    key={i}
                    src={item.photo.thumb}
                    heading={item.food_name}
                    title={item.serving_unit}
                  />
                ))
              : null
            : null}

          <div onClick={() => this.goToCatList()}>
            <div
              className="py-4"
              style={{
                background: COLORS.orange,
                textAlign: "center",
                borderRadius: 10,
              }}
            >
              <img src={require("../../assets/img/categories.png")} />
            </div>
          </div>

          {/*Recent Frequnt box */}
          <div className="my-5" style={styles.listWrap}>
            <p className="mt-5 p-2" style={styles.breakfastDiv}>
              {getItem(Strings.MEAL_TYPE)}
            </p>
            <div
              onClick={() => {
                storeItem("title", "RECENT");
                this.props.history.push("/frequentRecent");
              }}
            >
              <p className="my-3" style={styles.headingTextColor}>
                <span className="mx-3">
                  <img
                    src={require("../../assets/img/alarm_clock.png")}
                    style={{ maxWidth: 60 }}
                  />
                </span>
                RECENT
              </p>
            </div>
            <div
              onClick={() => {
                storeItem("title", "FREQUENT");
                this.props.history.push("/frequentRecent");
              }}
            >
              <p className="my-3" style={styles.headingTextColor}>
                <span className="mx-3">
                  <img
                    src={require("../../assets/img/pressure.png")}
                    style={{ maxWidth: 60 }}
                  />
                </span>
                FREQUENT
              </p>
            </div>
            <div onClick={() => this.props.history.push("/restaurants")}>
              <p className="my-3" style={styles.headingTextColor}>
                <span className="mx-3">
                  <img
                    src={require("../../assets/img/calories.png")}
                    style={{ maxWidth: 60 }}
                  />
                </span>
                RESTAURANTS
              </p>
            </div>
          </div>
        </div>
        {/* <div>
          <Button color="danger" onClick={toggle}>
            {buttonLabel}
          </Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          </Modal>
        </div> */}
      </MasterLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    FoodTypeReducer: state.FoodTypeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFoodListNutrition,
      clearFoodTypeReducer,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);

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
  headingTextColor: { fontWeight: 600, color: COLORS.TEXT_COLOR },
};
