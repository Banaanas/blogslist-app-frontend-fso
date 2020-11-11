import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "../pages/HomePage";
import MyProfilePage from "../pages/MyProfilePage";
import LoginPage from "../pages/LoginPage";
import AllUsersPage from "../pages/AllUsersPage";
import SingleBlogPage from "../pages/SingleBlogPage";
import AddBlogPage from "../pages/AddBlogPage";
import PrivateRoute from "./PrivateRoute";
import SingleUserPage from "../pages/SingleUserPage";

const Routes = () => {
  // Get localStorage
  const isTokenVerified = window.localStorage.getItem("loggedBlogslistappUser");

  // Get Location
  const location = useLocation();

  return (
    /*
       Page Transition - Framer Motion
*/
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
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
        <PrivateRoute exact path="/add-blog" component={AddBlogPage} />

        <motion.div exit="undefined">
          <Redirect to="/" />
        </motion.div>
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
