import { useEffect, useRef, useState } from "react";
import FocusLock from "react-focus-lock";
import styled from "@emotion/styled";
import Burger from "./Burger";
import useOnClickOutside from "../../custom-hooks/useOnClickOutside";
import NavBar from "./NavBar";

const StyledDiv = styled.div`
  @media (min-width: 710px) {
    display: none;
  }
`;
const SideMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const DOMRef = useRef(null);
  const menuId = "main-menu";

  // Close Side SideMenu when click outside the Ref- custom Hook
  useOnClickOutside(DOMRef, () => setMenuOpen(false));

  useEffect(() => {
    // handleResize - FUNCTION
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth > 710) setMenuOpen(false);
    };

    // Add Event Listener - Resize
    window.addEventListener("resize", handleResize);

    // Remove Event Listener - useEffect Clean Up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <StyledDiv ref={DOMRef}>
        <FocusLock disabled={!isMenuOpen}>
          <Burger
            openMenu={isMenuOpen}
            setOpenMenu={setMenuOpen}
            menuID={menuId}
          />
          <NavBar
            isMenuOpen={isMenuOpen}
            setMenuOpen={setMenuOpen}
            menuID={menuId}
          />
        </FocusLock>
      </StyledDiv>
    </>
  );
};

export default SideMenu;
