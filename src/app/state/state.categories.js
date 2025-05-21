import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "budget003",
    category: "Entertainment",
    icon: "entertainment",
  },
  {
    id: "budget003",
    category: "Shopping",
    icon: "shopping",
  },
  {
    id: "budget004",
    category: "Health",
    icon: "health",
  },

  {
    id: "budget00",
    category: "Food and Groceries",
    icon: "food",
  },
  {
    id: "budget006",
    category: "Salary",
    icon: "salary",
  },
  {
    id: "budget008",
    category: "Transport",
    icon: "transport",
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
