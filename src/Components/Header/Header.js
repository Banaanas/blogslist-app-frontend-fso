import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "emotion-theming";
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
/*
  box-shadow: 0 0 10px 0 ${({ theme }) => theme.colors.primary.dark};
*/
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
  const [boxShadow, setboxShadow] = useState("none");

  // Emotion Theme
  const theme = useTheme();

  // Throttle Scroll Event with requestAnimationFrame() - Performance Issue
  useEffect(() => {
    const handleScroll = () => {
      // Header Drop Shadow when Scroll - No Drop Shadow on Top
      if (window.pageYOffset > 1) {
        setboxShadow(`0 0 10px 0 ${theme.colors.primary.dark}`);
      } else {
        setboxShadow("none");
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, [theme.colors.primary.dark]);

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
