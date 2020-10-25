import React from "react";
import styled from "@emotion/styled";
import { NavLink, Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../../pages/LoginPage";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  max-width: 350px;
  padding: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: bolder;
  font-size: 1rem;
  text-decoration: none;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  /* React Router NavLink attributes automatically an "active" className
  to the active NavLink (when it matches the URL) */
  &.active {
    color: ${({ theme }) => theme.palette.primary.dark};
    opacity: 1;
  }
`;

const NavBar = () => {
  // USELOCATION - REACT ROUTER
  // React Router NavLink attributes automatically an "active" className
  // to the active NavLink (when it matches the URL)
  // It is possible to make a NavLink active when a URL doesn't match, with the
  // isActive function and Regex filter (with the different routes).
  // Example : Click on Resume Link --> Route to Resume (/resume) + activeClassName
  // for About Tab (/about). This choice, because Resume is a part of the About submenu
  const { pathname } = useLocation();

  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  return (
    <StyledNav>
      <StyledNavLink exact to="/">
        HOME
      </StyledNavLink>
      <StyledNavLink to="/myblogs">MY BLOGS</StyledNavLink>
      <StyledNavLink to="/users">ALL USERS</StyledNavLink>
      {loggedInUser !== "" ? null : (
        <StyledNavLink to="/login">LOGIN</StyledNavLink>
      )}
    </StyledNav>
  );
};

export default NavBar;
