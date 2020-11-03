import React from "react";
import { useSelector } from "react-redux";
import PageHeading from "../Components/PageHeading";
import MyBlogsPageTable from "../Components/Tables/MyBlogsPageTable";
import AddBlogLink from "../Components/AddBlogLink";
import AuthRedirectPage from "../Components/AuthRedirectPage";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";

const MyProfilePage = () => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  return (
    <StyledPageMain relativePosition>
      <PageHeading>{loggedInUser.name}</PageHeading>
      {loggedInUser !== "" ? <AddBlogLink /> : null}
      {loggedInUser !== "" ? <MyBlogsPageTable /> : <AuthRedirectPage/>}
    </StyledPageMain>
  );
};

export default MyProfilePage;
