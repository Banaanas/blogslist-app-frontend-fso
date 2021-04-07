import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import SignupLink from "../Components/SignupLink";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 25rem;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colors.secondary.dark};
  text-align: center;
`;

const StyledLink = styled(Link)`
  width: 90%;
  margin: 3rem 0;
  padding: 1rem 0;
  color: ${({ signup }) =>
    signup ? "hotpink" : ({ theme }) => theme.colors.primary.dark};
  font-weight: bold;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-radius: 5px;
  transform: scale(1);
  opacity: 1;
  transition: transform, opacity, 200ms ease;

  :hover {
    transform: scale(1.2);
    opacity: 0.85;
  }
`;

const AuthRedirectPage = () => (
  <>
    <StyledContainer>
      <Heading
        size="lg"
        color="secondary.light"
        textTransform="uppercase"
        textAlign=""
      >
        You are not authenticated
      </Heading>
      <StyledLink to="/login">LOGIN</StyledLink>
      <SignupLink />
    </StyledContainer>
  </>
);

export default AuthRedirectPage;
