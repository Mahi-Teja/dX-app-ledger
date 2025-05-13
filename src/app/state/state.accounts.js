import { createSlice } from "@reduxjs/toolkit";
import { addToLocalDB } from "../../utils/addToLocalDB";

const dB = JSON.parse(localStorage.getItem("dxData"));

let dbAccounts = dB?.accounts;
// if (dB?.accounts?.length > 0) {
//   dbAccounts = dB.accounts;
// }

const initialState = [
  {
    id: "123",
    name: "Cash",
    type: "cash",
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
      //   addToLocalDB({ accounts: newAcc });
    },
    resetAccount: () => initialState,
  },
});

export const { addaccount, resetAccount } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
