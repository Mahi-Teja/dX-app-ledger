import { createSlice } from "@reduxjs/toolkit";
import { addToLocalDB } from "../../utils/addToLocalDB";

// const localAccounts = JSON.parse(localStorage.getItem("dxData"))?.accounts;

const initialState = [];

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addaccount: (state, action) => {
      const newAcc = action.payload;
      newAcc.initialBalance = action.payload.balance;

      state.push(newAcc);

      addToLocalDB({ accounts: newAcc });
    },
    creditAmountToAccount: (state, action) => {
      const opAccount = action.payload.account; // operted account
      const { amount } = action.payload;
      const oldState = state;
      const newState = oldState.map((acc) => {
        // change the name filtering to something more umique like _id
        if (acc.name == opAccount.name) {
          return {
            ...acc,
            balance: Number(acc.balance) + Number(amount),
          };
        } else {
          return acc;
        }
      });

      return newState;
    },
    debitAmountToAccount: (state, action) => {
      const opAccount = action.payload.account; // operted account
      const { amount } = action.payload;
      const oldState = state;
      const newState = oldState.map((acc) => {
        // change the name filtering to something more umique like _id
        if (acc.name == opAccount.name) {
          return {
            ...acc,
            balance: Number(acc.balance) - Number(amount),
          };
        } else {
          return acc;
        }
      });

      return newState;
    },
    selfTransactionAmount: (state, action) => {
      const { fromAccount, toAccount, amount } = action.payload;
      if (!fromAccount.id || !toAccount.id) return;

      const newState = state.map((acc) => {
        if (acc?.id == fromAccount.id) {
          // add to the 'to' account
          return {
            ...acc,
            balance: Number(acc.balance) - Number(amount),
          };
        } else if (acc?.id == toAccount.id) {
          // remove  from the 'from' account
          return {
            ...acc,
            balance: Number(acc.balance) + Number(amount),
          };
        } else {
          return acc;
        }
      });

      return newState;
    },
    updateAccount: (state, action) => {
      const newAcc = action.payload.editedAccount; // new value to replace

      //find old account from state and replace it with new account
      const updatedAccounts = state.map((oldAccount) => {
        if (oldAccount?.id == newAcc.id) {
          return newAcc;
        } else {
          return oldAccount;
        }
      });

      return updatedAccounts;
    },
    deleteAccount: (state, action) => {
      const accToDelete = action.payload;
      const list = state.filter((acc) => acc.id !== accToDelete.id);

      return list;
    },
    resetAccount: () => initialState,
  },
});

export const {
  addaccount,
  resetAccount,
  creditAmountToAccount,
  debitAmountToAccount,
  selfTransactionAmount,
  updateAccount,
  deleteAccount,
} = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
 
