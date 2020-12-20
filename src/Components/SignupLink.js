import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLink = styled(Link)`
  width: fit-content;
  margin: 2rem 1rem 1rem 0;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bolder;
  font-size: 1rem !important;
  text-align: center;
  background-color: floralwhite;
  border: 5px solid ${({ theme }) => theme.colors.primary.dark};
  border-radius: 10px;
  transform: scale(1);
  transition: transform 200ms ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.85;
  }
`;

const SignupLink = () => <StyledLink to="/signup">SIGN UP</StyledLink>;

export default SignupLink;
