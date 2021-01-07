import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import ContactIcons from "./ContactIcons";
import NavBar from "./NavBar";
import SubFooter from "./SubFooter";

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 3rem;
  padding-top: 0.5rem;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  filter: ${({ isMenuOpen }) => (isMenuOpen ? "blur(20px)" : "blur(0)")};
  transition: filter, 300ms ease;
`;

const Footer = () => {
  // SIDE MENU - REDUX STATE
  const isMenuOpen = useSelector((state) => state.sideMenu.isMenuOpen);

  return (
    <StyledFooter isMenuOpen={isMenuOpen}>
      <ContactIcons />
      <NavBar />
      <SubFooter />
    </StyledFooter>
  );
};

export default Footer;
