import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./redux/Store/configureStore";
require("dotenv").config();

const ReduxApp = () => {
  return (
    <Provider store={configureStore}>
      <App />
    </Provider>
  );
};
ReactDOM.render(<ReduxApp />, document.getElementById("root"));
