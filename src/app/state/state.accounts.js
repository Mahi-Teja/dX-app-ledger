import { createSlice } from "@reduxjs/toolkit";
import { addToLocalDB } from "../../utils/addToLocalDB";

const localAccounts = JSON.parse(localStorage.getItem("dxData"))?.accounts;

const initialState = localAccounts?.length
  ? localAccounts
  : [
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

      state.push(newAcc);

      addToLocalDB({ accounts: newAcc });
    },
    resetAccount: () => initialState,
  },
});

export const { addaccount, resetAccount } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;

// const dB = JSON.parse(localStorage.getItem("dxData"));

// let dbAccounts = dB?.accounts;
// console.log(dbAccounts);
