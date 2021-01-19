import { combineReducers } from "redux";
import auth from "../../screens/authentication/AuthReducer";
import error from "../Reducer/Error";
import loader from "../Reducer/Loader";
import Profile from "./Profile";
import HomeReducer from "../../screens/Home/HomeReducer";
import FoodTypeReducer from "../../screens/Home/FoodTypeReducer";
import ReportReducer from "../../screens/Report/ReportReducer";
export default combineReducers({
  auth: auth,
  error: error,
  loader: loader,
  profile: Profile,
  HomeReducer: HomeReducer,
  FoodTypeReducer: FoodTypeReducer,
  ReportReducer: ReportReducer,
  // ProfileReducer: ProfileReducer,
  // HomeReducer: HomeReducer,
});
