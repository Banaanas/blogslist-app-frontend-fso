import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MyProfilePage from "../pages/MyProfilePage";
import LoginPage from "../pages/LoginPage";
import AllUsersPage from "../pages/AllUsersPage";
import SingleBlogPage from "../pages/SingleBlogPage";
import SingleUser from "../Components/SingleUser.js/SingleUser";
import AddBlogPage from "../pages/AddBlogPage";
import PrivateRoutes from "./PrivateRoutes";
import SingleUserPage from "../pages/SingleUserPage";

const Routes = () => {
  // Get localStorage
  const isTokenVerified = window.localStorage.getItem("loggedBlogslistappUser");

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>

      <Route exact path="/my-profile">
        <MyProfilePage />
      </Route>

      <Route exact path="/users">
        <AllUsersPage />
      </Route>

      <Route exact path="/users/:id">
        <SingleUserPage />
      </Route>

      <Route path="/blogs/:id">
        <SingleBlogPage />
      </Route>

      <Route exact path="/login">
        {isTokenVerified !== null ? <Redirect to="/" /> : <LoginPage />}
      </Route>

      {/* Private Routes - Can be multiple */}
      <PrivateRoutes>
        <Route path="/add-blog">
          <AddBlogPage />
        </Route>
      </PrivateRoutes>

      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
