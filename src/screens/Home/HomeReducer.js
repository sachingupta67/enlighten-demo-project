import ACTION_TYPES from "../../redux/Actions/ActionTypes";
const INITIAL_STATE = {
  statusCodeFoodDate: "",
  getFoodByDateRes: null,
  getDeleteFoodRes: null,
  statusCodeDeleteFood: "",

  addBaseTargetRes: null,
  statusCodeAddBaseTarget: "",
  updateWaterRes: "",
  statusCodeUpdateWater: "",
  getWaterRes: "",
  statusCodeGetWater: "",
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_FOOD_BY_DATE:
      // console.log()
      return {
        ...state,
        getFoodByDateRes: action.payload,
        statusCodeFoodDate: action.statusCode,
      };

    // case ACTION_TYPES.CLEAR_AUTH:
    //   return INITIAL_STATE;
    case ACTION_TYPES.DELETE_FOOD:
      // console.log()
      return {
        ...state,
        getDeleteFoodRes: action.payload,
        statusCodeDeleteFood: action.statusCode,
      };

    case ACTION_TYPES.CLEAR_FOOD_RES:
      return {
        ...state,
        getDeleteFoodRes: "",
        statusCodeDeleteFood: "",
      };

    case ACTION_TYPES.ADD_BASE_TARGET:
      return {
        ...state,
        addBaseTargetRes: action.payload,
        statusCodeAddBaseTarget: action.statusCode,
      };

    case ACTION_TYPES.UPDATE_WATER:
      return {
        ...state,
        updateWaterRes: action.payload,
        statusCodeUpdateWater: action.statusCode,
      };

    case ACTION_TYPES.GET_WATER:
      return {
        ...state,
        getWaterRes: action.payload,
        statusCodeGetWater: action.statusCode,
      };

    case ACTION_TYPES.CLEAR_WATER:
      return {
        ...state,
        getWaterRes: "",
        statusCodeGetWater: "",
      };
    default:
      return state;
  }
};
