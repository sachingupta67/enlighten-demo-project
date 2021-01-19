import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import CustomList from "components/Custom/CustomList";
import { storeItem } from "../../redux/Utils/AsyncUtils";
import {
  getFoodListNutrition,
  clearFoodTypeReducer,
} from "../../redux/Actions/ActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Strings from "../../redux/Constants/Strings";
import CustomLoader from "../../components/Loader/CustomLoader";
import { getItem } from "../../redux/Utils/AsyncUtils";

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      foodItemList: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    // console.log('name first comp', this.props.route.params.name);
    this.setState({ isLoading: true });
    //  this.getFoodListApiCall();

    let postData = {
      query: getItem("categoryName"),
    };
    console.log("postdata====>", postData);
    this.props.getFoodListNutrition(postData);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.FoodTypeReducer.foodListRes !== prevState.foodListRes) {
      // console.log(' PRIYANKA nextProps --', JSON.stringify(nextProps.FoodTypeReducer.foodListRes));
      return {
        foodItemList: nextProps.FoodTypeReducer.foodListRes,
        isLoading: false,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.FoodTypeReducer.foodListRes !==
      prevProps.FoodTypeReducer.foodListRes
    ) {
      if (
        this.props.FoodTypeReducer.statusCodefoodList !==
        Strings.HTTP_STATUS_CODE_OK
      ) {
        this.clearState();
        // this.props.clearFoodTypeReducer();
      }
      // this.clearState();
    }
  }

  clearState() {
    this.setState({
      servingValue: "",
      foodDetailRes: "",
    });
  }

  gotoFoodDetails = (name) => {
    storeItem("foodName", name.food_name);
    this.props.history.push("/foodDetailScreen", { foodName: name });
  };
  render() {
    const { isLoading, foodItemList } = this.state;
    return (
      <MasterLayout>
        <div style={styles.wrapper}>
          <h3 className="mb-5" style={{ fontWeight: 700 }}>
            <center>{getItem("categoryName")}</center>
          </h3>

          {foodItemList.length
            ? foodItemList.map((item, i) => {
                return (
                  <CustomList
                    handler={() => {
                      this.gotoFoodDetails(item);
                    }}
                    src={item.photo.thumb}
                    heading={item.food_name}
                    title={item.serving_unit}
                  />
                );
              })
            : null}
        </div>
        <CustomLoader loader={isLoading} />
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

const styles = {
  wrapper: {
    paddingTop: 80,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
};
