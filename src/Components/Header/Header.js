import { useState } from "react";
import { useThrottledFn, useWindowScroll } from "beautiful-react-hooks";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import blogsListLogo from "../../assets/blogslist-logo.svg";

import NavBar from "./NavBar";
import SideMenu from "../SideMenu/SideMenu";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.5rem;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  box-shadow: ${(props) => props.boxShadow};
`;

const StyledButton = styled.button`
  width: 4.5rem;
  height: 4.5rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  padding: 0 !important;
  background: url(${blogsListLogo}) no-repeat; /* Logo */
  background-size: contain;
  border: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 710px) {
    height: 5rem;
  }

  &:focus {
    color: ${({ theme }) => theme.colors.primary.dark};
    outline: thin dotted;
  }
`;

const Header = () => {
  // STATE - HEADER CSS BOX-SHADOW
  const [boxShadow, setBoxShadow] = useState("none");

  // Emotion Theme
  const theme = useTheme();

  // useThrottledFn - CUSTOM HOOK
  // Throttle the callback function to optimize  component performances by
  // preventing too many useless renders
  const onWindowScrollHandler = useThrottledFn(() => {
    // Header Drop Shadow when Scroll - No Drop Shadow on Top
    if (window.pageYOffset > 1) {
      setBoxShadow(`0 0 10px 0 ${theme.colors.primary.dark}`);
      console.log(window.pageYOffset);
    } else {
      setBoxShadow("none");
    }
  }, 200);

  // useWindowScroll - CUSTOM HOOK
  // Scroll Event Listener (Add AND Cleanup Event)
  useWindowScroll(onWindowScrollHandler);

  return (
    <StyledHeader boxShadow={boxShadow}>
      <NavLink to="/">
        <StyledButton type="button" />
      </NavLink>
      <NavBar />
      <SideMenu />
    </StyledHeader>
  );
};

export default Header;
