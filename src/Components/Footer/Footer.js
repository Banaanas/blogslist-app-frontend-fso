import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import NavBar from "./NavBar";
import SubFooter from "./SubFooter";
import ContactIcons from "./ContactIcons";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 3rem;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  filter: ${({ isMenuOpen }) => (isMenuOpen ? "blur(20px)" : "blur(0)")};
  transition: filter, 300ms ease;
`;

const Footer = () => {
  // SIDE MENU - REDUX STATE
  const isMenuOpen = useSelector((state) => state.sideMenu.isMenuOpen);

  return (
    <StyledFooter isMenuOpen={isMenuOpen}>
      <NavBar />
      <SubFooter />
    </StyledFooter>
  );
};

export default Footer;
