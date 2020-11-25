import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as blogsService from "../../services/blogs";
import displayToast from "../../utils/displayToast";
import displayServerErrorToast from "../../utils/displayServerErrorToast";

// ALL BLOGS ALL USERS - ASYNC THUNK
// The payloadCreator function needs 2 arguments, even is the first one is not used
// (in this case, "payload")
const getBlogsAllUsers = createAsyncThunk(
  "blogsAllUsers/getBlogsAllUsers",
  async (payload, { rejectWithValue }) => {
    try {
      return await blogsService.getBlogsAllUsers();
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

// LIKE BLOG - ASYNC THUNK
const likeBlog = createAsyncThunk(
  "blogsAllUsers/likeBlog",
  async (updatedBlogObject, { rejectWithValue }) => {
    const { blogId, updatedBlog } = updatedBlogObject;

    try {
      return await blogsService.like(blogId, updatedBlog);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

// Initial State
const initialState = {
  data: [],
  isLoading: false,
};

// ALL BLOGS FROM ALL USERS REDUCER - SLICE
const blogsAllUsersSlice = createSlice({
  name: "blogsAllUsers",
  initialState,
  reducers: {},

  extraReducers: {
    // getBlogsAllUsers
    [getBlogsAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getBlogsAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getBlogsAllUsers.rejected](state) {
      state.isLoading = false;
      displayServerErrorToast();
    },

    // likeBlog
    [likeBlog.fulfilled]: (state, action) => {
      const likedBlog = action.payload;
      state.isLoading = false;
      state.data = state.data.map((blog) =>
        blog.id !== likedBlog.id ? blog : likedBlog,
      );

      // Display Success Toast
      displayToast(
        "🙂 Successful Vote 👍🏼",
        "One more Like for this Blog.",
        "success",
      );
    },
    [likeBlog.rejected]: () => {
      displayServerErrorToast();
    },
  },
});

export default blogsAllUsersSlice.reducer;
export const { resetAllUsers } = blogsAllUsersSlice.actions;
export { getBlogsAllUsers, likeBlog };
