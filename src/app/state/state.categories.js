import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCat = action.payload;

      state.push(newCat);
    },
    resetCategory: () => initialState,
  },
});

export const { addCategory, resetCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
