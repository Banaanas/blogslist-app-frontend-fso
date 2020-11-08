import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePageTable from "../Components/Tables/HomePageTable";
import PageHeading from "../Components/PageHeading";
import StyledMainPage from "../Components/StyledComponents/StyledPageMain";
import AddBlogLink from "../Components/AddBlogLink";
import { getBlogsAllUsers } from "../store/slices/blogsAllUsersSlice";
import { Spinner } from "@chakra-ui/core";

const HomePage = () => {
  // ISLOADING - REDUX STATE
  const isLoading = useSelector((state) => state.allUsers.loading);

  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    // Get blogsAllUsers - Dispatch - Redux State
    dispatch(getBlogsAllUsers());
  }, [dispatch]);

  return (
    <StyledMainPage>
      <PageHeading>Favorite Blogs</PageHeading>
      {loggedInUser !== "" ? <AddBlogLink /> : null}
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          aria-busy="true"
        />
      ) : (
        <HomePageTable />
      )}
    </StyledMainPage>
  );
};

export default HomePage;
