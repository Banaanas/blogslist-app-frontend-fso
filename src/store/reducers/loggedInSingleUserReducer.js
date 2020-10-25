import actionTypes from "../actions/actions-types";

// LOGGED IN SINGLE USER REDUCER
const loggedInSingleUserReducer = (state = "", action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGED_IN: {
      return action.user;
    }
    default:
      return state;
  }
};

export default loggedInSingleUserReducer;
