import API_CONST from "../Constants/APIConstants";
import ACTION_TYPES from "../Actions/ActionTypes";

export const loginUser = (data) => {
  return {
    type: API_CONST.N_LOGIN_USER,
    data,
  };
};

export const registerUser = (data) => {
  return {
    type: API_CONST.N_REGISTER_USER,
    data,
  };
};

export const clearAuthReducer = () => {
  return {
    type: ACTION_TYPES.CLEAR_AUTH,
  };
};

export const getFoodDetailsNutrition = (data) => {
  console.log("eror checking food name=====================>", data);
  return {
    type: API_CONST.N_GET_FOOD_DETAILS_NUTRITION,
    data,
  };
};

//updateServingValue
export const updateServingValue = (data) => {
  return {
    type: ACTION_TYPES.UPDATE_SERVING_VALUE,
    payload: data,
  };
};

export const getFoodListNutrition = (data) => {
  return {
    type: API_CONST.N_GET_FOOD_LIST_NUTRITION,
    data,
  };
};

export const clearFoodTypeReducer = () => {
  return {
    type: ACTION_TYPES.CLEAR_FOOD_TPYE,
  };
};

export const getProfileDetails = (data, token) => {
  return {
    type: API_CONST.N_GET_PROFILE_DETAILS,
    data,
    token,
  };
};

export const updateProfileDetails = (data) => {
  return {
    type: API_CONST.N_UPDATE_PROFILE_DETAILS,
    data,
  };
};

export const clearProfile = () => {
  return {
    type: API_CONST.N_CLEAR_PROFILE,
  };
};

export const getRecommededCal = (data) => {
  return {
    type: API_CONST.N_GET_RECOMMEDE_CAL,
    data,
  };
};

export const getFoodByDate = (data) => {
  return {
    type: API_CONST.N_GET_FOOD_BY_DATE,
    data,
  };
};

export const getRecentFood = (data) => {
  return {
    type: API_CONST.N_GET_FOOD_RECENT,
    data,
  };
};

export const getFrequentFood = (data) => {
  return {
    type: API_CONST.N_GET_FOOD_FREQUENT,
    data,
  };
};

export const saveNutritionFood = (data) => {
  return {
    type: API_CONST.N_SAVE_NUTRITION_FOOD_DETAILS,
    data,
  };
};

export const deleteFood = (data) => {
  return {
    type: API_CONST.N_DELETE_FOOD,
    data,
  };
};

export const loaderHandler = (data) => {
  return {
    type: API_CONST.N_LOADER,
    data,
  };
};

export const errorHandler = (data) => {
  return {
    type: API_CONST.N_ERROR,
    data,
  };
};

export const errorReducerClear = () => {
  return {
    type: API_CONST.N_ERROR_CLEAR,
  };
};

export const clearFoodRes = () => {
  return {
    type: ACTION_TYPES.CLEAR_FOOD_RES,
  };
};

export const addBaseTarget = (data) => {
  return {
    type: API_CONST.N_ADD_BASE_TARGET,
    data,
  };
};

export const reports = (data) => {
  return {
    type: API_CONST.N_REPORTS,
    data,
  };
};

export const reportOverview = (data) => {
  return {
    type: API_CONST.N_REPORTS_OVERVIEW,
    data,
  };
};

export const graphByPage = (data, isReducerChange) => {
  return {
    type: API_CONST.N_GRAPH_BY_PAGE,
    data,
    isReducerChange,
  };
};

export const clearGraphByPage = () => {
  return {
    type: ACTION_TYPES.CLEAR_GRAPH_BY_PAGE,
  };
};
export const updateWater = (data) => {
  return {
    type: API_CONST.N_UPDATE_WATER,
    data,
  };
};

export const getWater = (data) => {
  return {
    type: API_CONST.N_GET_WATER,
    data,
  };
};

export const clearWater = () => {
  return {
    type: ACTION_TYPES.CLEAR_WATER,
  };
};
export const circulatoryReport = (data) => {
  return {
    type: API_CONST.N_CIRCULATORY_REPORT,
    data,
  };
};
