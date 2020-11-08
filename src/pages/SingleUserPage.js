import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import SingleUserCard from "../Components/SingleUser.js/SingleUserCard";
import BackButton from "../Components/BackButton";

const SingleUserPage = () => {
  // ALL USERS - REDUX STATE
  const allUsers = useSelector((state) => state.allUsers.data);
  // useRouteMatch - Router
  const match = useRouteMatch("/users/:id");

  const userID = match.params.id;
  const user = allUsers.find((user) => user.id === userID);
  // To prevent Rendering of undefined blog and Page Refresh issue
  if (user === undefined) return null;

  return (
    <StyledPageMain>
      <BackButton />
      <SingleUserCard />
    </StyledPageMain>
  );
};

export default SingleUserPage;
