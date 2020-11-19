import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import userLogout from "../../utils/userLogout";

const StyledNav = styled.nav`
  display: none;
  flex-direction: row;
  justify-content: space-around;
  width: 55%;
  min-width: 35rem;
  padding: 1rem;

  @media (min-width: 710px) {
    display: flex;
  }
`;

const StyledNavLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "isAuthenticated", // isAuthenticated prop is not passed to the DOM
})`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bolder;
  font-size: 1.2rem;
  text-decoration: none;
  opacity: 0.6;

  /* Login NavLink */
  &:last-child {
    padding: 1rem;
    color: ${({ isAuthenticated }) =>
      isAuthenticated
        ? ({ theme }) => theme.colors.secondary.dark
        : ({ theme }) => theme.colors.primary.dark};
    background-color: ${({ isAuthenticated }) =>
      isAuthenticated
        ? ({ theme }) => theme.colors.primary.dark
        : ({ theme }) => theme.colors.secondary.dark};
    border: 3px solid ${({ theme }) => theme.colors.primary.dark};
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
    font-size: 1.4rem;
  }
`;

const NavBar = () => {
  // ISAUTHENTICATED - REDUX STATE - (Without Blogs Array)
  const isAuthenticated = useSelector(
    (state) => state.userAuthentication.isAuthenticated,
  );

  return (
    <>
      <StyledNav>
        <StyledNavLink exact to="/">
          HOME
        </StyledNavLink>
        <StyledNavLink to="/my-profile">MY PROFILE</StyledNavLink>
        <StyledNavLink to="/users">ALL USERS</StyledNavLink>
        {isAuthenticated ? (
          <StyledNavLink
            isAuthenticated={isAuthenticated}
            to="/login"
            onClick={userLogout}
          >
            LOGOUT
          </StyledNavLink>
        ) : (
          <StyledNavLink isAuthenticated={isAuthenticated} to="/login">
            LOGIN
          </StyledNavLink>
        )}
      </StyledNav>
    </>
  );
};

export default NavBar;
