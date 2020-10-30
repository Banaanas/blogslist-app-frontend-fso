import React from "react";
import { useSelector } from "react-redux";
import HomePageTable from "../Components/Tables/HomePageTable";
import PageHeading from "../Components/PageHeading";
import StyledMainPage from "../Components/StyledComponents/StyledPageMain";
import AddBlogLink from "../Components/AddBlogLink";

const HomePage = () => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  return (
    <StyledMainPage relativePosition>
      <PageHeading>Favorite Blogs</PageHeading>
      {loggedInUser !== "" ? <AddBlogLink /> : null}
      <HomePageTable />
    </StyledMainPage>
  );
};

export default HomePage;
