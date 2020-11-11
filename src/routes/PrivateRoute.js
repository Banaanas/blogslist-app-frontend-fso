import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

// If Page Access or Content is sensitive, it would be MANDATORY to check
// if Token is valid with Server Side process.
// (the actual implementation only checks if there is one Token,
// without verifying its validity)

const PrivateRoute = ({ path, component, ...rest }) => {
  const Component = component;

  const isTokenVerified = window.localStorage.getItem("loggedBlogslistappUser");
  const location = useLocation();

  return isTokenVerified ? (
    <Route path={path} {...rest}>
      <Component {...rest} />
    </Route>
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: {
          from: location,
        },
      }}
    />
  );
};

export default PrivateRoute;
