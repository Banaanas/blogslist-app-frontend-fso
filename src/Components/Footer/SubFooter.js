import React from "react";
import styled from "@emotion/styled";
import { FaOm as AumIcon } from "react-icons/fa";

const StyledAumIcon = styled(AumIcon)`
  margin: 0 0.5rem;
  color: #EC3956;
  font-size: 1.5rem;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 0;
  background-color: ${({ theme }) => theme.palette.primary.dark};
`;

const SubFooter = () => (
  <React.Fragment>
    <StyledSpan>
      CyrilO | 2020 | Crafted with
      <StyledAumIcon />
      in France
    </StyledSpan>
  </React.Fragment>
);

export default SubFooter;
