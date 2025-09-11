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
    deleteCategory: (state, action) => {
      const id = action.payload;
      return state.filter((cat) => cat.id !== id);
    },
    resetCategory: () => initialState,
  },
});

export const { addCategory, resetCategory, deleteCategory } =
  categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
