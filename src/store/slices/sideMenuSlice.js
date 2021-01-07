import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  isMenuOpen: false,
};

// SIDE MENU SLICE
const sideMenuSlice = createSlice({
  name: "SideMenu",
  initialState,
  reducers: {
    toggleSideMenu: (state, action) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeSideMenu: (state, action) => {
      state.isMenuOpen = false;
    },
  },
});

export default sideMenuSlice.reducer;
export const { toggleSideMenu, closeSideMenu } = sideMenuSlice.actions;
