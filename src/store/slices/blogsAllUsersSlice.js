import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogsService from "../../services/blogs";

// ALL BLOGS ALL USERS - ASYNC THUNK
const getBlogsAllUsers = createAsyncThunk(
  "blogsAllUsers/getBlogsAllUsers",
  async () => {
    const response = await blogsService.getBlogsAllUsers();
    return response;
  },
);

// LIKE BLOG - ASYNC THUNK
const likeBlog = createAsyncThunk(
  "blogsAllUsers/likeBlog",
  async (updatedBlogObject) => {
    const { blogId, updatedBlog } = updatedBlogObject;
    const response = await blogsService.like(blogId, updatedBlog);
    return response;
  },
);

// Initial State
const initialState = {
  data: [],
  loading: false,
};

// ALL BLOGS FROM ALL USERS REDUCER - SLICE
const blogsAllUsersSlice = createSlice({
  name: "blogsAllUsers",
  initialState,
  reducers: {},
  extraReducers: {
    [getBlogsAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getBlogsAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getBlogsAllUsers.rejected](state) {
      state.loading = false;
    },
    [likeBlog.fulfilled]: (state, action) => {
      const likedBlog = action.payload;
      state.loading = false;
      state.data = state.data.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog));
    },
  },
});

export default blogsAllUsersSlice.reducer;
export const { resetAllUsers } = blogsAllUsersSlice.actions;
export { getBlogsAllUsers, likeBlog };
