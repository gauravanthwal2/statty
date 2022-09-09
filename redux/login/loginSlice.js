import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn:
    typeof window !== "undefined" && sessionStorage.getItem("isLoggedIn")
      ? sessionStorage.getItem("isLoggedIn")
      : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      typeof window !== "undefined" && sessionStorage.setItem("isLoggedIn", true);
      state.isLoggedIn = true;
    },
  },
});

export const { loginUser } = loginSlice.actions;
export default loginSlice.reducer;
