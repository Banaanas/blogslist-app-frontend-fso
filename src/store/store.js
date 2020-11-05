import { configureStore } from "@reduxjs/toolkit";

import loggedInSingleUserReducer from "./reducers/loggedInSingleUserReducer";
import notificationReducer from "./reducers/notificationReducer";
import blogsAllUsersReducer from "./reducers/blogsAllUsersReducer";
import blogsSingleUserReducer from "./reducers/blogsSingleUserReducer";
import allUsersReducer from "./reducers/allUsersReducer";

// REDUX STORE

const store = configureStore({
  reducer: {
    allUsers: allUsersReducer,
    loggedInUser: loggedInSingleUserReducer,
    blogsAllUsers: blogsAllUsersReducer,
    blogsSingleUser: blogsSingleUserReducer,
    notificationMessage: notificationReducer,
  },
});

export default store;
