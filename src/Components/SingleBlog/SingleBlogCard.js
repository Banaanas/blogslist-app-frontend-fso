import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Heading, Link } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { ImBook as BookIcon } from "react-icons/im";
import { FcLike as LikeIcon } from "react-icons/fc";
import { FaPen as WriterIcon } from "react-icons/fa";
import { BiCaretRight as LinkIcon } from "react-icons/bi";

// BLOG CARD
const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 25rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 ${({ theme }) => theme.colors.primary.dark};
`;

// CONTENT BLOG CONTAINER
const StyledBlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 50rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-radius: 10px;
`;

// CONTENT BLOG CONTAINER
const StyledLikesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  font-size: 2rem;
  vertical-align: baseline;
  background-color: ${({ theme }) => theme.colors.primary.light};

  /* LIKE ICON */
  svg {
    margin-left: 0.5rem;
    font-size: 2.5rem;
  }
`;

// BOOK ICON
const StyledBookIcon = styled(BookIcon)`
  margin: 3rem 0;
  font-size: 10rem;
`;

// AUTHOR CONTAINER
const StyledAuthorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 2rem;

  /* AUTHOR'S NAME */
  p {
    margin-left: 1rem;
  }
`;

// LINK CONTAINER
const StyledBlogLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.secondary.dark};
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  :hover {
    text-decoration: none;
    opacity: 0.85;
  }
`;

// LINK ICON
const StyledLinkIcon = styled(LinkIcon)`
  color: ${({ theme }) => theme.colors.secondary.dark};
  font-size: 3rem;
`;

const SingleBlogCard = () => {
  // ALL USERS - REDUX STATE
  const allBlogs = useSelector((state) => state.blogsAllUsers);
  // useRouteMatch - Router
  const match = useRouteMatch("/blogs/:id");
  const blogID = match.params.id;
  const blog = allBlogs.find((blog) => blog.id === blogID);

  // To prevent Rendering of undefined blog and Page Refresh issue
  if (blog === undefined) return null;

  return (
    <React.Fragment>
      <StyledCard>
        <StyledBlogContainer>
          <Heading
            as="h2"
            size="2xl"
            bg="primary.dark"
            color="secondary.dark"
            w="100%"
            textAlign="center"
            p="2rem"
            borderTopRadius="10px"
          >
            {blog.title}
          </Heading>

          <StyledLikesContainer>
            <p>{blog.likes}</p> <LikeIcon />
          </StyledLikesContainer>

          <StyledBookIcon />

          <StyledAuthorContainer>
            <WriterIcon />
            <p>{blog.author}</p>
          </StyledAuthorContainer>

          <StyledBlogLink href={blog.url} isExternal>
            Visit the Blog
            <StyledLinkIcon />
          </StyledBlogLink>
        </StyledBlogContainer>
      </StyledCard>
    </React.Fragment>
  );
};

export default SingleBlogCard;
