import actionTypes from "../actions/actions-types";

// ALL USERS
const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS: {
      return action.allUsers;
    }
    default:
      return state;
  }
};

export default allUsersReducer;
