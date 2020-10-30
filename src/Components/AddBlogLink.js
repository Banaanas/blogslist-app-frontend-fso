import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLink = styled(Link)`
  margin: 2rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bolder;
  font-size: 2rem;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  border: 5px solid ${({ theme }) => theme.colors.primary.dark};
  border-radius: 10px;
  transform: scale(1);
  transition: transform 200ms ease;

  &:hover {
    transform: scale(1.1);
    opacity: 0.85;
  }
`;

const AddBlogLink = () => {
  return <StyledLink to="/add-blog">ADD BLOG</StyledLink>;
};

export default AddBlogLink;
