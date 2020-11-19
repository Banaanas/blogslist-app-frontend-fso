import styled from "@emotion/styled";
import { VscGithubInverted as GithubIcon } from "react-icons/vsc";
import { IoMdMail as MailIcon } from "react-icons/io";
import { ImLinkedin as LinkedInIcon } from "react-icons/im";
import { HiOutlineGlobeAlt as PersonalWebsiteIcon } from "react-icons/hi";

const StyledSocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  a {
    margin: 0 0.5rem;
  }

  svg {
    color: ${({ theme }) => theme.colors.primary.dark};
    font-size: 1.5rem;
    background-color: ${({ theme }) => theme.colors.secondary.main};
    transform: scale(1);
    opacity: .9;
    transition: transform, opacity, 200ms ease;
  }

  svg:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const ContactIcons = () => (
  <StyledSocialIconsContainer>
    <a
      aria-label="Personal Website"
      href="https://cyrilo.dev"
      target="_blank"
      rel="noopener noreferrer"
    >
      <PersonalWebsiteIcon />
    </a>{" "}
    <a
      aria-label="Github Profile Link"
      href="https://github.com/Banaanas"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubIcon />
    </a>
    <a aria-label="Cyrilo Dev Mail" href="mailto:cyrilodev@gmail.com">
      <MailIcon />
    </a>
    <a
      aria-label="LinkedIn Link"
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkedInIcon />
    </a>
  </StyledSocialIconsContainer>
);

export default ContactIcons;
