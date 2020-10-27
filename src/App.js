import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Notification from "./Components/Notification/Notification";
import SingleUser from "./Components/SingleUser.js/SingleUser";
import Togglable from "./Components/Tooglable";

import actionCreators from "./store/actions/action-creators";
import blogService from "./services/blogs";
import userService from "./services/users";

import Routes from "./routes/routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SideMenu from "./Components/SideMenu/SideMenu";

import appTheme from "./styles/appTheme";


// TODO - Comments
// TODO - Redux Toolkit
// TODO - Sync state between multiple tabs - Redux Persist - Redux-State-Sync - Multiple Tabs
// https://medium.com/front-end-weekly/multi-tab-logout-in-react-redux-4715f071c7fa

const App = () => {
  console.log(appTheme);
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);
  // NOTIFICATION Message TO DISPLAY - REDUX STATE
  const notificationMessage = useSelector(
    (state) => state.notificationMessage.message,
  );
  const severity = useSelector((state) => state.notificationMessage.severity);
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // APP - USEEFFECT - LOCALSTORAGE
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      "loggedBlogslistappUser",
    );

    try {
      // Get all Users - Dispatch - Redux State
      dispatch(actionCreators.getAllUsers());

      // Get blogsAllUsers - Dispatch - Redux State
      dispatch(actionCreators.getBlogsAllUsers());
    } catch (e) {
      dispatch(
        actionCreators.displayNotification(
          "warning",
          "Something Wrong Happened with Data",
        ),
      );
    }

    // If no User logged in, Return
    if (!loggedUserJSON) return;

    const user = JSON.parse(loggedUserJSON);

    // Set Token for Axios Requests
    blogService.setToken(user.token);
    userService.setToken(user.token);

    try {
      // Get loggedInUser - Dispatch - Redux State
      dispatch(actionCreators.loggedInUser(user));

      // Get allBlogsSingleUser - Dispatch - Redux State
      dispatch(actionCreators.getBlogsSingleUser(user.id));
    } catch (e) {
      dispatch(actionCreators.displayNotification("warning", "Login Failed"));
    }
  }, [dispatch]);

  // LOGOUT - FUNCTION
  const handleLogout = () => {
    window.localStorage.clear(); // Clear localStorage
    window.location.reload(false); // Reload The Page (--> loggedInUser === null)

    dispatch(actionCreators.displayNotification("success", "User Logged Out"));
  };

  // USER PAGE - FUNCTION
  const userPage = () => (
    <React.Fragment>
      <p>
        {loggedInUser.name} logged in
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </p>

      <Togglable buttonLabel={"NEW BLOG"}>
        <SingleUser logOut={handleLogout} user={loggedInUser} />
      </Togglable>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Header className="header" />
      <SideMenu/>
      {notificationMessage ? (
        <Notification message={notificationMessage} severity={severity} />
      ) : null}
      <Routes />
      <Footer/>
    </React.Fragment>
  );
};

export default App;
