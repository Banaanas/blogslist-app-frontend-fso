import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "@chakra-ui/core";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { getBlogsSingleUser } from "../store/slices/blogsSingleUserSlice";
import { pageTransition, pageVariants } from "../styles/animations";
import PageHeading from "../Components/PageHeading";
import MyProfilePageTable from "../Components/Tables/MyProfilePageTable";
import AddBlogLink from "../Components/AddBlogLink";
import AuthRedirectPage from "../Components/AuthRedirectPage";
import Spinner from "../Components/Spinner";

const MyProfilePage = () => {
  // AUTHENTICATED USER - REDUX STATE - (Without Blogs Array)
  const authenticateUser = useSelector(
    (state) => state.userAuthentication.user,
  );

  // ISAUTHENTICATED USER - REDUX STATE - (Without Blogs Array)

  const isAuthenticated = useSelector(
    (state) => state.userAuthentication.isAuthenticated,
  );

  // ISLOADING - REDUX STATE
  const isLoading = useSelector((state) => state.allUsers.isLoading);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    // Return if User is not Authenticated (to avoid console warning for Rejected Request)
    if (authenticateUser === null) return;

    // Get allBlogsSingleUser - Dispatch - Redux State
    dispatch(getBlogsSingleUser(authenticateUser.id));
  }, [dispatch, authenticateUser]);

  // ALL BLOGS SINGLE USER - REDUX STATE
  const allBlogsSingleUser = useSelector((state) => state.blogsSingleUser.data);

  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      {authenticateUser ? (
        <PageHeading>{authenticateUser.name}</PageHeading>
      ) : null}
      {isLoading === true ? <Spinner /> : null}
      {isAuthenticated && isLoading === false ? (
        <React.Fragment>
          <AddBlogLink />
          {isAuthenticated && allBlogsSingleUser.length === 0 ? (
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
            <MyProfilePageTable />
          )}
        </React.Fragment>
      ) : null}
      {isAuthenticated === false ? <AuthRedirectPage /> : null}
    </StyledPageMain>
  );
};

export default MyProfilePage;
