import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import HomePage from "../Pages/HomePage";
import MyProfilePage from "../Pages/MyProfilePage";
import LoginPage from "../Pages/LoginPage";
import AllUsersPage from "../Pages/AllUsersPage";
import SingleBlogPage from "../Pages/SingleBlogPage";
import AddBlogPage from "../Pages/AddBlogPage";
import PrivateRoute from "./PrivateRoute";
import SingleUserPage from "../Pages/SingleUserPage";
import NotFoundPage from "../Pages/NotFoundPage";
import SignUpPage from "../Pages/SignUpPage";

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
        Wrapping the <Redirect /> Component into a <motion /> Component
        with exit="undefined"
        --> https://github.com/framer/motion/issues/466
        Especially, the bug happens for private route, when, after going to the
        AddBlogPage, you logout. */}
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
