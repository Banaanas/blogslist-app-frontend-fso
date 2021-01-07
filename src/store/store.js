import { configureStore } from "@reduxjs/toolkit";
import allUsersReducer from "./slices/allUsersSlice";
import authenticatedUserReducer from "./slices/authenticationSlice";
import blogsAllUsersReducer from "./slices/blogsAllUsersSlice";
import blogsSingleUserReducer from "./slices/blogsSingleUserSlice";
import sideMenuReducer from "./slices/sideMenuSlice";

// REDUX STORE
const store = configureStore({
  reducer: {
    allUsers: allUsersReducer,
    blogsAllUsers: blogsAllUsersReducer,
    blogsSingleUser: blogsSingleUserReducer,
    userAuthentication: authenticatedUserReducer,
    sideMenu: sideMenuReducer,
  },
});

export default store;
