import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "@chakra-ui/react";
import { getBlogsAllUsers } from "../store/slices/blogsAllUsersSlice";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { pageTransition, pageVariants } from "../styles/animations";
import HomePageTable from "../Components/Tables/HomePageTable";
import PageHeading from "../Components/PageHeading";
import AddBlogLink from "../Components/AddBlogLink";
import Spinner from "../Components/Spinner";

const HomePage = () => {
  // ISLOADING - REDUX STATE
  const isLoading = useSelector((state) => state.blogsAllUsers.isLoading);

  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const isAuthenticated = useSelector(
    (state) => state.userAuthentication.isAuthenticated,
  );

  // ALL BLOGS ALL USERS - REDUX STATE
  const allBlogs = useSelector((state) => state.blogsAllUsers.data);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // SIDE MENU - REDUX STATE
  const isMenuOpen = useSelector((state) => state.sideMenu.isMenuOpen);

  // USEEFFECT
  useEffect(() => {
    // Get blogsAllUsers - Dispatch - Redux State
    dispatch(getBlogsAllUsers());
  }, [dispatch]);

  // To prevent Rendering of undefined allBlogs and Page Refresh issue
  if (allBlogs === undefined) return null;

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
        isMenuOpen={isMenuOpen}
      >
        <PageHeading>Top Blogs</PageHeading>
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
      style={{ width: "100%" }}
      isMenuOpen={isMenuOpen}
    >
      <PageHeading>Top Blogs</PageHeading>
      {isAuthenticated ? <AddBlogLink /> : null}
      {isLoading === false && allBlogs.length > 0 ? <HomePageTable /> : null}
      {isLoading === false && allBlogs.length === 0 ? (
        <Heading
          as="h2"
          size="md"
          p={5}
          bg="primary.dark"
          textAlign="center"
          textTransform="uppercase"
          borderRadius={5}
        >
          No Blogs yet
        </Heading>
      ) : null}
    </StyledPageMain>
  );
};

export default HomePage;
