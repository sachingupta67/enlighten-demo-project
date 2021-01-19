import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CustomCircular from "../../components/Custom/CustomCircular";
import {
  getFoodDetailsNutrition,
  clearFoodTypeReducer,
  updateServingValue,
  saveNutritionFood,
  getFoodByDate,
} from "../../redux/Actions/ActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import Strings from "../../redux/Constants/Strings";
import { InputField } from "../../components/Custom/InputField";
import { getItem } from "../../redux/Utils/AsyncUtils";
import CustomLoader from "components/Loader/CustomLoader";
const today = new Date();
class FoodDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      mealType: "",
      foodDetailData: "",
      carbs_percentage: 0,
      protein_percentage: 0,
      fat_percentage: 0,
      carbs_pie_value: 0,
      protein_pie_value: 0,
      fat_pie_value: 0,
      image_path: "",

      food_name: "",
      servingValue: 0,
      servings: 0,
      cal: 0,
      updatedCal: "",
      // food_rating: data.nf_calories,
      protein: 0,
      getProtein: 0,
      carbs: 0,
      getCarbs: 0,
      sugar: 0,
      getSugar: 0,
      fat: 0,
      getFat: 0,
      saturated_fat: 0,
      getSaturated_fat: 0,
      unsaturated_fat: 0,
      getUnsaturated_fat: 0,
      cholesterol: 0,
      getCholesterol: 0,
      sodium: 0,
      getSodium: 0,
      potassium: 0,
      getPotassium: 0,
      brand_name: "abcd",
      serving_unit: 0,

      serving_weight_grams: 0,
      food_rating: 0,

      forDate: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
      forDate: getItem(Strings.KEY_DATE),
      userId: getItem(Strings.KEY_USER_DATA),
      mealType: getItem(Strings.MEAL_TYPE),
    });
    let postData = {
      //  query: getItem("categoryName"),
      query: getItem("foodName"),
      timezone: "US/Eastern",
    };
    this.props.getFoodDetailsNutrition(postData);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      "statusCodeSaveFood >>",
      nextProps.FoodTypeReducer.statusCodeSaveFood
    );
    // if (nextProps.FoodTypeReducer.statusCodeSaveFood === undefined) {
    //   if (nextProps.FoodTypeReducer.statusCodeSaveFood === Strings.HTTP_STATUS_CODE_OK) {
    //     // alert("Save successfully")
    //     this.props.navigation.navigate('HomeScreen', {
    //       param: "true",
    //     });
    //     // this.props.clearFoodTypeReducer();
    //   }
    // }

    // console.log(' << @@@@@ nextProps.FoodTypeReducer.foodDetailRes @@@@@@@@>>', nextProps.FoodTypeReducer.foodDetailRes);
    if (nextProps.FoodTypeReducer.foodDetailRes !== prevState.foodDetailData) {
      let data = nextProps.FoodTypeReducer.foodDetailRes;
      console.log(" << @@@@@nextstate data >>", JSON.stringify(data));
      console.log(
        " << @@@@@statusCodeSaveFood@@@@@>>",
        nextProps.FoodTypeReducer.statusCodeSaveFood
      );
      // if (nextProps.FoodTypeReducer.statusCodeSaveFood === Strings.HTTP_STATUS_CODE_OK) {
      if (data !== undefined && data !== "") {
        let servingData = data.serving_qty;
        let carbs_value1 = parseInt(
          ((data.nf_total_carbohydrate * servingData) / 300) * 100 + 0.5
        );
        let carbs_value2 = 100 - carbs_value1;

        let protine_value1 = parseInt(
          ((data.nf_protein * servingData) / 60) * 100 + 0.5
        );
        let protine_value2 = 100 - protine_value1;

        let fat_value1 = parseInt(
          ((data.nf_total_fat * servingData) / 65) * 100 + 0.5
        );
        let fat_value2 = 100 - fat_value1;

        console.log(
          "GET_DERIVE_carbs_value1",
          carbs_value1,
          " = ",
          carbs_value2
        );
        console.log(
          "GET_DERIVE_protine_value1",
          protine_value1,
          " = ",
          protine_value2
        );
        console.log("GET_DERIVE_fat_value1", fat_value1, " = ", fat_value2);

        return {
          isLoading: false,
          foodDetailData: data,

          carbs_percentage: carbs_value1,
          protein_percentage: protine_value1,
          fat_percentage: fat_value1,
          carbs_pie_value: carbs_value2,
          protein_pie_value: protine_value2,
          fat_pie_value: fat_value2,

          servingValue: data.serving_qty,
          food_name: data.food_name,
          servings: data.serving_qty,
          cal: data.nf_calories,
          updatedCal: data.nf_calories,
          // food_rating: data.nf_calories,
          protein: data.nf_protein,
          getProtein: data.nf_protein,
          carbs: data.nf_total_carbohydrate,
          getCarbs: data.nf_total_carbohydrate,
          sugar: data.nf_sugars,
          getSugar: data.nf_sugars,
          fat: data.nf_total_fat,
          getFat: data.nf_total_fat,
          saturated_fat: data.nf_saturated_fat,
          getSaturated_fat: data.nf_saturated_fat,
          unsaturated_fat: data.nf_dietary_fiber,
          getUnsaturated_fat: data.nf_dietary_fiber,
          cholesterol: data.nf_cholesterol,
          getCholesterol: data.nf_cholesterol,
          sodium: data.nf_sodium,
          getSodium: data.nf_sodium,
          potassium: data.nf_potassium,
          getPotassium: data.nf_potassium,
          brand_name: data.brand_name != null ? data.brand_name : "abc",
          serving_unit: data.serving_unit,
          image_path:
            nextProps.FoodTypeReducer.foodImage !== undefined
              ? nextProps.FoodTypeReducer.foodImage.thumb
              : null,
        };
      }
      // }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.FoodTypeReducer.statusCodeSaveFood ===
      Strings.HTTP_STATUS_CODE_OK
    ) {
      this.props.clearFoodTypeReducer();
      let postData = {
        id: getItem(Strings.KEY_USER_DATA).id,
        date: moment(today).format("YYYY-MM-DD"),
      };
      this.props.getFoodByDate(postData);
      this.props.history.push("/home");
    }
    if (
      this.props.FoodTypeReducer.foodDetailRes !==
      prevProps.FoodTypeReducer.foodDetailRes
    ) {
      if (
        this.props.FoodTypeReducer.statusCodeFoodType ===
        Strings.HTTP_STATUS_CODE_OK
      ) {
        // this.clearState();
      }
      // this.props.clearFoodTypeReducer();
    }
  }

  setData(servingData) {
    let updatedCal = this.getRoundOffDouble(
      parseFloat(this.state.cal) * parseFloat(servingData)
    );
    let updatedProtine = this.getRoundOffDouble(
      parseFloat(this.state.getProtein) * parseFloat(servingData)
    );
    let updatedCarbs = this.getRoundOffDouble(
      parseFloat(this.state.getCarbs) * parseFloat(servingData)
    );
    let updatedSugar = this.getRoundOffDouble(
      parseFloat(this.state.getSugar) * parseFloat(servingData)
    );
    let updatedFat = this.getRoundOffDouble(
      parseFloat(this.state.getFat * parseFloat(servingData))
    );
    let updatedSaturatedFat = this.getRoundOffDouble(
      parseFloat(this.state.getSaturated_fat) * parseFloat(servingData)
    );
    let updatedUnSaturatedFat = this.getRoundOffDouble(
      parseFloat(this.state.getUnsaturated_fat) * parseFloat(servingData)
    );
    let updatedCholestrol = this.getRoundOffDouble(
      parseFloat(this.state.getCholesterol) * parseFloat(servingData)
    );
    let updatedSodium = this.getRoundOffDouble(
      parseFloat(this.state.getSodium) * parseFloat(servingData)
    );
    let updatedPotassium = this.getRoundOffDouble(
      parseFloat(this.state.getPotassium) * parseFloat(servingData)
    );

    let carbs_value1 = parseInt(
      ((this.state.getCarbs * servingData) / 300) * 100 + 0.5
    );
    let carbs_value2 = 100 - carbs_value1;

    let protine_value1 = parseInt(
      ((this.state.getProtein * servingData) / 60) * 100 + 0.5
    );
    let protine_value2 = 100 - protine_value1;

    let fat_value1 = parseInt(
      ((this.state.getFat * servingData) / 65) * 100 + 0.5
    );
    let fat_value2 = 100 - fat_value1;

    console.log("carbs_value1", carbs_value1, " = ", carbs_value2);
    console.log("protine_value1", protine_value1, " = ", protine_value2);
    console.log("fat_value1", fat_value1, " = ", fat_value2);

    this.setState({
      updatedCal: updatedCal,
      sugar: updatedSugar,
      carbs: updatedCarbs,
      fat: updatedFat,
      saturated_fat: updatedSaturatedFat,
      unsaturated_fat: updatedUnSaturatedFat,
      cholesterol: updatedCholestrol,
      sodium: updatedSodium,
      protein: updatedProtine,
      potassium: updatedPotassium,

      carbs_percentage: carbs_value1,
      protein_percentage: protine_value1,
      fat_percentage: fat_value1,
      carbs_pie_value: carbs_value2,
      protein_pie_value: protine_value2,
      fat_pie_value: fat_value2,
    });
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getRoundOffDouble(a) {
    if (a != null && a !== "") {
      return Math.round(parseFloat(a) * 100.0) / 100.0;
    } else {
      return 0;
    }
  }
  onServingArrowUp = () => {
    console.log("up");
    this.setState({ servingValue: parseFloat(this.state.servingValue) + 0.5 });
    let servingData = this.state.servingValue + 0.5;
    this.setData(servingData);
  };

  onServingArrowDown = () => {
    if (this.state.servingValue !== 0.5) {
      this.setState({
        servingValue: parseFloat(this.state.servingValue) - 0.5,
      });
      let servingData = this.state.servingValue - 0.5;
      this.setData(servingData);
    }
  };

  onSaveClick() {
    console.log("mealType >> ", this.state.mealType);
    let mealValue;
    if (this.state.mealType === Strings.BREAKFAST) {
      mealValue = 0;
    } else if (this.state.mealType === Strings.LUNCH) {
      mealValue = 1;
    }
    if (this.state.mealType === Strings.SNACKS) {
      mealValue = 2;
    }
    if (this.state.mealType === Strings.DINNER) {
      mealValue = 3;
    }

    let postData = {
      userId: this.state.userId.id,
      meal_type: mealValue,
      food_name: getItem("foodName"),
      brand_name: this.state.brand_name,
      servings: this.state.servingValue,
      serving_unit: this.state.serving_unit,
      serving_weight_grams: this.state.serving_weight_grams,
      fat_percentage: this.state.fat_percentage,
      saturated_fat: this.state.saturated_fat,
      cholesterol: this.state.cholesterol,
      sodium: this.state.sodium,
      sugar: this.state.sugar,
      protein_percentage: this.state.protein_percentage,
      potassium: this.state.potassium,
      cal: this.state.updatedCal,
      food_rating: this.state.food_rating,
      carbs_percentage: this.state.carbs_percentage,
      protein: this.state.protein,
      carbs: this.state.carbs,
      fat: this.state.fat,
      unsaturated_fat: this.state.unsaturated_fat,
      image: this.state.image_path,

      for_date: this.state.forDate,
    };
    console.log("postData >> ", JSON.stringify(postData));
    this.props.saveNutritionFood(postData);
  }
  render() {
    const percentage = 66;
    return (
      <MasterLayout>
        <div style={styles.wrapper}>
          <div style={styles.blueDiv}>
            <p
              style={{
                position: "absolute",
                bottom: 10,
                left: 150,
                color: COLORS.WHITE_COLOR,
                fontWeight: "bold",
              }}
            >
              {/* {getItem("foodName") || "Item not found"} */}
              {getItem("foodName")}
            </p>
            <div style={styles.circleDiv} onClick={() => this.onSaveClick()}>
              <img
                className="pt-1"
                src={require("../../assets/img/tik.png")}
                style={{ textAlign: "center" }}
              />
            </div>
          </div>
          <div style={styles.widthWrap}>
            <div className="mt-5" style={styles.arrowDivWrap}>
              <div
                className="mt-4"
                style={{
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    borderBottom: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  Servings
                </p>
              </div>
              <div
                className="mt-2"
                style={{ width: "30%", justifyContent: "center" }}
              >
                <InputField
                  placeholder="1"
                  name="servingValue"
                  value={
                    this.state.servingValue !== undefined
                      ? this.state.servingValue.toString()
                      : 1
                  }
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div style={{ width: "18%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <i
                    className="fa fa-caret-up"
                    style={styles.iconArrow}
                    onClick={() => this.onServingArrowUp()}
                  />
                  <i
                    className="fa fa-caret-down"
                    style={styles.iconArrow}
                    onClick={() => this.onServingArrowDown()}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <p className="pt-2" style={styles.circleA}>
                A
              </p>
              <p className="ml-4 mt-2" style={styles.textFontWeight}>
                {this.state.updatedCal} CAL
              </p>
            </div>
            <div>
              <img
                src={require("../../assets/img/green_arrow.png")}
                style={{ marginLeft: 30 }}
              />
              <div
                style={{
                  height: 200,
                  background: COLORS.PRIMARY_COLOR,
                  borderRadius: 10,
                  marginTop: -10,
                }}
              >
                <div className="p-5">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div>
                      <p style={styles.textColorWhiteHeading}>Food Rating</p>
                      <p style={styles.textColorWhiteTitle}>
                        Do you want to know what was good and bad about this
                        food?
                      </p>
                      <div className="mt-4">
                        <span
                          className="py-2 px-4"
                          style={{
                            background: COLORS.WHITE_COLOR,
                            borderRadius: 5,
                          }}
                        >
                          View
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src={this.state.image_path}
                        style={{ maxWidth: 80 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p style={styles.textFontWeight}>NUTRITION INFORMATION</p>
              <p style={styles.textFontWeight}>Verified by Smart 365 life</p>
              <hr style={{ borderColor: COLORS.blue_400 }} />
              <div
                className="my-5"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <CustomCircular>
                  <CircularProgressbar
                    value={this.state.carbs_percentage}
                    text={`${this.state.carbs_percentage}%`}
                    styles={buildStyles({
                      textColor: COLORS.pie_carbs,
                      pathColor: COLORS.pie_carbs,
                      trailColor: COLORS.pie_fat,
                    })}
                  />
                  <p className="mt-3" style={styles.circleTitle}>
                    CARBS
                  </p>
                </CustomCircular>

                <CustomCircular>
                  <CircularProgressbar
                    value={this.state.protein_percentage}
                    text={`${this.state.protein_percentage}%`}
                    styles={buildStyles({
                      textColor: COLORS.pie_carbs,
                      pathColor: COLORS.pie_carbs,
                      trailColor: COLORS.pie_fat,
                    })}
                  />
                  <p className="mt-3" style={styles.circleTitle}>
                    {Strings.PROTEIN}
                  </p>
                </CustomCircular>

                <CustomCircular>
                  <CircularProgressbar
                    value={this.state.fat_percentage}
                    text={`${this.state.fat_percentage}%`}
                    styles={buildStyles({
                      textColor: COLORS.pie_carbs,
                      pathColor: COLORS.pie_carbs,
                      trailColor: COLORS.pie_fat,
                    })}
                  />
                  <p className="mt-3" style={styles.circleTitle}>
                    {Strings.FAT}
                  </p>
                </CustomCircular>
              </div>
            </div>
            {/*PROTEIN */}
            <div className="p-2" style={styles.headingBlueColor}>
              <p style={styles.headingFontWeightColor}>{Strings.PROTEIN}</p>
              <p style={styles.headingFontWeightColor}>{this.state.protein}</p>
            </div>
            {/*CARBS */}
            <div className="p-2 mt-4" style={styles.headingBlueColor}>
              <p style={styles.headingFontWeightColor}>{Strings.CARBS}</p>
              <p style={styles.headingFontWeightColor}>{this.state.carbs}</p>
            </div>
            <div className="p-2" style={styles.titleWhiteBackgroundColor}>
              <p style={styles.titleFontWeightColor}>{Strings.SUGARS}</p>
              <p style={styles.titleFontWeightColor}>{this.state.sugar}</p>
            </div>

            {/*FAT */}
            <div className="p-2 mt-4" style={styles.headingBlueColor}>
              <p style={styles.headingFontWeightColor}>{Strings.FAT}</p>
              <p style={styles.headingFontWeightColor}>{this.state.fat}</p>
            </div>
            <div className="p-2" style={styles.titleWhiteBackgroundColor}>
              <p style={styles.titleFontWeightColor}>{Strings.SATURATED_FAT}</p>
              <p style={styles.titleFontWeightColor}>
                {this.state.saturated_fat}
              </p>
            </div>
            <div className="p-2" style={styles.titleWhiteBackgroundColor}>
              <p style={styles.titleFontWeightColor}>
                {Strings.UNSATURATED_FAT}
              </p>
              <p style={styles.titleFontWeightColor}>
                {this.state.unsaturated_fat}
              </p>
            </div>

            {/**Cholestrol */}
            <div className="p-2 mt-4" style={styles.titleWhiteBackgroundColor}>
              <p style={styles.titleFontWeightColor}>{Strings.CHOLESTEROL}</p>
              <p style={styles.titleFontWeightColor}>
                {this.state.cholesterol}
              </p>
            </div>
            <div className="p-2" style={styles.titleWhiteBackgroundColor}>
              <p style={styles.titleFontWeightColor}>{Strings.SODIUM}</p>
              <p style={styles.titleFontWeightColor}>{this.state.sodium}</p>
            </div>
            <div className="p-2 mb-4" style={styles.titleWhiteBackgroundColor}>
              <p style={styles.titleFontWeightColor}>{Strings.POTASSIUM}</p>
              <p style={styles.titleFontWeightColor}>{this.state.potassium}</p>
            </div>
          </div>
        </div>
        <CustomLoader loader={this.state.isLoading} />
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
      getFoodDetailsNutrition,
      clearFoodTypeReducer,
      updateServingValue,
      saveNutritionFood,
      getFoodByDate,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailScreen);

const styles = {
  wrapper: {
    paddingTop: 60,
  },

  blueDiv: {
    height: 300,
    background: COLORS.blue_400,
    position: "relative",
  },
  circleDiv: {
    height: 80,
    width: 80,
    borderRadius: 40,
    background: COLORS.PRIMARY_COLOR,
    position: "absolute",
    bottom: -20,
    right: 60,
    textAlign: "center",
  },
  iconArrow: {
    fontSize: 30,
  },
  arrowDivWrap: {
    display: "flex",
    justifyContent: "space-between",
  },
  widthWrap: { width: "80%", marginLeft: "auto", marginRight: "auto" },
  circleA: {
    width: 40,
    height: 40,
    textAlign: "center",
    borderRadius: 20,
    background: COLORS.BLUE_BORDER,
    color: COLORS.WHITE_COLOR,
    fontWeight: 500,
    marginLeft: 40,
  },
  textFontWeight: { fontWeight: 500 },
  headingFontWeightColor: {
    color: COLORS.outline,
    fontWeight: "bold",
  },
  titleFontWeightColor: {
    color: COLORS.black,
    fontWeight: 500,
  },
  headingBlueColor: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid",
    borderColor: COLORS.gray_outline,
    background: COLORS.gray,
  },
  titleWhiteBackgroundColor: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid",
    borderColor: COLORS.gray_outline,
  },
  backgroundStyle: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    width: 95,
    height: 15,
    borderRadius: 8,
    borderColor: COLORS.PRIMARY_COLOR,
    borderWidth: 0.1,
    flexDirection: "row",
  },
  textColorWhiteHeading: {
    color: COLORS.WHITE_COLOR,
    fontWeight: "bold",
  },
  textColorWhiteTitle: {
    color: COLORS.WHITE_COLOR,
    fontWeight: 500,
  },
  circleTitle: { fontWeight: 500, color: COLORS.pie_carbs },
};
