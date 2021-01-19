import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { getItem } from "redux/Utils/AsyncUtils";
import { VictoryPie } from "victory";
class DietDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    let data = getItem("homeData");
    this.setState({ data: data });
  }
  render() {
    console.log(this.state.data);

    const {
      eatenValue,
      totalProtein,
      totalCarbs,
      totalSugars,
      totalFat,
      totalSaturatedFat,
      totalUnSaturatedFat,
      totalCholestrol,
      totalSodium,
      totalPotassium,
    } = this.state.data;

    return (
      <MasterLayout>
        <div style={styles.blueDiv}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingTop: 120,
            }}
          >
            <div style={styles.targetRDA}>
              <p style={{ fontWeight: 700 }}>TARGET(RDA)</p>
              <p style={{ fontWeight: 700 }}>1300</p>
            </div>
            <div
              style={{
                borderLeft: "1px solid",
                borderColor: COLORS.WHITE_COLOR,
              }}
            ></div>
            <div style={styles.targetRDA}>
              <p style={{ fontWeight: 700 }}>CURRENT(RDA)</p>
              <p style={{ fontWeight: 700 }}>{parseInt(eatenValue, 10)}</p>
            </div>
          </div>
        </div>

        <div style={styles.widthWrap} className="mt-5">
          <p
            className="mt-4"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: COLORS.black,
              fontSize: 25,
            }}
          >
            Target v/s Current
          </p>
          <div
            className="my-5"
            style={{
              display: "flex",
              justifyContent: "space-around",
              // border: "1px solid red",
              // width: "80%",
              // marginLeft: "auto",
              // marginRight: "auto",
            }}
          >
            <div style={{ width: 300 }}>
              <div>
                <VictoryPie
                  data={[
                    { x: "protein", y: 98 },
                    { x: "fat", y: 144 },
                    { x: "carbs", y: 455 },
                  ]}
                  style={{
                    labels: { fill: "white", fontSize: 20, fontWeight: "bold" },
                  }}
                  colorScale={["#8EA675", "#accce3", "#26599B"]}
                />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 25,
                  }}
                >
                  1300 CAL
                </p>
                <p style={styles.graphText}>
                  <div
                    className="mx-2"
                    style={{
                      height: 20,
                      width: 20,
                      background: COLORS.pie_carbs,
                    }}
                  ></div>
                  455g Carbs
                </p>
                <p style={styles.graphText}>
                  <div
                    className="mx-2"
                    style={{
                      height: 20,
                      width: 20,
                      background: COLORS.pie_pro,
                    }}
                  ></div>
                  98g Protein
                </p>
                <p style={styles.graphText}>
                  <div
                    className="mx-2"
                    style={{
                      height: 20,
                      width: 20,
                      background: COLORS.pie_fat,
                    }}
                  ></div>
                  144g Fat
                </p>
              </div>
            </div>

            <div style={{ width: 300 }}>
              <div>
                <VictoryPie
                  data={[
                    { x: "protein", y: totalProtein },
                    { x: "fat", y: totalFat },
                    { x: "carbs", y: totalCarbs },
                  ]}
                  style={{
                    labels: { fill: "white", fontSize: 20, fontWeight: "bold" },
                  }}
                  colorScale={["#8EA675", "#accce3", "#26599B"]}
                />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 25,
                  }}
                >
                  {eatenValue} CAL
                </p>
                <p style={styles.graphText}>
                  <div
                    className="mx-2"
                    style={{
                      height: 20,
                      width: 20,
                      background: COLORS.pie_carbs,
                    }}
                  ></div>
                  {totalCarbs}g Carbs
                </p>
                <p style={styles.graphText}>
                  <div
                    className="mx-2"
                    style={{
                      height: 20,
                      width: 20,
                      background: COLORS.pie_pro,
                    }}
                  ></div>
                  {totalProtein}g Protein
                </p>
                <p style={styles.graphText}>
                  <div
                    className="mx-2"
                    style={{
                      height: 20,
                      width: 20,
                      background: COLORS.pie_fat,
                    }}
                  ></div>
                  {totalFat}g Fat
                </p>
              </div>
            </div>
          </div>
          <div>
            <p
              className="my-4"
              style={{ fontWeight: 500, color: COLORS.TEXT_COLOR }}
            >
              Current Nutrition Details
            </p>
          </div>
          {/*PROTEIN */}
          <div className="p-2" style={styles.headingBlueColor}>
            <p style={styles.headingFontWeightColor}>PROTEIN</p>
            <p style={styles.headingFontWeightColor}>{totalProtein}</p>
          </div>
          {/*CARBS */}
          <div className="p-2 mt-4" style={styles.headingBlueColor}>
            <p style={styles.headingFontWeightColor}>CARBS</p>
            <p style={styles.headingFontWeightColor}>{totalCarbs}</p>
          </div>
          <div className="p-2" style={styles.titleWhiteBackgroundColor}>
            <p style={styles.titleFontWeightColor}>SUGAR</p>
            <p style={styles.titleFontWeightColor}>{totalSugars}</p>
          </div>

          {/*FAT */}
          <div className="p-2 mt-4" style={styles.headingBlueColor}>
            <p style={styles.headingFontWeightColor}>FAT</p>
            <p style={styles.headingFontWeightColor}>{totalFat}</p>
          </div>
          <div className="p-2" style={styles.titleWhiteBackgroundColor}>
            <p style={styles.titleFontWeightColor}>Saturated Fat</p>
            <p style={styles.titleFontWeightColor}>{totalSaturatedFat}</p>
          </div>
          <div className="p-2" style={styles.titleWhiteBackgroundColor}>
            <p style={styles.titleFontWeightColor}>Unsaturated Fat</p>
            <p style={styles.titleFontWeightColor}>{totalUnSaturatedFat}</p>
          </div>

          {/**Cholestrol */}
          <div className="p-2 mt-4" style={styles.titleWhiteBackgroundColor}>
            <p style={styles.titleFontWeightColor}>Cholestrol</p>
            <p style={styles.titleFontWeightColor}>{totalCholestrol}</p>
          </div>
          <div className="p-2" style={styles.titleWhiteBackgroundColor}>
            <p style={styles.titleFontWeightColor}>Sodium</p>
            <p style={styles.titleFontWeightColor}>{totalSodium}</p>
          </div>
          <div className="p-2 mb-4" style={styles.titleWhiteBackgroundColor}>
            <p style={styles.titleFontWeightColor}>Potassium</p>
            <p style={styles.titleFontWeightColor}>{totalPotassium}</p>
          </div>
        </div>
      </MasterLayout>
    );
  }
}
export default DietDetails;

const styles = {
  targetRDA: {
    color: COLORS.WHITE_COLOR,
    fontWeight: "bold",
    textAlign: "center",
  },
  blueDiv: {
    height: 200,
    background: COLORS.PRIMARY_COLOR,
    position: "relative",
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
  graphText: {
    display: "flex",
    color: COLORS.TEXT_COLOR,
    fontWeight: 500,
    textAlign: "center",
  },
};
