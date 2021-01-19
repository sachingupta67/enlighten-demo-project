import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const AnyReactComponent = ({ text }) => (
  <div>
    <img
      src={require("../../assets/img/marker.jpg")}
      width="100"
      height="100"
    />
  </div>
);
const { REACT_APP_GOOGLE_MAP_KEY } = process.env;
class CustomMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  constructor() {
    super();
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {},
    };
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const { containerStyle, data } = this.props;
    var center = {
      lat: 38.8982919,
      lng: -77.0273156,
    };
    console.log(process.env);
    const points = data.length
      ? data.map((item, i) => {
          return { lat: item.lat, lng: item.lng };
        })
      : [];

    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    return (
      // Important! Always set the container height explicitly
      <div style={containerStyle}>
        <Map
          google={this.props.google}
          zoom={10}
          style={{ position: "absolute" }}
          initialCenter={{
            lat: 38.8982919,
            lng: -77.0273156,
          }}
          containerStyle={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          bounds={bounds}
        >
          {data.length
            ? data.map((item, i) => {
                return (
                  <Marker name={item.name}>
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                    >
                      <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                      </div>
                    </InfoWindow>
                  </Marker>
                );
              })
            : null}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: REACT_APP_GOOGLE_MAP_KEY })(
  CustomMap
);
