import { configureStore } from "@reduxjs/toolkit";

import allUsersReducer from "./slices/allUsersSlice";
import authenticatedUserReducer from "./slices/AuthenticationSlice";
import blogsAllUsersReducer from "./slices/blogsAllUsersSlice";
import blogsSingleUserReducer from "./slices/blogsSingleUserSlice";

// REDUX STORE
const store = configureStore({
  reducer: {
    allUsers: allUsersReducer,
    userAuthentication: authenticatedUserReducer,
    blogsAllUsers: blogsAllUsersReducer,
    blogsSingleUser: blogsSingleUserReducer,
  },
});

export default store;
