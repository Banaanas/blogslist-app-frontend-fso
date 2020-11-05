import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  max-width: 350px;
  padding: .5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bolder;
  font-size: 1rem;
  text-decoration: none;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  /* React Router NavLink attributes automatically an "active" className
  to the active NavLink (when it matches the URL) */
  &.active {
    color: ${({ theme }) => theme.colors.primary.dark};
    opacity: 1;
  }
`;

const NavBar = () => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  return (
    <StyledNav>
      <StyledNavLink exact to="/">
        HOME
      </StyledNavLink>
      <StyledNavLink to="/my-profile">MY PROFILE</StyledNavLink>
      <StyledNavLink to="/users">ALL USERS</StyledNavLink>
      {loggedInUser !== "" ? null : (
        <StyledNavLink to="/login">LOGIN</StyledNavLink>
      )}
    </StyledNav>
  );
};

export default NavBar;
