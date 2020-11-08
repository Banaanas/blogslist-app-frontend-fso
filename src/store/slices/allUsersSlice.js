
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "../../services/users";

// ALL USERS - ASYNC THUNK
const getAllUsers = createAsyncThunk("allUsers/getAllUsers", async () => {
  const response = await usersService.getAllUsers();
  return response;
});

// Initial State
const initialState = {
  data: [],
  loading: false,
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
      state.loading = false;
      state.data = action.payload;
    },
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.rejected](state) {
      state.loading = false;
    },
  },
});

export default allUsersSlice.reducer;
export const { resetAllUsers } = allUsersSlice.actions;
export { getAllUsers };


/*
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "../../services/users";

// ALL USERS - ASYNC THUNK
const getAllUsers = createAsyncThunk("allUsers/getAllUsers", async () => {
  const response = await usersService.getAllUsers();
  return response;
});

// Initial State
const initialState = [];

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
    [getAllUsers.fulfilled](state, action) {
      return action.payload;
    },
    [getAllUsers.pending](state, action) {
      return state;
    },
    [getAllUsers.rejected](state, action) {
      return state;
    },
  },
});

export default allUsersSlice.reducer;
export const { resetAllUsers } = allUsersSlice.actions;
export { getAllUsers };
*/
