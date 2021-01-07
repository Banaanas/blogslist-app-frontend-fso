import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { NavLink, useHistory } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { AiFillHome as HomeIcon } from "react-icons/ai";
import { CgProfile as MyProfileIcon } from "react-icons/cg";
import {
  IoIosPeople as AllUsersIcon,
  IoMdLogIn as LogInIcon,
  IoMdLogOut as LogOutIcon,
} from "react-icons/io";
import { Divider } from "@chakra-ui/react";
import userLogout from "../../utils/userLogout";
import enablePageScroll from "../../utils/enablePageScroll";
import { closeSideMenu } from "../../store/slices/sideMenuSlice";

const StyledMenu = styled.div`
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
const StyledList = styled.ul`
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

  /* Icons */
  span {
    margin-right: 1rem;
  }
`;

const NavBar = ({ menuID }) => {
  // LOGGED IN USER - REDUX STATE - (Without Blogs Array)
  const isAuthenticated = useSelector(
    (state) => state.userAuthentication.isAuthenticated,
  );

  // SIDE MENU - REDUX STATE
  const isMenuOpen = useSelector((state) => state.sideMenu.isMenuOpen);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // USEHISTORY - REACT ROUTER
  const history = useHistory();

  const isMenuDisplayed = isMenuOpen ? true : false;
  const tabIndex = isMenuDisplayed ? 0 : -1;

  // Handle Close Side Menu - FUNCTION
  const handleCloseMenu = () => {
    // Close SideMenu - Dispatch - Redux State
    dispatch(closeSideMenu());

    // Remove Background Blur Effect and enable Scroll again
    enablePageScroll();
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
      <nav>
        <StyledList>
          <li>
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
          </li>
          <li>
            <StyledNavLink
              to="/my-profile"
              tabIndex={tabIndex}
              onClick={handleCloseMenu}
            >
              <span aria-hidden="true">
                <MyProfileIcon />
              </span>
              My Profile
            </StyledNavLink>
          </li>
          <li>
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
          </li>

          {isAuthenticated ? null : (
            <li>
              <Divider borderColor="primary.dark" />
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
              <Divider borderColor="primary.dark" />
            </li>
          )}
        </StyledList>

        {isAuthenticated ? (
          <>
            <Divider borderColor="primary.dark" />

            <StyledButton
              tabIndex={tabIndex}
              onClick={() => {
                handleCloseMenu();
                userLogout();
                history.push("/login");
              }}
            >
              <span aria-hidden="true">
                <LogOutIcon />
              </span>
              LOGOUT
            </StyledButton>
            <Divider borderColor="primary.dark" />
          </>
        ) : null}
      </nav>
    </StyledMenu>
  );
};

export default NavBar;
