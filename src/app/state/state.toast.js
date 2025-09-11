import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      // just push, don't return
      state.push({ id: Date.now().toString(), ...action.payload });
    },
    removeToast: (state) => {
      // remove the first toast
      state.shift();
    },
    hideToast: (state, action) => {
      // return a new filtered array
      return state.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { showToast, hideToast, removeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
