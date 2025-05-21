import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  credsAuthData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    credsData(state, action) {
      state.credsAuthData = action.payload;
    },
  },
});

export const { credsData } = authSlice.actions;
export default authSlice.reducer;
