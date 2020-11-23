import { useState } from "react";
import { useDispatch } from "react-redux";
import displayToast from "../../utils/displayToast";
import displayServerErrorToast from "../../utils/displayServerErrorToast";
import { likeBlog } from "../../store/slices/blogsAllUsersSlice";
import { deleteBlogSingleUser } from "../../store/slices/blogsSingleUserSlice";

/*This Component (Blog.js) and the related Tests were build for the previous version of the BlogsList App.
  None of them are used anymore; they are no longer relevant.

  HOWEVER, they are kept here as an example of what can be done with
  React Testing Library.

  These Tests were heavily inspired from Part 5 of the FullStackOpen Course (2020) :
  https://fullstackopen.com/en/part5. */

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

export default Blog;
