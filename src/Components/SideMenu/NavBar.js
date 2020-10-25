import React from "react";
import styled from "@emotion/styled";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { AiFillHome as HomeIcon } from "react-icons/ai";
import { FaBloggerB as MyBlogsIcon } from "react-icons/fa";
import {
  IoIosPeople as AllUsersIcon,
  IoMdLogIn as LoginIcon,
} from "react-icons/io";

const StyledMenu = styled.nav`
  position: fixed;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 0 2rem;
  text-align: left;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  transform: ${({ isMenuOpen }) =>
    isMenuOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform, 300ms ease;

  a {
    span {
      margin-right: 1rem;
      font-size: 4rem;
    }
  }
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  text-decoration: none;
  opacity: 0.5;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
    opacity: 1;
  }

  /* React Router NavLink attributes automatically an "active" className
  to the active NavLink (when it matches the URL) */
  &.active {
    color: ${({ theme }) => theme.palette.primary.dark};
    opacity: 1;
  }
`;

const NavBar = ({ isMenuOpen, setMenuOpen, menuID }) => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const isMenuDisplayed = isMenuOpen ? true : false;
  const tabIndex = isMenuDisplayed ? 0 : -1;

  // React Swipe Event Handler - Close SideMenu when onSwipedLeft
  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () => setMenuOpen(false),
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
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true">
            <HomeIcon />
          </span>
          Home
        </StyledNavLink>

        <StyledNavLink
          to="/myblogs"
          tabIndex={tabIndex}
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true">
            <MyBlogsIcon />
          </span>
          My Blogs
        </StyledNavLink>

        <StyledNavLink
          to="/users"
          tabIndex={tabIndex}
          onClick={() => setMenuOpen(false)}
        >
          <span aria-hidden="true">
            <AllUsersIcon />
          </span>
          All Users
        </StyledNavLink>

        {loggedInUser !== "" ? null : (
          <StyledNavLink
            to="/login"
            tabIndex={tabIndex}
            onClick={() => setMenuOpen(false)}
          >
            <span aria-hidden="true">
              <LoginIcon />
            </span>
            Login
          </StyledNavLink>
        )}
      </StyledNav>
    </StyledMenu>
  );
};

export default NavBar;
