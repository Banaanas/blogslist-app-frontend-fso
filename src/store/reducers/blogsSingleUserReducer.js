import actionTypes from "../actions/actions-types";

// BLOGS SINGLE USER REDUCER
const blogsSingleUserReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_SINGLE_USER: {
      const { singleUser } = action;
      return singleUser.blogs;
    }

    case actionTypes.ADD_BLOG: {
      return [...state, action.blog];
    }

    case actionTypes.DELETE_BLOG: {
      const { deletedBlogID } = action;
      const newState = [...state];
      return newState.filter((blog) => blog.id !== deletedBlogID);
    }

    default:
      return state;
  }
};

export default blogsSingleUserReducer;
