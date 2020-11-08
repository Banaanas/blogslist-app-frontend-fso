import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogsService from "../../services/blogs";
import usersService from "../../services/users";
import { getBlogsAllUsers } from "./blogsAllUsersSlice";

// ALL BLOGS SINGLE USER - ASYNC THUNK
// Single User is first retrieved. Then, at the Reducer step, All Blogs
// are retrieved. That's why, to get All Blogs from a Single User, we must
// get Single User first (which includes all User's Blogs)
const getBlogsSingleUser = createAsyncThunk(
  "blogsSingleUser/getBlogsSingleUser",
  async (id) => {
    const response = await usersService.getUser(id);
    return response.blogs;
  },
);

// DELETE BLOG SINGLE USER - ASYNC THUNK
const deleteBlogSingleUser = createAsyncThunk(
  "blogsSingleUser/deleteBlogSingleUser",
  async (id) => {
    await blogsService.blogDelete(id);
    return id;
  },
);

// ADD BLOG SINGLE USER - ASYNC THUNK
const addBlogSingleUser = createAsyncThunk(
  "blogsSingleUser/addBlogSingleUser",
  async (newBlog) => {
    const response = await blogsService.create(newBlog);
    return response;
  },
);

// Initial State
// Initial State
const initialState = {
  data: [],
  loading: false,
};

// ALL BLOGS SINGLE USER - SLICE
const blogsSingleUserSlice = createSlice({
  name: "blogsSingleUser",
  initialState,
  reducers: {},
  extraReducers: {
    [getBlogsSingleUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getBlogsSingleUser.pending]: (state) => {
      state.loading = true;
    },
    [getBlogsSingleUser.rejected](state) {
      state.loading = false;
    },
    [addBlogSingleUser.fulfilled](state, action) {
      const createdBlog = action.payload;
      state.push(createdBlog);
      return state;
    },
    [deleteBlogSingleUser.fulfilled](state, action) {
      const deletedBlogID = action.payload;
      return state.filter((blog) => blog.id !== deletedBlogID);
    },
  },
});

// export const { resetAllUsers } = blogsSingleUserSlice.actions;

export default blogsSingleUserSlice.reducer;
export { getBlogsSingleUser, addBlogSingleUser, deleteBlogSingleUser };
