import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";
import HomepageBlogsTable from "../Components/HomepageBlogsTable";

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

const StyledTypography = styled(Typography)`
  font-weight: bolder;

  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

const HomePage = () => {
  return (
    <StyledMain>
      <StyledTypography variant={"h2"} align={"center"}>
        Your Favorite Blogs
      </StyledTypography>
      <HomepageBlogsTable />
    </StyledMain>
  );
};

export default HomePage;
