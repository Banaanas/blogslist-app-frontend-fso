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
  min-width: 40rem;
  padding: 1rem;

  @media (min-width: 710px) {
    display: flex;
  }
`;

const StyledNavLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "loggedIn", // loggedIn prop is not passed to the DOM
})`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bolder;
  font-size: 1.8rem;
  text-decoration: none;
  opacity: 0.6;

  &:last-child {
    padding: 1rem;
    color: ${(props) =>
      props.loggedIn
        ? ({ theme }) => theme.colors.secondary.dark
        : ({ theme }) => theme.colors.primary.dark};
    background-color: ${(props) =>
      props.loggedIn
        ? ({ theme }) => theme.colors.primary.dark
        : ({ theme }) => theme.colors.secondary.dark};
    border-radius: 5px;
  }

  &:hover {
    opacity: 1;
  }

  /* React Router NavLink attributes automatically an "active" className
  to the active NavLink (when it matches the URL) */
  &.active {
    color: ${({ theme }) => theme.colors.primary.dark};
    opacity: 1;
  }

  @media (min-width: 850px) {
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
        <StyledNavLink to="/my-blogs">MY BLOGS</StyledNavLink>
        <StyledNavLink to="/users">ALL USERS</StyledNavLink>
        {loggedInUser !== "" ? (
          <StyledNavLink
            loggedIn={loggedInUser}
            to="/login"
            onClick={handleLogout}
          >
            LOGOUT
          </StyledNavLink>
        ) : (
          <StyledNavLink loggedIn={loggedInUser} to="/login">
            LOGIN
          </StyledNavLink>
        )}
      </StyledNav>
    </React.Fragment>
  );
};

export default NavBar;
