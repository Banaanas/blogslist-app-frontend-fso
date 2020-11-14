import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import MyProfilePage from "../pages/MyProfilePage";
import LoginPage from "../pages/LoginPage";
import AllUsersPage from "../pages/AllUsersPage";
import SingleBlogPage from "../pages/SingleBlogPage";
import AddBlogPage from "../pages/AddBlogPage";
import PrivateRoute from "./PrivateRoute";
import SingleUserPage from "../pages/SingleUserPage";
import NotFoundPage from "../pages/NotFoundPage";
import SignUpPage from "../pages/SignUpPage";

const Routes = () => {
  // AUTHENTICATED USER - REDUX STATE
  const isAuthenticated = useSelector(
    (state) => state.userAuthentication.isAuthenticated,
  );

  // Get Location
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      {/* Page Transition - Framer Motion */}
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
          {isAuthenticated ? (
            <motion.div exit="undefined">
              {/* Read the note below */}
              <Redirect to="/my-profile" />
            </motion.div>
          ) : (
            <LoginPage />
          )}
        </Route>

        <Route exact path="/signup">
          {isAuthenticated ? (
            <motion.div exit="undefined">
              {/* Read the note below */}
              <Redirect to="/my-profile" />
            </motion.div>
          ) : (
            <SignUpPage />
          )}
        </Route>

        <PrivateRoute exact path="/add-blog" component={AddBlogPage} />

        <Route>
          <NotFoundPage />
        </Route>

        {/* Framer Motion - React Router Redirect - Issue
          Wrapping the <Redirect /> component into a <motion /> component
          with exit="undefined"
          --> https://github.com/framer/motion/issues/466
        */}
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
