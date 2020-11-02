import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionCreators from "./store/actions/action-creators";
import blogService from "./services/blogs";
import userService from "./services/users";
import Notification from "./Components/Notification/Notification";
import Routes from "./routes/routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const App = () => {
  // NOTIFICATION Message TO DISPLAY - REDUX STATE
  const notificationMessage = useSelector(
    (state) => state.notificationMessage.message,
  );
  const severity = useSelector((state) => state.notificationMessage.severity);
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // APP - USEEFFECT - LOCALSTORAGE - REDUX STATE
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
      dispatch(
        actionCreators.displayNotification(
          "warning",
          "Something went wrong with the server",
        ),
      );
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header className="header" />
      {notificationMessage ? (
        <Notification message={notificationMessage} severity={severity} />
      ) : null}
      <Routes />
      <Footer />
    </React.Fragment>
  );
};

export default App;
