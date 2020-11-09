import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "@chakra-ui/core";
import PageHeading from "../Components/PageHeading";
import MyBlogsPageTable from "../Components/Tables/MyBlogsPageTable";
import AddBlogLink from "../Components/AddBlogLink";
import AuthRedirectPage from "../Components/AuthRedirectPage";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { getBlogsSingleUser } from "../store/slices/blogsSingleUserSlice";
import Spinner from "../Components/Spinner";

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

  // ALL BLOGS SINGLE USER - REDUX STATE
  const allBlogsSingleUser = useSelector((state) => state.blogsSingleUser.data);

  return (
    <StyledPageMain>
      <PageHeading>{loggedInUser.name}</PageHeading>
      {isLoading === true ? <Spinner /> : null}
      {isLoading === false && loggedInUser !== "" ? (
        <React.Fragment>
          <AddBlogLink />
          {allBlogsSingleUser.length === 0 && loggedInUser !== "" ? (
            <Heading
              as="h2"
              size="md"
              p={5}
              bg="primary.dark"
              textAlign="center"
              textTransform="uppercase"
              borderRadius={5}
            >
              You have no Blog in your List yet
            </Heading>
          ) : (
            <MyBlogsPageTable />
          )}
        </React.Fragment>
      ) : (
        <AuthRedirectPage />
      )}
    </StyledPageMain>
  );
};

export default MyProfilePage;
