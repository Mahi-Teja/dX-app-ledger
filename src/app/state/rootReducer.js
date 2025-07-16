import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from "./state.categories";
import { transactionReducer } from "./state.transactions";
import { userReducer } from "./user";
import { budgetReducer } from "./state.budgets";
import { accountReducer } from "./state.accounts";

const rootReducer = combineReducers({
  categories: categoryReducer,
  transactions: transactionReducer,
  user: userReducer,
  accounts: accountReducer,
  budgets: budgetReducer,
});

export default rootReducer;
