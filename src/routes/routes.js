import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import MyBlogsPage from "../pages/MyBlogsPage";
import LoginPage from "../pages/LoginPage";
import AllUsersPage from "../pages/AllUsersPage";
import SingleBlogPage from "../pages/SingleBlogPage";
import SingleUser from "../Components/SingleUser.js/SingleUser";
import AddBlogPage from "../pages/AddBlogPage";

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
        <SingleUser />
      </Route>

      <Route path="/blogs/:id">
        <SingleBlogPage />
      </Route>

      <Route exact path="/login">
        {loggedInUser !== "" ? <Redirect to="/" /> : <LoginPage />}
      </Route>

      <Route exact path="/add-blog">
        <AddBlogPage />
      </Route>

      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
