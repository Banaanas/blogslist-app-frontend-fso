import { Redirect, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

/* * PRIVATE ROUTE  * */

// Redirect if User not authorized

// If Page Access or Content is sensitive, it would be MANDATORY to check
// if Token is valid with Server Side process.
// (the actual implementation only checks if there is one Token,
// without verifying its validity)

const PrivateRoute = ({ path, component, ...rest }) => {
  const isTokenVerified = window.localStorage.getItem("authenticatedUser");
  const Component = component;
  const location = useLocation();

  return isTokenVerified ? (
    <Route path={path} {...rest}>
      <Component {...rest} />
    </Route>
  ) : (
    <motion.div exit="undefined">
      <Redirect
        to={{
          pathname: "/",
          state: {
            from: location.pathname,
          },
        }}
      />
    </motion.div>
    /* Framer Motion - React Router Redirect - Issue
      Wrapping the <Redirect /> Component into a <motion /> Component
      with exit="undefined"
      --> https://github.com/framer/motion/issues/466
      Especially, the bug happens for private route, when, after going to the
      AddBlogPage, you logout. */
  );
};

export default PrivateRoute;
