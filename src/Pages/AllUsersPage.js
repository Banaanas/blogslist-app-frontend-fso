import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageTransition, pageVariants } from "../styles/animations";
import AllUsersPagesTable from "../Components/Tables/AllUsersPagesTable";
import PageHeading from "../Components/PageHeading";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import { getAllUsers } from "../store/slices/allUsersSlice";
import Spinner from "../Components/Spinner";

const AllUsersPage = () => {
  // ISLOADING - REDUX STATE
  const isLoading = useSelector((state) => state.allUsers.isLoading);

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
      {isLoading ? <Spinner /> : <AllUsersPagesTable />}
    </StyledPageMain>
  );
};

export default AllUsersPage;
