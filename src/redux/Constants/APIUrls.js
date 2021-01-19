//===============Stagging=============
// let BASE_URL = 'http://54.71.18.74:5980/api/';
// let IMAGE_URL = 'http://54.71.18.74:5980/';

//==========Local System====================
let BASE_URL = "http://54.190.192.105:6009/api/";
let BASE_URL_NUTRITION = "https://trackapi.nutritionix.com/v2/";

const API = {
  LOGIN_USER: "v1/user/login",
  REGISTER_USER: "v1/user",
  GET_PROFILE_DETAILS: "v1/user/",
  UPDATE_PROFILE_DETAILS: "v1/user",
  GET_RECOMMEDED_CAL: "v1/user/recomended_cal/",
  GET_FOOD_BY_DATE: "v1/user/get-by-date/",
  GET_FOOD_RECENT: "v1/user/get-recent/",
  GET_FOOD_FREQUENT: "v1/user/get-frequent/",
  SAVE_NUTRITION_FOOD_DATA: "v1/user/nutrition-data",
  DELETE_FOOD: "v1/delete-food",
  ADD_BASE_TARGET: "v1/user/add-base-target",
  GET_REPORTS: "v1/user/reports/",
  GET_REPORTS_OVERVIEW: "report-overview",
  GET_GRAPH_BY_PAGE: "graph-by-page",
  //report-overview
  //v1/user/reports/
  //

  GET_GOAL: BASE_URL + "v1/goal",
  GET_DIET: BASE_URL + "v1/diet",
  //http://localhost:6009/api/v1/user/uploadImage
  IMAGE_UPLOAD_AX: "v1/user/uploadImage",
  IMAGE_UPLOAD: BASE_URL + "v1/user/uploadImage",
  VERIFY_EMAIL: BASE_URL + "v1/user/verify-email",

  GET_FOOD_DETAILS_NUTRITION: "natural/nutrients",
  GET_FOOD_LIST_NUTRITION: "search/instant?query=",

  GET_RESTAURANT_MAP: "https://trackapi.nutritionix.com/v2/locations?ll=",
  GET_WATER: "v1/water/",
  UPDATE_WATER: "v1/water/add-update",
  GET_CIRCULATORY_REPORT: "circulatory",
};

export default API;

//==========Local System====================
