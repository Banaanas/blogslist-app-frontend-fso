import React from "react";
import { useSelector } from "react-redux";
import PageHeading from "../Components/PageHeading";
import MyBlogsPageTable from "../Components/Tables/MyBlogsPageTable";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import AddBlogLink from "../Components/AddBlogLink";
import AuthRedirectPage from "../Components/AuthRedirectPage";

const MyBlogsPage = () => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  return (
    <StyledPageMain relativePosition>
      <PageHeading>MY BLOGS</PageHeading>
      {loggedInUser !== "" ? <AddBlogLink /> : null}
      {loggedInUser !== "" ? <MyBlogsPageTable /> : <AuthRedirectPage/>}

    </StyledPageMain>
  );
};

export default MyBlogsPage;
