import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    addBudget: (state, action) => {
      const newBudget = action.payload;

      if (
        newBudget &&
        newBudget.categoryId &&
        !state.some((b) => b.categoryId === newBudget.categoryId)
      ) {
        state.push({ ...newBudget, spent: newBudget.spent || 0 });
      }
    },

    updateBudget: (state, action) => {
      const updatedBudgets = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return state.map((b) => {
        const updated = updatedBudgets.find(
          (u) => u.categoryId === b.categoryId
        );
        return updated ? { ...b, ...updated } : b;
      });
    },

    deleteBudget: (state, action) => {
      const toDeleteIds = Array.isArray(action.payload)
        ? action.payload.map((b) => b.category)
        : [action.payload.category];

      return state.filter((b) => !toDeleteIds.includes(b.category));
    },
  },
});

export const { addBudget, updateBudget, deleteBudget } = budgetsSlice.actions;
export const budgetReducer = budgetsSlice.reducer;
