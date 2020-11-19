import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import displayToast from "../utils/displayToast";
import displayServerErrorToast from "../utils/displayServerErrorToast";
import { likeBlog } from "../store/slices/blogsAllUsersSlice";
import { deleteBlogSingleUser } from "../store/slices/blogsSingleUserSlice";

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

    const updatedBlogObject = {
      ...blog,
      likes: updatedLikeNumber,
    };

    try {
      // Like Blog - Dispatch - Redux State
      dispatch(likeBlog(updatedBlogObject, updatedLikeNumber));
      displayToast(
        "🙂 Successful Vote 👍🏼",
        "One more Like for this Blog.",
        "success",
      );
    } catch (e) {
      displayServerErrorToast();
    }
  };

  // DELETE BLOG - FUNCTION
  const handleDeleteBlog = () => {
    try {
      // Delete Blog - Dispatch - Redux State
      dispatch(deleteBlogSingleUser(blog.id));
      displayToast(
        "Delete Succeeded.",
        "🗑️ Your Blog has been successfully deleted 🗑️",
        "success",
      );
    } catch (e) {
      displayServerErrorToast();
    }
  };

  // INLINE STYLE
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  // BLOG DETAILS - FUNCTION
  const blogDetails = () => (
    <>
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
    </>
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
