import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as blogsService from "../../services/blogs";
import * as usersService from "../../services/users";
import displayServerErrorToast from "../../utils/displayServerErrorToast";
import displayToast from "../../utils/displayToast";

// ALL BLOGS SINGLE USER - ASYNC THUNK
// Single User is first retrieved. Then, at the Reducer step, All Blogs
// are retrieved. That's why, to get All Blogs from a Single User, we must
// get Single User first (which includes all User's Blogs)
const getBlogsSingleUser = createAsyncThunk(
  "blogsSingleUser/getBlogsSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await usersService.getUser(id);
      return response.blogs;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

// DELETE BLOG SINGLE USER - ASYNC THUNK
const deleteBlogSingleUser = createAsyncThunk(
  "blogsSingleUser/deleteBlogSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      await blogsService.blogDelete(id);
      return id;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

// ADD BLOG SINGLE USER - ASYNC THUNK
const addBlogSingleUser = createAsyncThunk(
  "blogsSingleUser/addBlogSingleUser",
  async (newBlog, { rejectWithValue }) => {
    try {
      const response = await blogsService.create(newBlog);
      return response;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  },
);

// UPDATE BLOG SINGLE USER - ASYNC THUNK
// For Authenticated Users - Not used in this App - Kept for example purpose
// --> Like Blog function also updates blog BUT without Authentication
const updateBlogSingleUser = createAsyncThunk(
  "blogsAllUsers/updateBlog",
  async (updatedBlogObject, { rejectWithValue }) => {
    const { blogId, updatedBlog } = updatedBlogObject;

    try {
      return await blogsService.update(blogId, updatedBlog);
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

// ALL BLOGS SINGLE USER - SLICE
const blogsSingleUserSlice = createSlice({
  name: "blogsSingleUser",
  initialState,
  reducers: {
    // Sync Reducer
    resetblogsSingleUser() {
      return initialState;
    },
  },

  // Async Reducers
  extraReducers: {
    // getBlogsSingleUser
    [getBlogsSingleUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getBlogsSingleUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getBlogsSingleUser.rejected]: () => {
      displayServerErrorToast();
    },

    // addBlogSingleUser
    [addBlogSingleUser.fulfilled]: (state, action) => {
      const createdBlog = action.payload;
      state.isLoading = false;
      state.data.push(createdBlog);

      // Display Success Toast
      displayToast(
        "👍🏼 Blog Added 🙂",
        "Your Blog has been successfully added.",
        "success",
      );
    },
    [addBlogSingleUser.rejected]: () => {
      displayServerErrorToast();
    },

    // deleteBlogSingleUser
    [deleteBlogSingleUser.fulfilled]: (state, action) => {
      const deletedBlogID = action.payload;
      state.isLoading = false;
      state.data = state.data.filter((blog) => blog.id !== deletedBlogID);

      // Display Success Toast
      displayToast(
        "Delete Succeeded.",
        "🗑️ Your Blog has been successfully deleted 🗑️",
        "success",
      );
    },
    [deleteBlogSingleUser.rejected]: () => {
      // Display Error Toast
      displayServerErrorToast();
    },

    // updateBlogSingleUser - NOT USED IN THIS APP - KEPT FOR EXAMPLE PURPOSE
    [updateBlogSingleUser.fulfilled]: (state, action) => {
      const updatedBlog = action.payload;
      state.isLoading = false;
      state.data = state.data.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );

      // Display Success Toast
      displayToast(
        "🙂 Successful Update 👍🏼",
        "Your Blog has been successfully updated.",
        "success",
      );
    },
    [updateBlogSingleUser.rejected]: () => {
      displayServerErrorToast();
    },
  },
});

export const { resetblogsSingleUser } = blogsSingleUserSlice.actions;

export default blogsSingleUserSlice.reducer;
export {
  getBlogsSingleUser,
  addBlogSingleUser,
  deleteBlogSingleUser,
  updateBlogSingleUser,
};
