import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as usersService from "../../services/users";
import displayServerErrorToast from "../../utils/displayServerErrorToast";

// ALL USERS - ASYNC THUNK
const getAllUsers = createAsyncThunk(
  // The payloadCreator function needs 2 arguments, even is the first one is not used
  // (in this case, "payload")
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
