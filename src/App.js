import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import blogService from "./services/blogs";
import userService from "./services/users";
import Routes from "./routes/routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { getAuthenticatedUser } from "./store/slices/AuthenticationSlice";
import { getAllUsers } from "./store/slices/allUsersSlice";
import { getBlogsAllUsers } from "./store/slices/blogsAllUsersSlice";
import GithubBanner from "./Components/GithubBanner";
import userLogout from "./utils/userLogout";
import displayToast from "./utils/displayToast";
import { useHistory } from "react-router-dom";

const App = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // USEHISTORY - REACT ROUTER
  const history = useHistory();

  // APP - USEEFFECT - STORAGE EVENT
  useEffect(() => {
    // LOGIN / LOGOUT - MULTI TABS
    // Only works when 2 or more Tabs are opened
    window.addEventListener("storage", (event) => {
      // Login
      if (event.key !== null) {
        // Display Success Toast
        displayToast(
          "Login Successful.",
          "You are connected to the Application.",
          "success",
        );

        // Reload Page - (To get state synchronized)
        window.location.reload(false);
      }
      // Logout
      if (event.key === null) {
        userLogout();
        // Redirect to LoginPage
        history.push("/login");
        // Toast Display is handled by userLogout()
      }
    });
  }, [history, dispatch]);

  // APP - USEEFFECT - LOCALSTORAGE - REDUX STATE
  useEffect(() => {
    const authenticatedUserJSON = window.localStorage.getItem(
      "authenticatedUser",
    );

    // If User not Authenticated, Return
    if (!authenticatedUserJSON) return;

    const user = JSON.parse(authenticatedUserJSON);

    // Set Token for Axios Requests
    blogService.setToken(user.token);
    userService.setToken(user.token);

    // Get Authenticated User - Dispatch - Redux State
    dispatch(getAuthenticatedUser(user));

    // Get all Users - Dispatch - Redux State
    dispatch(getAllUsers());

    // Get all Users - Dispatch - Redux State
    dispatch(getBlogsAllUsers());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <GithubBanner />
      <Routes />
      <Footer />
    </React.Fragment>
  );
};

export default App;
