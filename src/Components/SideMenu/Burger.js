import React from "react";
import styled from "@emotion/styled";

const StyledSideMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 0.8rem;
  padding: 0 !important;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  &:focus {
    color: ${({ theme }) => theme.colors.primary.dark};
    outline: thin dotted;
  }

  &:hover {
    opacity: 0.8;
  }

  span {
    width: ${({ openMenu }) => (openMenu ? "3.8rem" : "4rem")};
    height: 1.5rem;
    background-color: ${({ theme }) => theme.colors.primary.dark};
    border-radius: 10px;
    transform-origin: left center;
    transition: transform, width, 300ms ease-out;
  }

  span:first-of-type {
    transform: ${({ openMenu }) =>
      openMenu ? "translateX(8px) rotate(45deg)" : "rotate(0)"};
  }
  span:nth-of-type(3n) {
    transform: ${({ openMenu }) =>
      openMenu ? "translateX(8px) rotate(-45deg)" : "rotate(0)"};
  }

  span:nth-of-type(2n) {
    width: ${({ openMenu }) => (openMenu ? "0" : "4rem")};
    margin: 0.5rem 0;
  }
`;

const Burger = ({ openMenu, setOpenMenu, menuID }) => {
  const isExpanded = openMenu ? true : false;

  return (
    <StyledSideMenuButton
      openMenu={openMenu}
      onClick={() => setOpenMenu(!openMenu)}
      aria-label="Toggle SideMenu"
      aria-expanded={isExpanded}
      aria-controls={menuID}
    >
      <span />
      <span />
      <span />
    </StyledSideMenuButton>
  );
};

export default Burger;
