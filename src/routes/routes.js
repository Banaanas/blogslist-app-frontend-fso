import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import MyBlogsPage from "../pages/MyBlogsPage";
import LoginPage from "../pages/LoginPage";
import UserProfile from "../Components/UserProfile/UserProfile";
import SingleBlog from "../Components/SingleBlog/SingleBlog";
import AllUsersPage from "../pages/AllUsersPage";

const Routes = () => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>

      <Route exact path="/myblogs">
        <MyBlogsPage />
      </Route>

      <Route exact path="/users">
        <AllUsersPage />
      </Route>

      <Route path="/users/:id">
        <UserProfile />
      </Route>

      <Route path="/blogs/:id">
        <SingleBlog />
      </Route>

      <Route exact path="/login">
        {loggedInUser !== "" ? <Redirect to="/" /> : <LoginPage />}
      </Route>

      <Route exact path="/login">
        {loggedInUser !== "" ? <Redirect to="/" /> : <LoginPage />}
      </Route>

      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
