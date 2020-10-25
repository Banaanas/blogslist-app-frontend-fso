import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import FocusLock from "react-focus-lock";
import Burger from "./Burger";
import useOnClickOutside from "../../custom-hooks/useOnClickOutside";
import NavBar from "./NavBar";

const StyledRefDiv = styled.div`
`;

const SideMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const DOMRef = useRef(null);
  const menuId = "main-menu";

  // Close Side SideMenu when click outside the Ref- custom Hook
  useOnClickOutside(DOMRef, () => setMenuOpen(false));

  return (
    <React.Fragment>
      <StyledRefDiv ref={DOMRef}>
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
      </StyledRefDiv>
    </React.Fragment>
  );
};

export default SideMenu;
