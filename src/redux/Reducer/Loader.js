import ACTION_TYPES from "../Actions/ActionTypes";

const INITIAL_STATE = {
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
