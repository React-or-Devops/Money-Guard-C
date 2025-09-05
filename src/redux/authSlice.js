import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    setToken: (s, a) => {
      s.token = a.payload;
    },
    clearAuth: (s) => {
      s.token = null;
      s.user = null;
    },
    setUser: (s, a) => {
      s.user = a.payload;
    },
  },
});

export const { setToken, clearAuth, setUser } = slice.actions;
export default slice.reducer;
