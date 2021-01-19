import React from "react";
import { Router, Route, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import { history } from "./redux/Utils/history";
import PublicRoute from "routing/PublicRoute";
import PrivateRoute from "routing/PrivateRoute";
import WelcomeScreen from "screens/authentication/WelcomeScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import SignupFlow from "./screens/SignUp/index";
import Category from "./screens/Home/Category";
import CategoryList from "./screens/Home/CategoryList";
import CategoryNutritionMenuList from "./screens/Home/CategoryNutritionMenuList";
import FoodDetailScreen from "screens/Home/FoodDetailScreen";
import FrequentRecent from "screens/Home/FrequentRecent";
import DietDetails from "screens/Home/DietDetails";
import ReportScreen from "screens/Report/ReportScreen";
import KeyOptimizationReport from "screens/Report/KeyOptimizationReport";
import Restaurants from "screens/Home/Restaurants";
import IndicatorScreen from "screens/Report/IndicatorScreen";
import KeyOptimizationDetails from "screens/Report/KeyOptimizationDetails";
import ActionPlanScreen from "screens/Report/ActionPlanScreen";
import FoodAdditiveScreen from "screens/Report/FoodAdditiveScreen";
import MyNutritionSystem from "screens/Profile/MyNutritionSystem";
import CaloriesScreen from "screens/Home/CaloriesScreen";
// others
// require("dotenv").config();

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute
          restricted={true}
          component={WelcomeScreen}
          path="/"
          exact
        />
        <PublicRoute
          restricted={true}
          component={SignupFlow}
          path="/signup"
          exact
        />
        <PrivateRoute component={HomeScreen} path="/home" exact />
        <PrivateRoute component={Category} path="/category" exact />
        <PrivateRoute component={DietDetails} path="/dietDetails" exact />
        <PrivateRoute component={FrequentRecent} path="/frequentRecent" exact />
        <PrivateRoute component={Restaurants} path="/restaurants" exact />
        <PrivateRoute component={CategoryList} path="/categoryList" exact />
        <PrivateRoute
          component={CategoryNutritionMenuList}
          path="/categoryNutritionMenuList"
          exact
        />
        <PrivateRoute
          component={FoodDetailScreen}
          path="/foodDetailScreen"
          exact
        />
        <PrivateRoute component={ProfileScreen} path="/profile" exact />
        <PrivateRoute
          component={MyNutritionSystem}
          path="/myNutritionResults"
          exact
        />
        <PrivateRoute component={CaloriesScreen} path="/caloriesScreen" exact />
        <PrivateRoute component={ReportScreen} path="/report" exact />
        <PrivateRoute
          component={KeyOptimizationReport}
          path="/keyOptimizationReport"
          exact
        />
        <PrivateRoute
          component={KeyOptimizationDetails}
          path="/keyOptimizationDetails"
          exact
        />
        <PrivateRoute
          component={IndicatorScreen}
          path="/indicatorScreen"
          exact
        />
        <PrivateRoute
          component={ActionPlanScreen}
          path="/actionPlanScreen"
          exact
        />
        <PrivateRoute
          component={FoodAdditiveScreen}
          path="/foodAdditivesScreen"
          exact
        />
      </Switch>
    </Router>
  );
};

export default App;
