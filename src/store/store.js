import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../app/state/rootReducer";

// Save state to localStorage
function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// Load state from localStorage
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(),
});
// console.log(store.getState());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
