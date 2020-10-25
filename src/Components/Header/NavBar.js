import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledNav = styled.nav`
  display: none;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
  padding: 1rem;

  @media (min-width: 710px) {
    display: flex;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: bolder;
  font-size: 2rem;
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
  const loggedInUser = useSelector((state) => state.loggedInUser);

  console.log(loggedInUser === "");
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default NavBar;
