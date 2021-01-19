import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getItem } from "../redux/Utils/AsyncUtils";
import { Strings } from "../redux/Constants";

const isLogin = () => (getItem(Strings.KEY_USER_DATA) ? true : false);
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
