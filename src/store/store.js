import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "../app/state/state.categories";
import { userReducer } from "../app/state/user";
import { transactionReducer } from "../app/state/state.transactions";
import { accountReducer } from "../app/state/state.accounts";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    transactions: transactionReducer,
    user: userReducer,
    accounts: accountReducer,
  },
});

export default store;
