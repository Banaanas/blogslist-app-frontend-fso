import React from "react";
import styled from "@emotion/styled";
import AllUsersTable from "../Components/AllUsersTable";
import PageHeading from "../Components/PageHeading";

const StyledMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: auto;
  margin-top: 8rem; /* To match the Fixed Header Height */
  font-size: 2rem;
`;

const AllUsersPage = () => {
  return (
    <StyledMain>
      <PageHeading>
        All Users
      </PageHeading>
      <AllUsersTable />
    </StyledMain>
  );
};

export default AllUsersPage;
