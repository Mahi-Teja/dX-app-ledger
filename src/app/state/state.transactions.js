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
    deleteTransaction: (state, action) => {
      const { id } = action.payload;
      // const txnToDelete = state.find((txn) => txn.id === id);
      // if (!txnToDelete) return;
      return state.filter((txn) => txn.id !== id);
    },
    updateTransaction: (state, action) => {
      const { id, updatedTxn } = action.payload;
      // find the txn with id and check if is existing, notFlages as deleted
      //  and then update it with new txn

      // const txnToUpdate = state.find((txn) => txn.id === id);
      // if (!txnToUpdate) return;

      return state.map((txn) => (txn.id === id ? updatedTxn : txn));
    },

    addStateTransactions: (state, action) => {
      state = [...action.payload];
    },
    resetTransactions: () => initialState,
  },
});

export const {
  addTransaction,
  addStateTransactions,
  resetTransactions,
  deleteTransaction,
  updateTransaction,
} = transactionsSlice.actions;
export const transactionReducer = transactionsSlice.reducer;
