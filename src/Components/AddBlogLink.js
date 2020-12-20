import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLink = styled(Link)`
  margin: 1rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bolder;
  font-size: 1rem;
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

const AddBlogLink = () => <StyledLink to="/add-blog">ADD BLOG</StyledLink>;

export default AddBlogLink;
