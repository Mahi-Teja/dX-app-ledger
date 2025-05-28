import { createSlice } from "@reduxjs/toolkit";
import { addToLocalDB } from "../../utils/addToLocalDB";

// const localAccounts = JSON.parse(localStorage.getItem("dxData"))?.accounts;

const initialState = [
  {
    id: "123",
    name: "Cash",
    type: "cash", // cash,savings,credit
    balance: 0,
  },
];
// {
//   "id": "acc001",
//   "name": "Savings Account",
//   "type": "bank",
//   "balance": 25000.0
// },

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
    resetAccount: () => initialState,
  },
});

export const {
  addaccount,
  resetAccount,
  creditAmountToAccount,
  debitAmountToAccount,
} = accountSlice.actions;
export const accountReducer = accountSlice.reducer;

// const dB = JSON.parse(localStorage.getItem("dxData"));

// let dbAccounts = dB?.accounts;
// console.log(dbAccounts);
