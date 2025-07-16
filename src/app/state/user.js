import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUserDetails: (state, action) => {
      const updatedUser = action.payload;
      return updatedUser;
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { editUserDetails, addUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
