import React from "react";
import styled from "@emotion/styled";

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

const MyBlogsPage = () => {
  return (
    <StyledMain>
      <h1>My Blogs</h1>
    </StyledMain>
  );
};

export default MyBlogsPage;
