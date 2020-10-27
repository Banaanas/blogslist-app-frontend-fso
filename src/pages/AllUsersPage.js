import React from "react";
import styled from "@emotion/styled";
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
  font-size: 2rem;
`;

const AllUsersPage = () => {
  return (
    <StyledMain>
      <h1>All Users</h1>
      <AllUsersTable />
    </StyledMain>
  );
};

export default AllUsersPage;
