import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import blogsListLogo from "../../assets/blogslist-logo.svg";

import NavBar from "./NavBar";
import SideMenu from "../SideMenu/SideMenu";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.5rem;
  background-color: ${({ theme }) => theme.colors.secondary.main};
`;

const StyledButton = styled.button`
  width: 4.5rem;
  height: 4.5rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  padding: 0 !important;
  background: url(${blogsListLogo}) no-repeat; /* Logo */
  background-size: contain;
  border: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 710px) {
    height: 5rem;
  }

  &:focus {
    color: ${({ theme }) => theme.colors.primary.dark};
    outline: thin dotted;
  }
`;

const Header = () => (
  <StyledHeader>
    <NavLink to="/">
      <StyledButton type="button" />
    </NavLink>
    <NavBar />
    <SideMenu />
  </StyledHeader>
);

export default Header;
