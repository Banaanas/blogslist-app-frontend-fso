import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = "";

// LOGGED IN USER SLICE
const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    getLoggedInUser(state, action) {
      return action.payload;
    },
    resetLoggedInUser() {
      return initialState;
    },
  },
});

export default loggedInUserSlice.reducer;
export const { getLoggedInUser, resetLoggedInUser } = loggedInUserSlice.actions;
