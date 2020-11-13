import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "../../services/users";
import displayServerErrorToast from "../../utils/displayServerErrorToast";

// ALL USERS - ASYNC THUNK
const getAllUsers = createAsyncThunk(
  "allUsers/getAllUsers",
  async (payload, { rejectWithValue }) => {
    try {
      return await usersService.getAllUsers();
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

// ALL USERS - SLICE
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    resetAllUsers() {
      return initialState;
    },
  },
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.rejected](state) {
      state.isLoading = false;
      displayServerErrorToast();
    },
  },
});

export default allUsersSlice.reducer;
export const { resetAllUsers } = allUsersSlice.actions;
export { getAllUsers };
