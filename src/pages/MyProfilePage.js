import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../Components/PageHeading";
import MyBlogsPageTable from "../Components/Tables/MyBlogsPageTable";
import AddBlogLink from "../Components/AddBlogLink";
import AuthRedirectPage from "../Components/AuthRedirectPage";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { getBlogsSingleUser } from "../store/slices/blogsSingleUserSlice";
import { Spinner } from "@chakra-ui/core";
import AllUsersPagesTable from "../Components/Tables/AllUsersPagesTable";

const MyProfilePage = () => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  // ISLOADING - REDUX STATE
  const isLoading = useSelector((state) => state.allUsers.loading);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    // Get allBlogsSingleUser - Dispatch - Redux State
    dispatch(getBlogsSingleUser(loggedInUser.id));
  }, [dispatch, loggedInUser.id]);

  return (
    <StyledPageMain>
      <PageHeading>{loggedInUser.name}</PageHeading>
      {isLoading && (loggedInUser !== "") ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          aria-busy="true"
        />
      ) : null}
      {isLoading === false && loggedInUser !== "" ? (
        <React.Fragment>
          <AddBlogLink /> <MyBlogsPageTable />
        </React.Fragment>
      ) : (
        <AuthRedirectPage />
      )}
    </StyledPageMain>
  );
};

export default MyProfilePage;
