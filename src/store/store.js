import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import loggedInSingleUserReducer from "./reducers/loggedInSingleUserReducer";
import notificationReducer from "./reducers/notificationReducer";
import blogsAllUsersReducer from "./reducers/blogsAllUsersReducer";
import blogsSingleUserReducer from "./reducers/blogsSingleUserReducer";
import allUsersReducer from "./reducers/allUsersReducer";

// REDUX STORE

// Root Reducer
const rootReducer = combineReducers({
  allUsers: allUsersReducer,
  loggedInUser: loggedInSingleUserReducer,
  blogsAllUsers: blogsAllUsersReducer,
  blogsSingleUser: blogsSingleUserReducer,
  notificationMessage: notificationReducer,
});

// Store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
