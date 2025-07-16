import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
//  the transaction array has objects like:
// {
// id: "txn006",
// date: "2025-05-07",
// amount: 1200,
// description: "Electricity bill",
// category: "Utilities",
// accountId: "acc001",
// type: "expense",
// },

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      // const newCat = action.payload;

      state.push(action.payload);
    },
    deleteTransaction: (state, action) => {},

    addStateTransactions: (state, action) => {
      state = [...action.payload];
    },
    resetTransactions: () => initialState,
  },
});

export const { addTransaction, addStateTransactions, resetTransactions } =
  transactionsSlice.actions;
export const transactionReducer = transactionsSlice.reducer;
