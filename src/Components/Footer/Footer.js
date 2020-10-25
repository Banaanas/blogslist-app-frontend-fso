import React from "react";
import styled from "@emotion/styled";

import ContactIcons from "./ContactIcons";
import NavBar from "./NavBar";
import SubFooter from "./SubFooter";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  padding-top: 1rem;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ContactIcons />
      <NavBar />
      <SubFooter />
    </StyledFooter>
  );
};

export default Footer;
