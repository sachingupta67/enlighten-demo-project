import React from "react";
import MasterLayout from "components/Layout/MasterLayout";
import COLORS from "redux/Constants/Colors";
import { Input, InputGroup } from "reactstrap";
import {
  getRecentFood,
  getFrequentFood,
} from "../../redux/Actions/ActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Strings, APIUrls } from "../../redux/Constants";
import CustomRestaurantList from "components/Custom/CustomRestaurantList";
import CustomLoader from "components/Loader/CustomLoader";
import CustomMap from "components/Map/CustomMap";
import Switch from "react-bootstrap-switch";
import SpeachToText from "../../components/Speech";
const KEYS_TO_FILTERS = ["name"];
class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      getRestaurantData: [],
      newFilterList: [],
      searchPlaceholder: "Search",
      searchText: "",
      isMapVisible: false,
      isSwitchOn: false,
      isLoading: false,
      map: false,
      speech: "",
      listening: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getReasturentMappingApiCall();
    //this.getInitialState();
  }

  getReasturentMappingApiCall() {
    this.setState({ isLoading: true });
    var center = {
      lat: 38.8982919,
      lng: -77.0273156,
    };
    //?ll=38.89814,-77.029446&distance=5km&limit=10
    fetch(
      APIUrls.GET_RESTAURANT_MAP +
        center.lat +
        "," +
        center.lng +
        "&distance=5km&limit=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": Strings.NUTRITION_X_APP_ID,
          "x-app-key": Strings.NUTRITION_X_APP_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          getRestaurantData: responseJson.locations,
          newFilterList: responseJson.locations,
        });
        console.log(
          "responseJson mapping >>>",
          JSON.stringify(responseJson.locations)
        );
      })
      .catch((error) => {
        console.log("error mapping >>>", error);
        this.setState({ isLoading: false });
      });
  }
  handleSwitch(elem, state) {
    console.log("handleSwitch. elem:", elem);
    console.log("name:", elem.props.name);
    console.log("new state:", state);
    this.setState({ map: state });
  }

  r;

  searchUpdated = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    const { searchText, getRestaurantData, newFilterList } = this.state;
    console.log(searchText);
    if (searchText !== "" && newFilterList) {
      let filteredValue = getRestaurantData.filter((item, i) =>
        item.name.toLowerCase().match(searchText.toLowerCase())
      );
      this.setState({ newFilterList: filteredValue });
    }
    if (searchText === "" || searchText.length === 0) {
      this.setState({ newFilterList: getRestaurantData });
    }
  };

  toggleListen = () => {
    this.setState({ listening: !this.state.listening });
  };

  render() {
    const GraphUI = (props) => {
      const { data } = props;
      console.log(data);
      return data.map((item, i) => {
        return (
          <div>
            <CustomRestaurantList
              key={item.id}
              src={require("../../assets/img/heart.png")}
              avatar={item.name.charAt(0)}
              heading={item.name}
              title={item.address}
              phone={item.phone}
              website={item.website}
            />
          </div>
        );
      });
    };

    const { newFilterList, searchText, map, getRestaurantData } = this.state;
    return (
      <MasterLayout>
        <div style={styles.wrapper}>
          <h3>
            <center style={{ fontWeight: "bold", color: COLORS.TEXT_COLOR }}>
              RESTAURANTS
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
                  <Input
                    type="text"
                    placeholder="Search ..."
                    name="searchText"
                    value={searchText}
                    onChange={(e) => this.searchUpdated(e)}
                    style={{ border: "none" }}
                  />
                </InputGroup>
              </form>
            </div>
            <div
              className="pt-2"
              style={{ width: "5%" }}
              onClick={() =>
                this.setState({
                  newFilterList: getRestaurantData,
                  searchText: "",
                })
              }
            >
              <p style={{ fontWeight: 500, color: COLORS.TEXT_COLOR }}>
                Cancel
              </p>
            </div>
          </div>
          <div className="title">
            <h3>Map</h3>
          </div>

          <Switch
            defaultValue={map}
            onColor="primary"
            offColor="primary"
            onChange={(el, state) => this.handleSwitch(el, state)}
          />

          {map ? (
            <CustomMap
              containerStyle={styles.mapContainer}
              data={this.state.newFilterList}
            />
          ) : newFilterList && this.state.newFilterList.length ? (
            <GraphUI data={this.state.newFilterList} />
          ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
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
  mapContainer: {
    width: "100%",
    height: 500,
    marginBottom: 20,
  },
};
