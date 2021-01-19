import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getItem } from "../redux/Utils/AsyncUtils";
import { Strings } from "../redux/Constants";

const isLogin = () => (getItem(Strings.KEY_USER_DATA) ? true : false);
const PrivateRoute = ({ component: Component, ...rest }) => {
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
