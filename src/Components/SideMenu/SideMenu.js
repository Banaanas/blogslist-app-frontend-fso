import { useState, useEffect, useRef } from "react";
import { useThrottledFn, useWindowResize } from "beautiful-react-hooks";
import FocusLock from "react-focus-lock";
import styled from "@emotion/styled";
import Burger from "./Burger";
import useOnClickOutside from "../../custom-hooks/useOnClickOutside";
import NavBar from "./NavBar";
import removeMenuEffects from "../../utils/removeMenuEffects";

const StyledDiv = styled.div`
  @media (min-width: 710px) {
    display: none;
  }
`;

const SideMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Width initially set to 0 instead of window.innerWidth
  // Because, if SSR, Window is NOT defined on the Node.js Server
  const [width, setWidth] = useState(0);

  // Defined Width when Component is mounted
  useEffect(() => {
    setWidth(window.innerWidth);
  });

  const DOMRef = useRef(null);
  const menuId = "side-menu";

  // Close Side SideMenu when click outside the Ref- custom Hook
  useOnClickOutside(DOMRef, () => {
    setMenuOpen(false);

    // Remove Background Blur Effect
    const mainElement = document.querySelector("main");
    mainElement.style.filter = "blur(0)";

    // Enable Scroll again
    document.body.style.overflow = "visible";
  });

  // useThrottledFn - CUSTOM HOOK
  // Throttle the callback function to optimize component performances by
  // preventing too many useless renders
  const onWindowResizeHandler = useThrottledFn(() => {
    // If SSR, Return (because Window is NOT defined on the Node.js Server)
    if (typeof window === "undefined") return;

    // Set Width
    setWidth(width);

    // Close SideMenu if it was Open,
    if (window.innerWidth > 710) {
      setMenuOpen(false);

      // Remove Background Blur Effect and enable Scroll again
      removeMenuEffects();
    }
  }, 200);

  // useWindowResize - CUSTOM HOOK
  // Resize Event Listener (Add AND Cleanup Event)
  useWindowResize(onWindowResizeHandler);

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
