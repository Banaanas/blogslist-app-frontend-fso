import styled from "@emotion/styled";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import userLogout from "../../utils/userLogout";

const StyledNav = styled.nav`
  display: none;

  @media (min-width: 710px) {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    min-width: ${({ isAuthenticated }) =>
      isAuthenticated ? "350px" : "450px"};
    margin-left: auto;
  }

  @media (min-width: 850px) {
    min-width: ${({ isAuthenticated }) =>
      isAuthenticated ? "400px" : "550px"};
  }
`;

const StyledList = styled.ul`
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
  list-style: none;

  li {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  #login-navlink {
    padding: 1rem !important;
    color: ${({ theme }) => theme.colors.primary.dark};
    background-color: ${({ theme }) => theme.colors.secondary.dark} !important;
    border: 3px solid ${({ theme }) => theme.colors.primary.dark} !important;
    border-radius: 5px !important;
  }
`;

// shouldForwardProp set up on both StyledNavLink(Login) and StyledButton(Logout)
const StyledNavLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "isAuthenticated", // isAuthenticated prop is not passed to the DOM
})`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bolder;
  font-size: 1.2rem;
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

  @media (min-width: 850px) {
    font-size: 1.4rem;
  }
`;

// Logout Button ( !== Login -> Link to Login Page)
// shouldForwardProp set up on both StyledNavLink(Login) and StyledButton(Logout)
const StyledButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "isAuthenticated", // isAuthenticated prop is not passed to the DOM
})`
  display: none;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem 0 0.5rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.secondary.dark};
  font-weight: bolder;
  font-size: 1.2rem;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  border: 3px solid ${({ theme }) => theme.colors.primary.dark};
  border-radius: 5px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  @media (min-width: 710px) {
    display: flex;
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

  // USEHISTORY - REACT ROUTER
  const history = useHistory();

  return (
    <>
      <StyledNav isAuthenticated={isAuthenticated}>
        <StyledList>
          <li>
            <StyledNavLink exact to="/">
              HOME
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/my-profile">MY PROFILE</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/users">ALL USERS</StyledNavLink>
          </li>

          {isAuthenticated ? null : (
            <li>
              <StyledNavLink id="login-navlink" to="/login">
                LOGIN
              </StyledNavLink>
            </li>
          )}
        </StyledList>
      </StyledNav>

      {isAuthenticated ? (
        <StyledButton
          onClick={() => {
            userLogout();
            history.push("/login");
          }}
        >
          LOGOUT
        </StyledButton>
      ) : null}
    </>
  );
};

export default NavBar;
