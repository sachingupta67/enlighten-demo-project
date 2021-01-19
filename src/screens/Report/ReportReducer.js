import ACTION_TYPES from "../../redux/Actions/ActionTypes";
const INITIAL_STATE = {
  getReportsRes: "",
  statusCodeReports: "",

  getReportsOverviewRes: "",
  statusCodeReportsOverview: "",

  getGraphByPageDetailRes: "",
  getGraphByPageRes: "",
  statusCodeGraphByPage: "",
  getCirculatoryRepost: "",
};
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_REPORTS:
      return {
        ...state,
        getReportsRes: action.payload,
        statusCodeReports: action.statusCode,
      };

    case ACTION_TYPES.GET_REPORTS_OVERVIEW:
      return {
        ...state,
        getReportsOverviewRes: action.payload,
        statusCodeReportsOverview: action.statusCode,
      };

    case ACTION_TYPES.GET_GRAPH_BY_PAGE:
      if (action.payload) {
        if (action.isReducerChange === true) {
          console.log("IF11", action.isReducerChange);
          console.log("IF");
          return {
            ...state,
            getGraphByPageDetailRes: action.payload,
            statusCodeGraphByPage: action.statusCode,
          };
        } else {
          console.log("ELSE");
          return {
            ...state,
            getGraphByPageRes: action.payload,
            statusCodeGraphByPage: action.statusCode,
          };
        }
      }
      break;

    case ACTION_TYPES.CLEAR_GRAPH_BY_PAGE:
      return {
        ...state,
        getGraphByPageRes: "",
        statusCodeGraphByPage: "",
      };
    case ACTION_TYPES.GET_CIRCULATORY_REPORT:
      return {
        ...state,
        getCirculatoryRepost: action.payload,
        // statusCodeReportsOverview: action.statusCode,
      };

    default:
      return state;
  }
};
