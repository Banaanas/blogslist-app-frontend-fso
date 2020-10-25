import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";
import AllUsersTable from "../Components/AllUsersTable";

const StyledMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-top: 8rem; /* To match the Fixed Header Height */
  padding: 4rem;
  font-size: 2rem;
`;

const AllUsersPage = () => {
  return (
    <StyledMain>
      <Typography variant="h2">All Users</Typography>
      <AllUsersTable />
    </StyledMain>
  );
};

export default AllUsersPage;
