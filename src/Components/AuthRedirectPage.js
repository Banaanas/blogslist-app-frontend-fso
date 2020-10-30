import React from "react";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/core";
import styled from "@emotion/styled";

const GlobalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 40rem;
  height: 20rem;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colors.secondary.dark};
  text-align: center;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  /* Links */
  a {
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    font-weight: bold;
    text-align: center;
    opacity: 1;
    transition: opacity, scale, 200ms ease;

    :hover {
      width: 100%;
      opacity: 0.85;
    }

    &:first-of-type {
      color: ${({ theme }) => theme.colors.primary.dark};
      background-color: ${({ theme }) => theme.colors.secondary.light};
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-of-type {
      color: ${({ theme }) => theme.colors.primary.dark};
      background-color: ${({ theme }) => theme.colors.secondary.main};
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  /* Horizontal Divider */
  span {
    height: 100%;
    border-left: solid 5px ${({ theme }) => theme.colors.secondary.dark};
  }
`;

const AuthRedirectPage = () => {
  return (
    <React.Fragment>
      <GlobalContainer>
        <Heading
          size="lg"
          color="secondary.light"
          textTransform="uppercase"
          textAlign=""
        >
          You are not authenticated
        </Heading>
        <LinksContainer>
          <Link to="/login">LOGIN</Link>
          <span />
          <Link to="/signin">SIGN IN</Link>
        </LinksContainer>
      </GlobalContainer>
    </React.Fragment>
  );
};

export default AuthRedirectPage;
