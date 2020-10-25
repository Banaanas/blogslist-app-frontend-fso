import actionTypes from "../actions/actions-types";

// NOTIFICATION REDUCER

const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_NOTIFICATION: {
      const { severity, message } = action.notification;
      return {
        severity,
        message,
      };
    }

    case actionTypes.HIDE_NOTIFICATION: {
      return "";
    }

    default:
      return state;
  }
};

export default notificationReducer;
