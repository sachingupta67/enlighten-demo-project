import React from "react";
import { Link } from "reactstrap";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import Strings from "../../redux/Constants/Strings";
import {
  getFoodByDate,
  deleteFood,
  clearFoodRes,
  addBaseTarget,
  getRecommededCal,
  updateWater,
  getWater,
  clearWater,
} from "../../redux/Actions/ActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItem, storeItem } from "../../redux/Utils/AsyncUtils";
import data from "../../redux/dataValidator";
import CustomLoader from "../../components/Loader/CustomLoader";
import moment from "moment";

let today = new Date();

let breakfastArray = [];
let lunchArray = [];
let snacksArray = [];
let dinnerArray = [];
let dayCount = 0;

let totalCalBreakfast = 0;
let totalCalLunch = 0;
let totalCalsnacks = 0;
let totalCalDinner = 0;
class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: "1",
      totalCount: 0,
      dayCount: 0,
      waterListUpdated: [false, false, false, false, false, false, false],
      recommededCalRes: [],
      waterList: [
        {
          water: false,
        },
        {
          water: false,
        },
        {
          water: false,
        },
        {
          water: false,
        },
        {
          water: false,
        },
        {
          water: false,
        },
        {
          water: false,
        },
      ],
      recBreakfast: "",
      recLunch: "",
      recSnack: "",
      recDinner: "",

      targetCal: 1300,
      calLeft: 1300,
      eatenValue: "0.00",
      carbsValue: "455.00",
      proteinValue: "98.00",
      fatValue: "144.00",
      burnedValue: 0,
      totalCarbs: 0,
      totalProtein: 0,
      totalFat: 0,

      totalSugars: 0,
      totalSaturatedFat: 0,
      totalUnSaturatedFat: 0,
      totalCholestrol: 0,
      totalSodium: 0,
      totalPotassium: 0,
      userId: 0,
      isLoading: false,
      defaultDate: moment(today).format("YYYY-MM-DD"),
    };
  }

  componentDidMount() {
    document.body.classList.add("landing-page");
    let user = getItem(Strings.KEY_USER_DATA);
    // let selectedDate = moment(today).add(dayCount, "day").format("YYYY-MM-DD");
    let selectedDate = this.state.defaultDate;
    storeItem(Strings.KEY_DATE, selectedDate);
    if (user) {
      this.setState({ userId: user.id, isLoading: true });
      let postData = {
        id: user.id,
        date: moment(today).format("YYYY-MM-DD"),
      };
      let getWaterData = {
        userId: user.id,
        date: selectedDate,
      };
      this.props.getFoodByDate(postData);
      this.props.getRecommededCal(user.id);
      this.props.getWater(getWaterData);
    }

    let DIET_DETAIL = getItem("DIET_DETAILS");
    if (!DIET_DETAIL) {
      this.props.history.push("/profile");
    }

    // let selectedDate = moment(today).add(dayCount, "day").format("YYYY-MM-DD");
    // storeItem(Strings.KEY_DATE, JSON.stringify(selectedDate));

    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }

  /***************************FOR SET THE VALUE FROM REDUCER ******************* */

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.HomeReducer.getWaterRes !== prevState.getWaterRes) {
      return {
        getWaterRes: nextProps.HomeReducer.getWaterRes,
        isLoading: false,
        waterCount:
          nextProps.HomeReducer.getWaterRes !== null
            ? nextProps.HomeReducer.getWaterRes.water
            : 0,
      };
    }

    if (nextProps.HomeReducer.getDeleteFoodRes !== prevState.getDeleteFoodRes) {
      return {
        getDeleteFoodRes: nextProps.HomeReducer.getDeleteFoodRes,
        isLoading: false,
      };
    }

    if (nextProps.AuthReducer.recommededCalRes !== prevState.recommededCalRes) {
      let data = nextProps.AuthReducer.recommededCalRes;
      if (data !== undefined) {
        return {
          recommededCalRes: nextProps.AuthReducer.recommededCalRes,
          recBreakfast: data.rec_breakfast_cal,
          recLunch: data.rec_lunch_cal,
          recSnack: data.rec_snack_cal,
          recDinner: data.rec_dinner_cal,
          isLoading: false,
        };
      }
    }

    if (nextProps.HomeReducer.getFoodByDateRes !== prevState.mealArray) {
      if (
        nextProps.HomeReducer.getFoodByDateRes !== undefined &&
        nextProps.HomeReducer.getFoodByDateRes.length !== 0
      ) {
        // if (nextProps.HomeReducer.getFoodByDateRes.data.statusCode === Strings.HTTP_STATUS_CODE_OK) {
        breakfastArray = [];
        lunchArray = [];
        snacksArray = [];
        dinnerArray = [];
        totalCalBreakfast = 0;
        totalCalLunch = 0;
        totalCalsnacks = 0;
        totalCalDinner = 0;

        let mealArray = nextProps.HomeReducer.getFoodByDateRes;
        if (
          mealArray !== undefined &&
          mealArray !== null &&
          mealArray.length > 0
        ) {
          mealArray.forEach((element) => {
            if (element.meal_type !== null && element.meal_type !== undefined) {
              if (element.meal_type === 0) {
                breakfastArray.push(element);
                totalCalBreakfast += parseFloat(element.cal);
                //  console.log(totalCalBreakfast, "total cal breakfast");
              }
              if (element.meal_type === 1) {
                lunchArray.push(element);
                totalCalLunch += parseFloat(element.cal);
                //  console.log(totalCalLunch, "total cal lunch");
              }
              if (element.meal_type === 2) {
                snacksArray.push(element);
                totalCalsnacks += parseFloat(element.cal);
                // console.log(totalCalsnacks, "total cal snacks");
              }
              if (element.meal_type === 3) {
                dinnerArray.push(element);
                totalCalDinner += parseFloat(element.cal);
                //  console.log(totalCalDinner, "total cal Dinner");
              }
            }
          });

          // this.setHealthData(mealArray);
        }
      }

      return {
        mealArray: nextProps.HomeReducer.getFoodByDateRes,
        isLoading: false,
      };
      // }
    }
  }
  clearState() {
    breakfastArray = [];
    lunchArray = [];
    snacksArray = [];
    dinnerArray = [];

    this.setState({
      calLeft: 1300,
      eatenValue: "0.00",
      carbsValue: "455.00",
      proteinValue: "98.00",
      fatValue: "144.00",
      burnedValue: 0,
      totalCarbs: 0,
      totalProtein: 0,
      totalFat: 0,

      totalSugars: 0,
      totalSaturatedFat: 0,
      totalUnSaturatedFat: 0,
      totalCholestrol: 0,
      totalSodium: 0,
      totalPotassium: 0,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.HomeReducer.getWaterRes !== prevState.getWaterRes) {
      if (
        this.props.HomeReducer.statusCodeGetWater ===
        Strings.HTTP_STATUS_CODE_OK
      ) {
        if (this.props.HomeReducer.getWaterRes !== null) {
          let getWaterCount = this.props.HomeReducer.getWaterRes.water;
          this.state.waterListUpdated.length = 0;
          if (getWaterCount >= 7) {
            for (var i = 0; i <= getWaterCount; i++) {
              if (i >= getWaterCount) {
                this.state.waterListUpdated.push(false);
              } else {
                this.state.waterListUpdated.push(true);
              }
            }
          } else {
            for (var i = 0; i < 7; i++) {
              if (i >= getWaterCount) {
                this.state.waterListUpdated.push(false);
              } else {
                this.state.waterListUpdated.push(true);
              }
            }
          }
          this._toogleList();
        }
      }
    }
    if (
      this.props.HomeReducer.getDeleteFoodRes !== prevState.getDeleteFoodRes
    ) {
      if (
        this.props.HomeReducer.statusCodeDeleteFood ===
        Strings.HTTP_STATUS_CODE_OK
      ) {
        // console.log("CDU deleted food!");
        this.props.clearFoodRes();
        this.clearState();
        this._toogleList();
        let postData = {
          id: getItem(Strings.KEY_USER_DATA).id,
          date: moment(today).format("YYYY-MM-DD"),
        };
        this.setState({ isLoading: true });
        this.props.getFoodByDate(postData);
      }
    }
    if (this.props.HomeReducer.getFoodByDateRes !== prevState.mealArray) {
      if (
        this.props.HomeReducer.statusCodeFoodDate ===
        Strings.HTTP_STATUS_CODE_OK
      ) {
        let data = this.props.HomeReducer.getFoodByDateRes;
        console.log("data_CDU", data);
        this.setHealthData(data);
        // this.clearState();
      }
      // this.props.clearFoodTypeReducer();
    }
  }

  /********************END OF LIFECYCLE MANAGEMENT******* */
  //
  /**************************SET HEALTH DATA************ */

  setHealthData(data) {
    if (data.length > 0) {
      let totalCalLeft = 0;
      let totalCarbs = 0;
      let totalProtein = 0;
      let totalFat = 0;
      let totalSugars = 0,
        totalSaturatedFat = 0,
        totalUnSaturatedFat = 0,
        totalCholestrol = 0;
      let totalSodium = 0,
        totalPotassium = 0;
      data.forEach((element) => {
        totalCalLeft += parseFloat(element.cal);
        totalCarbs += parseFloat(element.carbs);
        totalProtein += parseFloat(element.protein);
        totalFat += parseFloat(element.fat);

        if (element.sugar !== undefined) {
          totalSugars += parseFloat(element.sugar);
        }

        totalSaturatedFat += parseFloat(element.saturated_fat);
        totalUnSaturatedFat += parseFloat(element.unsaturated_fat);
        totalCholestrol += parseFloat(element.cholesterol);
        totalSodium += parseFloat(element.sodium);
        totalPotassium += parseFloat(element.potassium);
      });
      console.log(
        "totalCalLeft",
        totalCalLeft,
        "totalCarbs",
        totalCarbs,
        "totalProtein",
        totalProtein,
        "totalFat",
        totalFat
      );

      let calLeft = parseInt(this.state.calLeft) - totalCalLeft.toFixed(2);
      let carbsLeft = parseFloat(this.state.carbsValue) - totalCarbs.toFixed(2);
      let protrinLeft =
        parseFloat(this.state.proteinValue) - totalProtein.toFixed(2);
      let fatLeft = parseFloat(this.state.fatValue) - totalFat.toFixed(2);
      console.log(
        calLeft,
        "CalLeft",
        "carbsLeft ",
        carbsLeft,
        "protrinLeft",
        protrinLeft,
        "fatLeft",
        fatLeft
      );

      this.setState({
        calLeft: calLeft,
        eatenValue: totalCalLeft.toFixed(2),
        carbsValue: carbsLeft.toFixed(2),
        proteinValue: protrinLeft.toFixed(2),
        fatValue: fatLeft.toFixed(2),
        totalCarbs: totalCarbs,
        totalProtein: totalProtein,
        totalFat: totalFat,

        totalSugars: totalSugars,
        totalSaturatedFat: totalSaturatedFat,
        totalUnSaturatedFat: totalUnSaturatedFat,
        totalCholestrol: totalCholestrol,
        totalSodium: totalSodium,
        totalPotassium: totalPotassium,
      });
    }
  }

  /************************************************************** */
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  getFoodImage(item) {
    switch (item) {
      case "BREAKFAST":
        return require("../../assets/img/breakfast_bg.png");

      case "LUNCH":
        return require("../../assets/img/lunch_bg.png");

      case "SNACKS":
        return require("../../assets/img/snack_bg.png");

      case "DINNER":
        return require("../../assets/img/dinner_bg.png");

      case Strings.COACH:
        return require("../../assets/img/exercise_bg.png");
    }
  }

  _toogleList() {
    this.setState({
      refresh: !this.state.refresh,
    });
  }

  // _onPrevDate() {
  //   this.setState({ dayCount: this.state.dayCount - 1 });
  //   dayCount = dayCount - 1;
  //   let selectedDate = moment(today).add(dayCount, 'day').format('YYYY-MM-DD');
  //   console.log('PRIYANKA DATE', selectedDate);
  //   this.props.clearFoodRes();
  //   this.clearState();
  //   let postData = {
  //     id: this.state.userId,
  //     date: selectedDate,
  //   };
  //   this.props.getFoodByDate(postData);
  //   AsyncStorage.setItem(Strings.KEY_DATE, JSON.stringify(selectedDate));
  // }

  _onPrevDate = () => {
    //  this.setState({ dayCount: this.state.dayCount - 1 });
    // var dayCount = dayCount - 1;
    const { defaultDate } = this.state;
    let selectedDate = moment(defaultDate)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
    this.setState({ defaultDate: selectedDate });
    storeItem(Strings.KEY_DATE, selectedDate);

    let postData = {
      id: this.state.userId,
      date: selectedDate,
    };
    this.props.getFoodByDate(postData);
    let getWaterData = {
      userId: this.state.userId,
      date: selectedDate,
    };
    this.props.getWater(getWaterData);

    this.setState({ waterCount: 0 });
    if (this.state.waterListUpdated.length > 7) {
      this.state.waterListUpdated.length = 7;
    }
    for (var i = 0; i <= this.state.waterListUpdated.length; i++) {
      if (this.state.waterListUpdated[i]) {
        this.state.waterListUpdated[i] = false;
      }
    }

    let value = getItem(Strings.KEY_WATER_DATA);
    if (value) {
      if (value !== null) {
        if (value.waterCount > 0) {
          let waterData = {
            userId: this.state.userId,
            date: value.waterDate,
            water: value.waterCount,
          };
          this.props.updateWater(waterData);
        }
      }
    }
    //AsyncStorage.setItem(Strings.KEY_DATE, JSON.stringify(selectedDate));
  };

  _onNextDate = () => {
    // this.setState({ dayCount: this.state.dayCount + 1 });
    // var dayCount = dayCount + 1;
    // let selectedDate = moment(today).add(dayCount, "day").format("YYYY-MM-DD");
    const { defaultDate } = this.state;
    let selectedDate = moment(defaultDate).add(1, "day").format("YYYY-MM-DD");
    this.setState({ defaultDate: selectedDate });
    storeItem(Strings.KEY_DATE, selectedDate);
    let postData = {
      id: this.state.userId,
      date: selectedDate,
    };
    // this.props.getFoodByDate(postData);
  };
  _deleteFood = (id, index, spliceArray) => {
    let postData = {
      foodId: id,
    };
    this.props.deleteFood(postData);
    spliceArray.splice(index, 1);
  };

  onWaterGlassClick(item, index) {
    const { defaultDate, waterListUpdated, totalCount } = this.state;
    let waterDate = defaultDate;

    if (index >= waterListUpdated.length - 1) {
      waterListUpdated.push(false);
    } else {
      if (index < 7) {
        waterListUpdated.length = 7;
      }
    }
    for (var i = 0; i <= index; i++) {
      if (i <= totalCount) {
        if (totalCount < index) {
          for (var j = 0; j <= index; j++) {
            waterListUpdated[j] = true;
            this.setState({ waterCount: index + 1, totalCount: index });

            let waterData = {
              waterCount: index + 1,
              waterDate: waterDate,
            };
            storeItem(Strings.KEY_WATER_DATA, waterData);
            this._toogleList();
          }
        }
        for (var i = index; i <= totalCount; i++) {
          waterListUpdated[i] = false;
          this.setState({ waterCount: index, totalCount: index });

          let waterData = {
            waterCount: index,
            waterDate: waterDate,
          };
          storeItem(Strings.KEY_WATER_DATA, waterData);

          if (index < 7) {
            waterListUpdated.length = 7;
          }

          if (index >= 7) {
            waterListUpdated.length = waterListUpdated.length - 1;
          }

          this._toogleList();
        }
      }
    }
    // } else {
    //   this.state.waterListUpdated.push(false);
    //   this._toogleList();
    // }
  }

  onCaloriesClick() {
    const { defaultDate } = this.state;
    let selectedDate = defaultDate;
    let weekArray = [];
    for (var i = 0; i <= 6; i++) {
      weekArray.push(moment(selectedDate).subtract(i, "d").format("ddd"));
    }

    let monthDate = selectedDate;
    let monthArray = [];
    monthArray.push(selectedDate);
    for (var i = 0; i <= 5; i++) {
      monthDate = moment(monthDate).subtract(5, "d").format("YYYY-MM-DD");
      monthArray.push(monthDate);
    }

    // this.props.navigation.navigate('CaloriesScreen', {
    //   totalCal: this.state.eatenValue,
    //   calLeft: this.state.calLeft,
    //   weekArray: weekArray.reverse(),
    // })

    /*

in this function we can navigate to calories screen ===>

    */
    storeItem("homeData", this.state);
    this.props.history.push("/caloriesScreen");
  }
  goToCat = (name) => {
    if (name === Strings.COACH) {
      window.location.assign("https://youtu.be/M7Xq2cTP0rE");
    } else {
      storeItem(Strings.MEAL_TYPE, name);
      this.props.history.push("/category", { name: name });
    }
  };

  gotoFoodDetails = (name) => {
    storeItem("foodName", name);
    this.props.history.push("/foodDetailScreen", { foodName: name });
  };
  render() {
    const {
      eatenValue,
      carbsValue,
      fatValue,
      proteinValue,
      targetCal,
      calLeft,
      isLoading,
    } = this.state;
    const WaterListUI = ({ data }) => {
      return data.length
        ? data.map((item, index) => {
            return (
              <div
                style={styles.waterGlassImageWrap}
                onClick={() => this.onWaterGlassClick(item, index)}
              >
                {item ? (
                  <img
                    src={require("../../assets/img/water_fill.png")}
                    style={{ maxWidth: "100px" }}
                  />
                ) : (
                  <img
                    src={require("../../assets/img/water_empty.png")}
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </div>
            );
          })
        : null;
    };

    const dietFoodList = [
      {
        name: "BREAKFAST",
      },
      {
        name: "LUNCH",
      },
      {
        name: "SNACKS",
      },
      {
        name: "DINNER",
      },
      {
        name: Strings.COACH,
      },
    ];

    const AddedFoodUI = (props) => {
      const { item } = props;
      let spliceArray = item;
      return item.length ? (
        item.map((item, i) => (
          <div key={i}>
            <div
              className="my-2"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex" }}
                onClick={() => this.gotoFoodDetails(item.food_name)}
              >
                <div
                  className="mx-2"
                  style={{
                    position: "relative",
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    background: COLORS.blue_400,
                  }}
                >
                  <p style={styles.dText}>d</p>
                </div>
                <div>
                  <p style={styles.calStyle}>{item.food_name}</p>
                  <p
                    style={styles.calStyle}
                  >{`${item.cal} Cal ${item.servings} servings`}</p>
                </div>
              </div>
              <p
                className="pt-2 px-2"
                onClick={() => this._deleteFood(item._id, i, spliceArray)}
              >
                <i
                  className="fa fa-trash"
                  style={{ fontSize: 25, color: COLORS.black }}
                />
              </p>
            </div>
          </div>
        ))
      ) : (
        <></>
      );
    };

    const DietFoodListUI = ({ data }) => {
      const { recBreakfast, recLunch, recSnack, recDinner, total } = this.state;

      return data.length
        ? data.map((item, i) => {
            var icon = this.getFoodImage(item.name);
            return (
              <div>
                <div className="mb-5">
                  <div style={{ position: "relative" }}>
                    <div
                      className="mt-5"
                      style={styles.imageDiv}
                      onClick={() => this.goToCat(item.name)}
                    >
                      <img
                        src={icon}
                        width="100%"
                        height="100%"
                        style={styles.imageTag}
                      />
                      <div style={styles.textPosition}>
                        {item.name === Strings.BREAKFAST ? (
                          <div>
                            <p style={styles.foodHeading}>
                              <span style={styles.firstLetterStyle}>B</span>
                              REAKFAST
                            </p>
                            <p style={styles.recommendedText}>
                              Recommended {recBreakfast} Calories
                            </p>
                          </div>
                        ) : null}
                        {item.name === Strings.LUNCH ? (
                          <div>
                            <p style={styles.foodHeading}>
                              <span style={styles.firstLetterStyle}>L</span>
                              UNCH
                            </p>
                            <p style={styles.recommendedText}>
                              Recommended {recLunch} Calories
                            </p>
                          </div>
                        ) : null}
                        {item.name === Strings.SNACKS ? (
                          <div>
                            <p style={styles.foodHeading}>
                              <span style={styles.firstLetterStyle}>S</span>
                              NACKS
                            </p>
                            <p style={styles.recommendedText}>
                              Recommended {recSnack} Calories
                            </p>
                          </div>
                        ) : null}
                        {item.name === Strings.DINNER ? (
                          <div>
                            <p style={styles.foodHeading}>
                              <span style={styles.firstLetterStyle}>D</span>
                              INNER
                            </p>
                            <p style={styles.recommendedText}>
                              Recommended {recDinner} Calories
                            </p>
                          </div>
                        ) : null}
                        {item.name === Strings.COACH ? (
                          <div>
                            <p style={styles.foodHeading}>COACH CONNECT</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {item.name === Strings.BREAKFAST ? (
                    <div className="mt-2" style={styles.totalCal}>
                      <AddedFoodUI item={breakfastArray} />

                      <hr style={{ margin: 0, borderColor: COLORS.blue_400 }} />
                      <p className="p-2" style={styles.calStyle}>
                        {totalCalBreakfast} CAL
                      </p>
                    </div>
                  ) : null}
                  {item.name === Strings.LUNCH ? (
                    <div className="mt-2" style={styles.totalCal}>
                      {<AddedFoodUI item={lunchArray} />}
                      <hr style={{ margin: 0, borderColor: COLORS.blue_400 }} />
                      <p className="p-2" style={styles.calStyle}>
                        {totalCalLunch} CAL
                      </p>
                    </div>
                  ) : null}
                  {item.name === Strings.SNACKS ? (
                    <div className="mt-2" style={styles.totalCal}>
                      {<AddedFoodUI item={snacksArray} />}
                      <hr style={{ margin: 0, borderColor: COLORS.blue_400 }} />
                      <p className="p-2" style={styles.calStyle}>
                        {totalCalsnacks} CAL
                      </p>
                    </div>
                  ) : null}
                  {item.name === Strings.DINNER ? (
                    <div className="mt-2" style={styles.totalCal}>
                      {<AddedFoodUI item={dinnerArray} />}
                      <hr style={{ margin: 0, borderColor: COLORS.blue_400 }} />
                      <p className="p-2" style={styles.calStyle}>
                        {totalCalDinner} CAL
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })
        : null;
    };

    return (
      <MasterLayout>
        <div style={styles.heartCalDiv}>
          <div className="mt-3" style={styles.colWrapper}>
            <div style={styles.textContentCenter}>
              <p style={styles.textStyle}>{eatenValue}</p>
              <p style={styles.textStyle}>EATEN</p>
            </div>
            <div
              style={styles.circleDiv}
              onClick={() => {
                isLoading
                  ? window.alert("Data is laoding")
                  : this.onCaloriesClick();
              }}
            >
              <p
                style={{
                  color: COLORS.WHITE_COLOR,
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                {targetCal}
              </p>
              <p style={styles.textStyle}>TARGET CAL</p>
              <hr
                style={{
                  borderColor: COLORS.colorPrimary,
                  margin: 0,
                }}
              />
              <p
                style={{
                  color: COLORS.WHITE_COLOR,
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                {calLeft}
              </p>
              <p style={styles.textStyle}>CAL LEFT</p>
            </div>

            <div style={styles.textContentCenter}>
              <p style={styles.textStyle}>{this.state.burnedValue}</p>
              <p style={styles.textStyle}>BURNED</p>
            </div>
          </div>
          <div className="my-4" style={styles.colWrapper}>
            <div style={styles.textContentCenter}>
              <p style={styles.textStyle}>CARBS</p>
              <hr style={styles.hrBorderColor} />
              <p style={styles.textStyle}>{carbsValue}g left</p>
            </div>
            <div style={styles.textContentCenter}>
              <p style={styles.textStyle}>PROTEIN</p>
              <hr style={styles.hrBorderColor} />
              <p style={styles.textStyle}>{proteinValue}g left</p>
            </div>

            <div style={styles.textContentCenter}>
              <p style={styles.textStyle}>FAT</p>
              <hr style={styles.hrBorderColor} />
              <p style={styles.textStyle}>{fatValue}g left</p>
            </div>
          </div>
          <a
            href="/dietDetails"
            onClick={() => {
              storeItem("homeData", this.state);
              this.props.history.push("/dietDetails");
            }}
          >
            <p
              className="mt-5"
              style={{
                textAlign: "center",
                color: COLORS.WHITE_COLOR,
                fontWeight: 500,
              }}
            >
              DIET DETAILS
            </p>
          </a>
        </div>
        {/**Caledar view */}
        <div style={styles.calendarWrap}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div onClick={() => this._onPrevDate()}>
              <i className="fa fa-angle-left pt-2" style={{ fontSize: 30 }} />
            </div>
            <p style={{ fontWeight: 600 }}>
              <span style={{ width: "20%" }}>
                <i
                  className="fa fa-calendar mx-4 pt-2"
                  style={{ fontSize: 30 }}
                />
              </span>
              {/* {moment(today)
                .add(this.state.dayCount, "day")
                .format("dddd DD MMM")}{" "} */}
              {moment(this.state.defaultDate).format("dddd DD MMM")} {}
            </p>
            <div onClick={() => this._onNextDate()}>
              <i className="fa fa-angle-right pt-2" style={{ fontSize: 30 }} />
            </div>
          </div>
        </div>

        {/* Water design */}
        <div style={styles.dietListWrapper}>
          <div className="mt-4" style={styles.waterDiv}>
            <div className="p-2" style={styles.waterText}>
              <p style={styles.calStyle}>Water</p>
              <p style={styles.calStyle}>{this.state.waterCount * 8} OZ</p>
            </div>
            <hr style={{ borderColor: COLORS.blue_400, margin: 0 }} />

            <div className="my-4" style={styles.waterGlassDiv}>
              <WaterListUI data={this.state.waterListUpdated} />
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ height: 190, borderRadius: 10 }}>
                <img
                  src={require("../../assets/img/water_bg.png")}
                  style={styles.imageBox}
                />
              </div>
              <div style={styles.insightTextPosition}>
                <p
                  style={{ fontWeight: 800, fontSize: 25, color: COLORS.black }}
                >
                  INSIGHT OF THE DAY
                </p>
                <p
                  style={{ color: COLORS.black, fontWeight: 600, fontSize: 15 }}
                >
                  A Glass or two of water before dinner will make it easier for
                  you to control your portion sizes.
                </p>
              </div>
            </div>
          </div>

          {/**Diet Food list UI */}
          <DietFoodListUI data={dietFoodList} />

          <CustomLoader loader={this.state.isLoading} />
        </div>
      </MasterLayout>
    );
  }
}
const mapStateToProps = (state) => {
  const recCalories = data.getRecommendedCalories(state.auth);
  return {
    AuthReducer: state.auth,
    HomeReducer: state.HomeReducer,
    recCalories: recCalories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getFoodByDate,
      getRecommededCal,
      deleteFood,
      clearFoodRes,
      addBaseTarget,
      updateWater,
      getWater,
      clearWater,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const styles = {
  heartCalDiv: {
    height: 500,
    marginTop: 60,
    background: COLORS.PRIMARY_COLOR,
  },
  colWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 60,
  },
  circleDiv: {
    height: 150,
    width: 150,
    border: "2px solid",
    borderRadius: 100,
    borderColor: COLORS.light_green,
    backgroundColor: COLORS.PRIMARY_COLOR,
    textAlign: "center",
    padding: 10,
  },
  imageDiv: { height: 250, background: "#343434", borderRadius: 10 },
  imageTag: {
    borderRadius: 10,
    opacity: 0.4,
  },
  textPosition: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  foodHeading: {
    color: COLORS.gold,
    fontWeight: "bold",
    fontSize: 28,
  },
  firstLetterStyle: {
    fontWeight: "bold",
    fontSize: 40,
  },
  recommendedText: { color: COLORS.WHITE_COLOR, fontSize: 24 },
  totalCal: {
    border: "1px solid",
    borderColor: COLORS.blue_400,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  insightTextPosition: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "#00000",
  },
  imageBox: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dietListWrapper: { width: "75%", marginLeft: "auto", marginRight: "auto" },
  waterDiv: {
    //height: 200,
    borderRadius: 10,
    border: "1px solid",
    borderColor: COLORS.blue_400,
  },
  waterGlassDiv: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    // border: "1px solid red",
    scrollBehavior: "auto",
    overflow: "scroll",
  },
  waterText: {
    display: "flex",
    justifyContent: "space-between",
  },
  waterGlassImageWrap: {
    // border: "1px solid black",
    marginRight: 15,
  },
  hrBorderColor: {
    borderColor: COLORS.colorPrimary,
    margin: 0,
  },
  textStyle: { color: COLORS.WHITE_COLOR, fontWeight: 500 },
  textContentCenter: {
    alignSelf: "center",
    textAlign: "center",
  },
  calendarWrap: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: COLORS.gray,
  },
  borderRadiusDiv: { borderTopRightRadius: 10 },
  calStyle: { fontWeight: 500, color: COLORS.TEXT_COLOR },
  dText: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    color: COLORS.WHITE_COLOR,
    fontWeight: 500,
    fontSize: 20,
  },
};
