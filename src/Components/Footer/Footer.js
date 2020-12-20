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
  padding-top: .5rem;
  background-color: ${({ theme }) => theme.colors.secondary.main};
`;

const Footer = () => (
    <StyledFooter>
      <ContactIcons />
      <NavBar />
      <SubFooter />
    </StyledFooter>
  );

export default Footer;
