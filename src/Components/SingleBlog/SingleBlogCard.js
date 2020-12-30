import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Heading, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ImBook as BookIcon } from "react-icons/im";
import { FcLike as LikeIcon } from "react-icons/fc";
import { FaPen as WriterIcon } from "react-icons/fa";
import { BiCaretRight as LinkIcon } from "react-icons/bi";
import { getBlogsAllUsers } from "../../store/slices/blogsAllUsersSlice";

// BLOG CARD
const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 15rem;
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
  max-width: 30rem;
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
  font-size: 1.2rem;
  vertical-align: baseline;
  background-color: ${({ theme }) => theme.colors.primary.light};

  /* LIKE ICON */
  svg {
    margin-left: 0.2rem;
    font-size: 1.4rem;
  }
`;

// BOOK ICON
const StyledBookIcon = styled(BookIcon)`
  margin: 2rem 0;
  font-size: 6rem;
`;

// AUTHOR CONTAINER
const StyledAuthorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 1.2rem;

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
  padding: 1rem 0;
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
  font-size: 2rem;
`;

const SingleBlogCard = () => {
  // ALL USERS - REDUX STATE
  const allBlogs = useSelector((state) => state.blogsAllUsers.data);
  // useRouteMatch - Router
  const match = useRouteMatch("/blogs/:id");
  const blogID = match.params.id;
  const blog = allBlogs.find((b) => b.id === blogID);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogsAllUsers());
  }, [dispatch]);

  // To prevent Rendering of undefined blog and Page Refresh issue
  if (blog === undefined) return null;

  return (
    <>
      <StyledCard>
        <StyledBlogContainer>
          <Heading
            as="h2"
            size="xl"
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
    </>
  );
};

export default SingleBlogCard;
