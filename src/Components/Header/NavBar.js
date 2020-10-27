import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actionCreators from "../../store/actions/action-creators";

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
  font-size: 1.8rem;
  text-decoration: none;
  opacity: 0.5;

  :not(:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    opacity: 1;
  }

  /* React Router NavLink attributes automatically an "active" className
  to the active NavLink (when it matches the URL) */
  &.active {
    color: ${({ theme }) => theme.palette.primary.dark};
    opacity: 1;
  }

  @media (min-width: 780px) {
    font-size: 2rem;
  }
`;

const NavBar = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  // LOGOUT - FUNCTION
  const handleLogout = () => {
    window.localStorage.clear(); // Clear localStorage
    window.location.reload(false); // Reload The Page (--> loggedInUser === null)

    dispatch(actionCreators.displayNotification("success", "User Logged Out"));
  };

  return (
    <React.Fragment>
      <StyledNav>
        <StyledNavLink exact to="/">
          HOME
        </StyledNavLink>
        <StyledNavLink to="/myblogs">MY BLOGS</StyledNavLink>
        <StyledNavLink to="/users">ALL USERS</StyledNavLink>
        {loggedInUser !== "" ? (
          <StyledNavLink to="/login" onClick={handleLogout}>
            LOGOUT
          </StyledNavLink>
        ) : (
          <StyledNavLink to="/login">LOGIN</StyledNavLink>
        )}
      </StyledNav>
    </React.Fragment>
  );
};

export default NavBar;
