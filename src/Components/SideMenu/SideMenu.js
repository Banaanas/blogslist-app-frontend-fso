import { useRef, useState } from "react";
import { useThrottledFn, useWindowResize } from "beautiful-react-hooks";
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

  // useThrottledFn - CUSTOM HOOK
  // Throttle the callback function to optimize  component performances by
  // preventing too many useless renders
  const onWindowResizeHandler = useThrottledFn(() => {
    // If SSR, Return (because Window is NOT defined on the Server)
    if (typeof window === "undefined") return;

    // Close SideMenu if it was Open
    setWidth(window.innerWidth);
    if (width > 710) setMenuOpen(false);
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
