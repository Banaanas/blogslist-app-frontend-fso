import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import actionCreators from "../store/actions/action-creators";

const Blog = ({ blog }) => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // VISIBLE - STATE
  const [visible, setVisible] = useState(false);

  // TOGGLE VISIBLE STATE - FUNCTION
  const toggleVisible = () => setVisible(!visible);

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
    } catch (e) {
      dispatch(
        actionCreators.displayNotification(
          "warning",
          `The blog "${updatedBlog.title}" was already deleted from server`,
        ),
      );
    }
  };

  // DELETE BLOG - FUNCTION
  const handleDeleteBlog = () => {
    try {
      // Delete Blog - Dispatch - Redux State
      dispatch(actionCreators.deleteBlog(blog.id));

      dispatch(
        actionCreators.displayNotification(
          "success",
          "The blog has been deleted from server",
        ),
      );
    } catch (e) {
      dispatch(
        actionCreators.displayNotification(
          "warning",
          "Something wrong happened. Please refresh the page",
        ),
      );
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
