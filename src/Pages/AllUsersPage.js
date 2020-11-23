import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageTransition, pageVariants } from "../styles/animations";
import AllUsersPagesTable from "../Components/Tables/AllUsersPagesTable";
import PageHeading from "../Components/PageHeading";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { getAllUsers } from "../store/slices/allUsersSlice";
import Spinner from "../Components/Spinner";
import { Heading } from "@chakra-ui/react";
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

  // USEEFFECT
  useEffect(() => {
    // Get blogsAllUsers - Dispatch - Redux State
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      <PageHeading>All Users</PageHeading>
      {isLoading ? <Spinner /> : null}

      {allUsers.length > 0 ? (
        <AllUsersPagesTable />
      ) : (
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
      )}
    </StyledPageMain>
  );
};

export default AllUsersPage;
