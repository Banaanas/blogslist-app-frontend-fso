import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Redirect, useRouteMatch } from "react-router-dom";
import SingleUserBlogsList from "../SingleUser.js/SingleUserBlogsList";

const UserProfile = () => {
  // ALL USERS - REDUX STATE
  const allUsers = useSelector((state) => state.allUsers);

  // useRouteMatch - Router
  const match = useRouteMatch("/users/:id");
  const matchID = match.params.id;

  const singleUser = allUsers.find((user) => user.id === matchID);

  // If Refresh on User's Page, then Redirect to UserS Page
  // (because Redux State has been refreshed)
  if (allUsers.length === 0) return <Redirect to="/users" />;

  return (
    <React.Fragment>
      <Typography display={"block"} variant={"overline"}>
        {singleUser.name}
      </Typography>
      <Typography display={"block"} variant={"caption"} fontStyle="italic">
        {singleUser.username}
      </Typography>
      <SingleUserBlogsList singleUser={singleUser} />
    </React.Fragment>
  );
};

export default UserProfile;
