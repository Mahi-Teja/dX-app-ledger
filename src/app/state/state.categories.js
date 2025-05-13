import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "budget003",
    category: "Entertainment",
  },
  {
    id: "budget004",
    category: "Health",
  },

  {
    id: "budget00",
    category: "Utilities",
  },
  {
    id: "budget006",
    category: "Salary",
  },
  {
    id: "budget008",
    category: "Transport",
  },
];

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
