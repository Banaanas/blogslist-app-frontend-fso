import { configureStore } from "@reduxjs/toolkit";

import allUsersReducer from "./slices/allUsersSlice";
import loggedInSingleUserReducer from "./slices/loggedInUserSlice";
import blogsAllUsersReducer from "./slices/blogsAllUsersSlice";
import blogsSingleUserReducer from "./slices/blogsSingleUserSlice";

// REDUX STORE
const store = configureStore({
  reducer: {
    allUsers: allUsersReducer,
    loggedInUser: loggedInSingleUserReducer,
    blogsAllUsers: blogsAllUsersReducer,
    blogsSingleUser: blogsSingleUserReducer,
  },
});

export default store;
