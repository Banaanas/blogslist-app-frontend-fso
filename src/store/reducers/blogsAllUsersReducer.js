import actionTypes from "../actions/actions-types";

// ALL BLOGS FROM ALL USERS REDUCER
const blogsAllUsersReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_BLOGS_ALL_USERS: {
      return action.allBlogs;
    }

    case actionTypes.LIKE_BLOG: {
      const newObj = action.updatedBlog;

      const blogToUpdate = state.find((blog) => blog.id === newObj.id);
      const updatedBlog = {
        ...blogToUpdate,
        ...newObj,
      };
      return state.map((blog) => (blog.id !== newObj.id ? blog : updatedBlog));
    }

    default:
      return state;
  }
};

export default blogsAllUsersReducer;
