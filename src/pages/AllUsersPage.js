import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllUsersPagesTable from "../Components/Tables/AllUsersPagesTable";
import PageHeading from "../Components/PageHeading";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { getAllUsers } from "../store/slices/allUsersSlice";
import Spinner from "../Components/Spinner";

const AllUsersPage = () => {
  // ISLOADING - REDUX STATE
  const isLoading = useSelector((state) => state.allUsers.loading);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    // Get blogsAllUsers - Dispatch - Redux State
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <StyledPageMain>
      <PageHeading>All Users</PageHeading>
      {isLoading ? (
        <Spinner />
      ) : (
        <AllUsersPagesTable />
      )}
    </StyledPageMain>
  );
};

export default AllUsersPage;
