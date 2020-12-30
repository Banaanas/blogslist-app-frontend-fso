import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { AiFillHome as HomeIcon } from "react-icons/ai";
import { FaBloggerB as MyBlogsIcon } from "react-icons/fa";
import {
  IoIosPeople as AllUsersIcon,
  IoMdLogIn as LogInIcon,
  IoMdLogOut as LogOutIcon,
} from "react-icons/io";
import { Divider } from "@chakra-ui/react";
import userLogout from "../../utils/userLogout";

const StyledMenu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  max-width: calc(710px - 25%);
  min-height: 100%;
  overflow: hidden;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  box-shadow: -3px 0 10px 0 #555;
  transform: ${({ isMenuOpen }) =>
    isMenuOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform, 300ms ease;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  text-decoration: none;
  opacity: 0.6;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
    opacity: 1;
  }

  /* React Router NavLink attributes automatically an "active" className
  to the active NavLink (when it matches the URL) */
  &.active {
    color: ${({ theme }) => theme.colors.primary.dark};
    opacity: 1;
  }

  /* Icons */
  span {
    margin-right: 1rem;
  }
`;

const NavBar = ({ isMenuOpen, setMenuOpen, menuID }) => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const isAuthenticated = useSelector(
    (state) => state.userAuthentication.isAuthenticated,
  );

  const isMenuDisplayed = isMenuOpen ? true : false;
  const tabIndex = isMenuDisplayed ? 0 : -1;

  // Handle Close Side Menu - FUNCTION
  const handleCloseMenu = () => {
    setMenuOpen(false);

    // Remove Background Blur Effect
    const mainElement = document.querySelector("main");
    mainElement.style.filter = "blur(0)";

    // Enable Scroll again
    document.body.style.overflow = "visible";
  };

  // React Swipe Event Handler - Close SideMenu when onSwipedLeft
  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () => handleCloseMenu(),
  });

  return (
    <StyledMenu
      isMenuOpen={isMenuOpen}
      id={menuID}
      aria-hidden={!isMenuDisplayed}
      {...handlers}
    >
      <StyledNav>
        <StyledNavLink
          exact
          to="/"
          tabIndex={tabIndex}
          onClick={handleCloseMenu}
        >
          <span aria-hidden="true">
            <HomeIcon />
          </span>
          Home
        </StyledNavLink>

        <StyledNavLink
          to="/my-profile"
          tabIndex={tabIndex}
          onClick={handleCloseMenu}
        >
          <span aria-hidden="true">
            <MyBlogsIcon />
          </span>
          My Profile
        </StyledNavLink>

        <StyledNavLink
          to="/users"
          tabIndex={tabIndex}
          onClick={handleCloseMenu}
        >
          <span aria-hidden="true">
            <AllUsersIcon />
          </span>
          All Users
        </StyledNavLink>

        <Divider borderColor="primary.dark" />

        {isAuthenticated ? (
          <StyledNavLink
            to="/login"
            tabIndex={tabIndex}
            onClick={() => {
              handleCloseMenu();
              userLogout();
            }}
          >
            <Divider borderColor="red.900" />
            <span aria-hidden="true">
              <LogOutIcon />
            </span>
            LOGOUT
          </StyledNavLink>
        ) : (
          <StyledNavLink
            to="/login"
            tabIndex={tabIndex}
            onClick={handleCloseMenu}
          >
            <span aria-hidden="true">
              <LogInIcon />
            </span>
            LOGIN
          </StyledNavLink>
        )}
        <Divider borderColor="primary.dark" />
      </StyledNav>
    </StyledMenu>
  );
};

export default NavBar;
