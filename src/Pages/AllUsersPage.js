import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "@chakra-ui/react";
import { pageTransition, pageVariants } from "../styles/animations";
import AllUsersPagesTable from "../Components/Tables/AllUsersPagesTable";
import PageHeading from "../Components/PageHeading";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { getAllUsers } from "../store/slices/allUsersSlice";
import Spinner from "../Components/Spinner";
import SignupLink from "../Components/SignupLink";

const AllUsersPage = () => {
  // ISLOADING - REDUX STATE
  const isLoading = useSelector((state) => state.allUsers.isLoading);

  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const isAuthenticated = useSelector(
    (state) => state.userAuthentication.isAuthenticated,
  );

  //  USERS - REDUX STATE
  const allUsers = useSelector((state) => state.allUsers.data);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // SIDE MENU - REDUX STATE
  const isMenuOpen = useSelector((state) => state.sideMenu.isMenuOpen);

  // USEEFFECT
  useEffect(() => {
    // Get blogsAllUsers - Dispatch - Redux State
    dispatch(getAllUsers());
  }, [dispatch]);

  // If isLoading
  if (isLoading === true) {
    return (
      <StyledPageMain
        variants={pageVariants}
        transition={pageTransition}
        initial="initial"
        animate="animate"
        exit="initial"
        style={{ width: "100%" }}
      >
        <PageHeading>All Users</PageHeading>
        <Spinner />
      </StyledPageMain>
    );
  }

  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
      isMenuOpen={isMenuOpen}
    >
      <PageHeading>All Users</PageHeading>
      {isLoading === false && allUsers.length > 0 ? (
        <AllUsersPagesTable />
      ) : null}
      {isLoading === false && allUsers.length === 0 ? (
        <>
          <Heading
            as="h2"
            size="md"
            p={5}
            bg="primary.dark"
            textAlign="center"
            textTransform="uppercase"
            borderRadius={5}
          >
            No User registered yet
          </Heading>
          {isAuthenticated ? null : <SignupLink />}
        </>
      ) : null}
    </StyledPageMain>
  );
};

export default AllUsersPage;
