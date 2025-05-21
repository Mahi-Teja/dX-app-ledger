import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./state.categories";
import { transactionReducer } from "./state.transactions";
import { userReducer } from "./user";
import { accountReducer } from "./state.accounts";

const rootReducer = combineReducers({
  categories: categoryReducer,
  transactions: transactionReducer,
  user: userReducer,
  accounts: accountReducer,
});

export default rootReducer;
