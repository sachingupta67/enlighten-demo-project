/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  cps,
} from "redux-saga/effects";
import API from "../Constants/APIUrls";
import API_CONST from "../Constants/APIConstants";
import ACTION_TYPES from "../Actions/ActionTypes";
import axiosConfigNutritionX from "../Utils/AxiosConfigNutritionX";
import axiosConfig from "../Utils/AxiosConfig";
import Strings from "../Constants/Strings";
import axios from "axios";
import { history } from "../Utils/history";
import { storeItem, getItem } from "../Utils/AsyncUtils";
import axiosConfigReports from "../Utils/AxiosConfigReports";
/** function that returns an axios call */
function requestApi(type, url, params, headers) {
  return axiosConfig.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}

function requestApiNutritionX(type, url, params, headers) {
  return axiosConfigNutritionX.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}

function requestApiReports(type, url, params, headers) {
  return axiosConfigReports.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}

//get response json
const _extJSON = (p) => {
  return p.then((res) => res);
};

function* loginUser(action) {
  try {
    yield* loaderHandler(true);
    var postData = action.data;
    let response = yield call(requestApi, "POST", API.LOGIN_USER, postData);
    console.log("Res Login saga>>> " + JSON.stringify(response));

    let status = response.data.statusCode;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
      const { _id, loginToken } = responseData;

      const userInfo = { id: _id, loginToken: loginToken };
      storeItem(Strings.KEY_USER_DATA, userInfo);
      yield* loaderHandler(false);
      history.push("/home");
    } else {
      responseData = response.data.message;
      yield* loaderHandler(false);
      //alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.LOGIN_USER,
      payload: responseData,
      statusCode: status,
    });
  } catch (err) {
    //  alert(JSON.stringify(err.data.message));
    console.log("LOgin Error PRIYANKA >>> " + JSON.stringify(err));
    yield* loaderHandler(false);
    yield* errorHandler(err.data);
    yield put({
      type: ACTION_TYPES.LOGIN_USER,
      payload: err,
    });
  }
}

function* registerUser(action) {
  try {
    yield* loaderHandler(true);
    var postData = action.data;
    let response = yield call(
      requestApi,
      "POST",
      API.REGISTER_USER,
      JSON.stringify(postData)
    );
    console.log("Res >>> " + JSON.stringify(response));

    let status = response.data.statusCode;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      yield* loaderHandler(false);
      //key store krnai hao jaise login mai ki thi
      responseData = response.data.data;
      // const { _id, loginToken } = responseData;

      // const userInfo = { id: _id, loginToken: loginToken };
      // storeItem(Strings.KEY_USER_DATA, userInfo);
      // yield* loaderHandler(false);
      // history.push("/home");
    } else {
      responseData = response.data.message;
      yield* loaderHandler(false);

      // alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.REGISTER_USER,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    yield* loaderHandler(false);
    yield* errorHandler(err.data);
    // alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.REGISTER_USER,
      payload: err,
    });
  }
}

function* getFoodDetailsNutrition(action) {
  console.log("checking here-=======>", action);
  try {
    var postData = action.data;
    // eslint-disable-next-line prettier/prettier
    let response = yield call(
      requestApiNutritionX,
      "POST",
      API.GET_FOOD_DETAILS_NUTRITION,
      postData
    );
    console.log("sucesss==============================>");
    console.log(response);
    let status = response.status;
    let responseData = "";
    console.log("getFoodDetailsNutrition SAGA>>>", JSON.stringify(response));
    // responseData = response.data;
    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data;
      yield put({
        type: ACTION_TYPES.GET_FOOD_DETAILS_NUTRITION,
        payload: responseData,
        statusCode: status,
      });
    } else {
      responseData = response.message;
      yield put({
        type: ACTION_TYPES.GET_FOOD_DETAILS_NUTRITION,
        payload: responseData,
        statusCode: status,
      });
      // alert(response.message);
    }
  } catch (err) {
    console.log("my errorrrrrr=================================>");
    console.log(JSON.stringify(err));
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_DETAILS_NUTRITION,
      payload: err,
    });
  }
}

//getFoodListNutrition
function* getFoodListNutrition(action) {
  try {
    var postData = action.data;
    // eslint-disable-next-line prettier/prettier
    let response = yield call(
      requestApiNutritionX,
      "GET",
      API.GET_FOOD_LIST_NUTRITION + postData.query
    );
    let responseData = "";
    // console.log('responseJson SAGA>>>', JSON.stringify(response));
    responseData = response.data.common;
    console.log("rs======>", response);

    yield put({
      type: ACTION_TYPES.GET_FOOD_LIST_NUTRITION,
      payload: responseData,
      statusCode: "",
    });
  } catch (err) {
    alert(JSON.stringify(err));
    // console.log('registerUser Error >>> ' + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_LIST_NUTRITION,
      payload: err,
    });
  }
}

//getProfileDetails
function* getProfileDetails(action) {
  console.log("profile details action========>", action);
  try {
    yield* loaderHandler(true);
    var postData = action.data;
    let response = yield call(
      requestApi,
      "GET",
      API.GET_PROFILE_DETAILS + postData.userId
    );
    console.log("Res profile >>> " + JSON.stringify(response));
    let status = response.data.statusCode;
    let responseData = "";
    console.log(response);

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
      yield* loaderHandler(false);
    } else {
      responseData = response.data.message;

      //alert(response.data.message);
    }
    yield put({
      type: ACTION_TYPES.GET_PROFILE_DEATIL,
      payload: responseData,
      statusCode: status,
    });
  } catch (err) {
    //  alert(JSON.stringify(err));
    yield* loaderHandler(false);
    yield* errorHandler(err.data);

    console.log("GET_PROFILE_DEATIL Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_PROFILE_DEATIL,
      payload: err,
    });
  }
}

function* updateProfileDetails(action) {
  try {
    var postData = action.data;
    let response = yield call(
      requestApi,
      "PUT",
      API.UPDATE_PROFILE_DETAILS,
      postData
    );
    console.log("Res >>> " + JSON.stringify(response));

    let status = response.data.code;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
      /*
{type: "N_GET_PROFILE_DETAILS", data: {…}, token: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ3aGVuIjoiM…ntZWf14heRTmVQOzC2IdoKM2I2IkWfrDuypAFUI9XObjUzj-Q"}
type: "N_GET_PROFILE_DETAILS"
data:
userId: "5e9557340c78fe153461dce8"

      */
      let autoReload = {
        type: "N_GET_PROFILE_DETAILS",
        data: { userId: getItem(Strings.KEY_USER_DATA).id },
      };

      yield* getProfileDetails(autoReload);
    } else {
      responseData = response.data.message;
      let autoReload = {
        type: "N_GET_PROFILE_DETAILS",
        data: { userId: getItem(Strings.KEY_USER_DATA).id },
      };

      yield* getProfileDetails(autoReload);
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.UPDATE_PROFILE_DEATIL,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.UPDATE_PROFILE_DEATIL,
      payload: err,
    });
  }
}

function* getRecommededCal(action) {
  try {
    var postData = action.data;
    let response = yield call(
      requestApi,
      "GET",
      API.GET_RECOMMEDED_CAL + postData
    );

    // console.log('Res recommeded >>> ' + JSON.stringify(response));

    let status = response.data.statusCode;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_RECOMMED_CAL,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_RECOMMED_CAL,
      payload: err,
    });
  }
}

function* saveNutritionFood(action) {
  try {
    var postData = action.data;
    let response = yield call(
      requestApi,
      "POST",
      API.SAVE_NUTRITION_FOOD_DATA,
      postData
    );
    console.log("Res >>> " + JSON.stringify(response));

    let status = response.data.statusCode;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.SAVE_NUTRITION_FOOD,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("SAVE_NUTRITION_FOOD Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.SAVE_NUTRITION_FOOD,
      payload: err,
    });
  }
}

function* getFoodByDate(action) {
  try {
    var postData = action.data;
    console.log(postData, "postdata get by date");
    // let response = yield call(requestApi, 'GET', API.GET_FOOD_BY_DATE + postData.id + '/2020-04-01');
    let response = yield call(
      requestApi,
      "GET",
      API.GET_FOOD_BY_DATE + postData.id + "/" + postData.date
    );
    console.log(JSON.stringify(response), "response get by date");

    let status = response.data.statusCode;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_FOOD_BY_DATE,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_BY_DATE,
      payload: err,
    });
  }
}

function* getRecentFood(action) {
  try {
    console.log("get recent food =====>", action);
    var postData = action.data;
    let response = yield call(
      requestApi,
      "GET",
      API.GET_FOOD_RECENT + postData
    );

    let status = response.data.statusCode;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      // alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_FOOD_RECENT,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    // alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_RECENT,
      payload: err,
    });
  }
}

function* getFrequentFood(action) {
  try {
    var postData = action.data;
    let response = yield call(
      requestApi,
      "GET",
      API.GET_FOOD_FREQUENT + postData
    );

    let status = response.data.statusCode;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_FOOD_FREQUENT,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_FOOD_FREQUENT,
      payload: err,
    });
  }
}

//deleteFood
function* deleteFood(action) {
  try {
    var postData = action.data;
    let response = yield call(requestApi, "POST", API.DELETE_FOOD, postData);

    let status = response.data.statusCode;
    let responseData = "";

    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.DELETE_FOOD,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.DELETE_FOOD,
      payload: err,
    });
  }
}

//uploadImage
function* uploadImage(action) {
  try {
    var postData = action.data;
    let response = yield call(
      requestApi,
      "POST",
      API.IMAGE_UPLOAD_AX,
      postData
    );
    // LOG.log("response", response);
    // let status = response.data.statusCode;
    // let responseData = '';

    // if (status == Strings.HTTP_STATUS_CODE_OK) {
    //   responseData = response.data;
    // } else {
    //   responseData = response.data.message;
    //   alert(response.data.message);
    // }

    // yield put({
    //   type: ACTION_TYPES.DELETE_FOOD,
    //   payload: responseData,
    //   statusCode: response.data.statusCode,
    // });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("upload image Error >>> " + JSON.stringify(err));
    // yield put({
    //   type: ACTION_TYPES.DELETE_FOOD,
    //   payload: err,
    // });
  }
}

//addBaseTarget
function* addBaseTarget(action) {
  try {
    console.log("action.data >>", action.data);
    var postData = action.data;
    let response = yield call(
      requestApi,
      "POST",
      API.ADD_BASE_TARGET,
      postData
    );

    let status = response.data.statusCode;
    let responseData = "";
    console.log("********* responseDataAddBaseTarget ********", responseData);
    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data.base_target_val;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.ADD_BASE_TARGET,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.ADD_BASE_TARGET,
      payload: err,
    });
  }
}

function* reports(action) {
  try {
    console.log("action.data >>", action.data);
    var postData = action.data;
    let response = yield call(requestApi, "GET", API.GET_REPORTS + postData);

    let status = response.data.statusCode;
    let responseData = "";
    console.log("********* responseDataAddBaseTarget ********", responseData);
    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data.reports;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_REPORTS,
      payload: responseData,
      statusCode: response.data.statusCode,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_REPORTS,
      payload: err,
    });
  }
}

function* reportOverview(action) {
  try {
    console.log("action.data >>", action.data);
    var postData = action.data;
    let response = yield call(
      requestApiReports,
      "POST",
      API.GET_REPORTS_OVERVIEW,
      postData
    );

    let status = response.status;
    let responseData = "";
    console.log(
      "********* reportOverview Saga********",
      JSON.stringify(response)
    );
    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data;
    } else {
      responseData = response.message;
      alert(response.message);
    }

    yield put({
      type: ACTION_TYPES.GET_REPORTS_OVERVIEW,
      payload: responseData,
      statusCode: status,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_REPORTS_OVERVIEW,
      payload: err,
    });
  }
}

//graphByPage
function* graphByPage(action) {
  try {
    console.log("action.isReducerChange >>", action.isReducerChange);
    var postData = action.data;
    let response = yield call(
      requestApiReports,
      "POST",
      API.GET_GRAPH_BY_PAGE,
      postData
    );

    let status = response.status;
    let responseData = "";
    console.log(
      "********* GET GRAPH BY PAGE Saga********",
      JSON.stringify(response)
    );
    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data;
    } else {
      responseData = response.message;
      alert(response.message);
    }

    yield put({
      type: ACTION_TYPES.GET_GRAPH_BY_PAGE,
      payload: responseData,
      statusCode: status,
      isReducerChange: action.isReducerChange,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_GRAPH_BY_PAGE,
      payload: err,
    });
  }
}
function* loaderHandler(data) {
  yield put({
    type: ACTION_TYPES.LOADER,
    payload: data,
  });
}
function* errorHandler(data) {
  yield put({
    type: ACTION_TYPES.ERROR,
    payload: data,
  });
}

function* errorReducerClear() {
  yield put({
    type: ACTION_TYPES.ERROR_CLEAR,
  });
}
function* getWater(action) {
  try {
    console.log("action.data >>", action.data);
    var postData = action.data;
    let response = yield call(
      requestApi,
      "GET",
      API.GET_WATER + postData.userId + "/" + postData.date
    );

    let status = response.data.statusCode;
    let responseData = "";
    console.log("********* responseDataAddBaseTarget ********", responseData);
    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.GET_WATER,
      payload: responseData,
      statusCode: status,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_WATER,
      payload: err,
    });
  }
}
function* updateWater(action) {
  try {
    console.log("action.data >>", action.data);
    var postData = action.data;
    let response = yield call(requestApi, "POST", API.UPDATE_WATER, postData);

    let status = response.data.statusCode;
    let responseData = "";
    console.log("********* responseDataAddBaseTarget ********", responseData);
    if (status == Strings.HTTP_STATUS_CODE_OK) {
      responseData = response.data.data;
    } else {
      responseData = response.data.message;
      alert(response.data.message);
    }

    yield put({
      type: ACTION_TYPES.UPDATE_WATER,
      payload: responseData,
      statusCode: status,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.UPDATE_WATER,
      payload: err,
    });
  }
}
function* circulatoryReport(action) {
  try {
    console.log("action.data >>", action.data);
    var postData = action.data;
    let response = yield call(
      requestApiReports,
      "POST",
      API.GET_CIRCULATORY_REPORT,
      postData
    );

    let status = response.status;
    let responseData = "";
    responseData = response.data;
    // if (status == Strings.HTTP_STATUS_CODE_OK) {

    // } else {
    //   responseData = response.message;
    //   alert(response.message);
    // }

    yield put({
      type: ACTION_TYPES.GET_CIRCULATORY_REPORT,
      payload: responseData,
      statusCode: status,
    });
  } catch (err) {
    alert(JSON.stringify(err));
    console.log("registerUser Error >>> " + JSON.stringify(err));
    yield put({
      type: ACTION_TYPES.GET_CIRCULATORY_REPORT,
      payload: err,
    });
  }
}

//========== Sell product =============

function* rootSaga() {
  yield takeLatest(API_CONST.N_LOGIN_USER, loginUser);
  yield takeLatest(API_CONST.N_REGISTER_USER, registerUser);
  yield takeLatest(
    API_CONST.N_GET_FOOD_DETAILS_NUTRITION,
    getFoodDetailsNutrition
  );
  yield takeLatest(API_CONST.N_GET_FOOD_LIST_NUTRITION, getFoodListNutrition);
  yield takeLatest(API_CONST.N_GET_PROFILE_DETAILS, getProfileDetails);
  yield takeLatest(API_CONST.N_UPDATE_PROFILE_DETAILS, updateProfileDetails);
  yield takeLatest(API_CONST.N_GET_RECOMMEDE_CAL, getRecommededCal);
  yield takeLatest(API_CONST.N_SAVE_NUTRITION_FOOD_DETAILS, saveNutritionFood);
  yield takeLatest(API_CONST.N_GET_FOOD_BY_DATE, getFoodByDate);
  yield takeLatest(API_CONST.N_GET_FOOD_RECENT, getRecentFood);
  yield takeLatest(API_CONST.N_GET_FOOD_FREQUENT, getFrequentFood);
  yield takeLatest(API_CONST.N_UPLOAD_IMAGE, uploadImage);
  yield takeLatest(API_CONST.N_DELETE_FOOD, deleteFood);

  yield takeLatest(API_CONST.N_ERROR, errorHandler);
  yield takeLatest(API_CONST.N_LOADER, loaderHandler);
  yield takeLatest(API_CONST.N_ERROR_CLEAR, errorReducerClear);

  yield takeLatest(API_CONST.N_ADD_BASE_TARGET, addBaseTarget);

  yield takeLatest(API_CONST.N_REPORTS, reports);
  yield takeLatest(API_CONST.N_REPORTS_OVERVIEW, reportOverview);
  yield takeLatest(API_CONST.N_GRAPH_BY_PAGE, graphByPage);
  yield takeLatest(API_CONST.N_UPDATE_WATER, updateWater);
  yield takeLatest(API_CONST.N_GET_WATER, getWater);
  yield takeLatest(API_CONST.N_CIRCULATORY_REPORT, circulatoryReport);
}

export default rootSaga;
