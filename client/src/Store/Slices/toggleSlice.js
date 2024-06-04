import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};
const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleIsOpen } = toggleSlice.actions;

export default toggleSlice.reducer;
