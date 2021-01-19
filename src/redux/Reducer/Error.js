import ACTION_TYPES from "../Actions/ActionTypes";

const INITIAL_STATE = {
  errorDetails: { statusCode: null, message: null, data: null },
  status: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.ERROR:
      return { ...state, errorDetails: action.payload, status: true };
    case ACTION_TYPES.ERROR_CLEAR:
      return {
        errorDetails: { statusCode: null, message: null, data: null },
        status: false,
      };
    default:
      return state;
  }
};
