import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import displayToast from "../src/utils/displayToast";

const Blog = ({ blog }) => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // VISIBLE - STATE
  const [visible, setVisible] = useState(false);

  // TOGGLE VISIBLE STATE - FUNCTION
  const toggleVisible = () => setVisible(!visible);

  // Chakra-UI Toast
  const toast = useToast();

  // ADD LIKE - FUNCTION
  const handleAddLike = () => {
    const updatedLikeNumber = blog.likes + 1;

    const updatedBlog = {
      ...blog,
      likes: updatedLikeNumber,
    };

    try {
      // Like Blog - Dispatch - Redux State
      dispatch(actionCreators.likeBlog(blog.id, updatedBlog));
      toast({
        title: "Login Successful.",
        description: "You are connected to the Application.",
        status: "success",
      });
    } catch (e) {
      displayToast(
        "Login Successful.",
        "You are connected to the Application.",
        "success",
      );
    }
  };

  // DELETE BLOG - FUNCTION
  const handleDeleteBlog = () => {
    try {
      // Delete Blog - Dispatch - Redux State
      dispatch(actionCreators.deleteBlog(blog.id));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  // INLINE STYLE
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  // BLOG DETAILS - FUNCTION
  const blogDetails = () => (
    <React.Fragment>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>View</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisible}>Hide</button>
        <div>{blog.author} </div>
        <div>{blog.url} </div>
        <div>
          Likes : {blog.likes}
          <button onClick={handleAddLike}>+1</button>
        </div>
        <button onClick={handleDeleteBlog}>REMOVE</button>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <h4 data-cy="blog-title">{blog.title}</h4>
      {blogDetails()}
    </div>
  );
};

// PROPTYPES
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

// PROPTYPES
Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default Blog;
