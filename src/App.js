import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import blogService from "./services/blogs";
import userService from "./services/users";
import Routes from "./routes/routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { getLoggedInUser } from "./store/slices/loggedInUserSlice";
import { getAllUsers } from "./store/slices/allUsersSlice";
import { getBlogsAllUsers } from "./store/slices/blogsAllUsersSlice";

const App = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // APP - USEEFFECT - LOCALSTORAGE - REDUX STATE
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      "loggedBlogslistappUser",
    );

    // If no User logged in, Return
    if (!loggedUserJSON) return;

    const user = JSON.parse(loggedUserJSON);

    // Set Token for Axios Requests
    blogService.setToken(user.token);
    userService.setToken(user.token);

    // Get loggedInUser - Dispatch - Redux State
    dispatch(getLoggedInUser(user));

    // Get all Users - Dispatch - Redux State
    dispatch(getAllUsers());

    // Get all Users - Dispatch - Redux State
    dispatch(getBlogsAllUsers());
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
