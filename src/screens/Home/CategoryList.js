import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { Input, InputGroup } from "reactstrap";
import { storeItem } from "../../redux/Utils/AsyncUtils";
import CustomLoader from "components/Loader/CustomLoader";

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  gotoFoodDetails = (item) => {
    this.setState({ isLoading: true });
    storeItem("categoryName", item.name);
    this.props.history.push("/categoryNutritionMenuList", {
      categoryName: item.name,
    });
  };
  render() {
    const categoriesList = [
      {
        name: "BEEF",
        // detail: Strings.BE_HEALTHIER_DETAIL,
        id: 1,
      },
      {
        name: "BAKERY",
        //  detail: Strings.LOSE_WEIGHT_DETAIL,
        id: 2,
      },
      {
        name: "EGGS",
        // detail: Strings.LOSE_WEIGHT_DETAIL,
        id: 3,
      },
      {
        name: "FISH",
        // detail: Strings.LOSE_WEIGHT_DETAIL,
        id: 4,
      },
      {
        name: "LAMB",
        // detail: Strings.LOSE_WEIGHT_DETAIL,
        id: 5,
      },
      {
        name: "PORK",
        // detail: Strings.LOSE_WEIGHT_DETAIL,
        id: 6,
      },
    ];

    return (
      <MasterLayout>
        <div style={styles.wrapper}>
          <h3 className="mb-5" style={{ fontWeight: 700 }}>
            <center>CATEGORIES</center>
          </h3>
          {categoriesList.length
            ? categoriesList.map((item, i) => (
                <div
                  className="mt-3"
                  onClick={() => this.gotoFoodDetails(item)}
                >
                  <p key={i} style={styles.text}>
                    {item.name}
                  </p>

                  <hr />
                </div>
              ))
            : null}
        </div>
        <CustomLoader loader={this.state.isLoading} />
      </MasterLayout>
    );
  }
}
export default CategoryList;

const styles = {
  wrapper: {
    paddingTop: 80,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    // border: "1px solid red",
  },
  text: {
    fontWeight: 500,
    color: COLORS.black,
  },
};
