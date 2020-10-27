import React from "react";

import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import actionCreators from "../store/actions/action-creators";

const StyledTableCell = styled(TableCell)`
  font-weight: bolder;
  background-color: lightgoldenrodyellow;
`;

const HomepageBlogsTable = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // ALL BLOGS ALL USERS - REDUX STATE
  const allBlogs = useSelector((state) => state.blogsAllUsers);

  // ALL BLOGS ALL USERS - REDUX STATE
  const loggedInUser = useSelector((state) => state.loggedInUser);

  // SORT BLOGS IN FUNCTION OF LIKES NUMBER - FUNCTION
  const sortedBlogs = (arr) => arr.sort((a, b) => (a.likes < b.likes ? 1 : -1));

  // ADD LIKE - FUNCTION
  const handleAddLike = (blog) => {
    const updatedLikeNumber = blog.likes + 1;

    const updatedBlog = {
      ...blog,
      likes: updatedLikeNumber,
    };

    try {
      // Like Blog - Dispatch - Redux State
      dispatch(actionCreators.likeBlog(blog.id, updatedBlog));
      if (loggedInUser === "") {
        dispatch(
          actionCreators.displayNotification(
            "error",
            "You must be logged in to vote !",
          ),
        );
      } else {
        dispatch(
          actionCreators.displayNotification(
            "success",
            "One more Like for this blog !",
          ),
        );
      }
    } catch (e) {
      dispatch(
        actionCreators.displayNotification(
          `The blog "${updatedBlog.title}" was already deleted from server`,
        ),
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>BLOG</StyledTableCell>
            <StyledTableCell align="center">AUTHOR</StyledTableCell>
            <StyledTableCell align="center">LIKES</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBlogs(allBlogs).map((blog) => (
            <TableRow key={blog.id}>
              <TableCell component="th" scope="row">
                <Typography component={Link} to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Typography>
              </TableCell>
              <TableCell align="center">{blog.author}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="like"
                  onClick={() => handleAddLike(blog)}
                >
                  <ThumbUpIcon />
                </IconButton>
                {blog.likes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HomepageBlogsTable;
