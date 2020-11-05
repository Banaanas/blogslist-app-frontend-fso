import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import actionCreators from "./store/actions/action-creators";
import blogService from "./services/blogs";
import userService from "./services/users";
import Routes from "./routes/routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const App = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // APP - USEEFFECT - LOCALSTORAGE - REDUX STATE
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      "loggedBlogslistappUser",
    );

    // Get all Users - Dispatch - Redux State
    dispatch(actionCreators.getAllUsers());

    // Get blogsAllUsers - Dispatch - Redux State
    dispatch(actionCreators.getBlogsAllUsers());

    // If no User logged in, Return
    if (!loggedUserJSON) return;

    const user = JSON.parse(loggedUserJSON);

    // Set Token for Axios Requests
    blogService.setToken(user.token);
    userService.setToken(user.token);

    // Get loggedInUser - Dispatch - Redux State
    dispatch(actionCreators.getLoggedInUser(user));

    // Get allBlogsSingleUser - Dispatch - Redux State
    dispatch(actionCreators.getBlogsSingleUser(user.id));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <Routes />
      <Footer />
    </React.Fragment>
  );
};

export default App;
