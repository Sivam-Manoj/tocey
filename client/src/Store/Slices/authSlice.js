import { createSlice } from "@reduxjs/toolkit";

const getData = () => {
  const userData = sessionStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

const initialState = {
  userData: getData(),
  isLoggedIn: !!getData(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem("UserData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
