import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "INR",
  theme: "light",
  language: "en", // optional: for localization support
  defaultAccountId: null, // optional: for pre-selecting account
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    updatePreference: (state, action) => {
      const updates = action.payload;

      // Merge updates with current state (non-destructive)
      return { ...state, ...updates };
    },
    resetPreferences: () => initialState, // Optional: reset everything
  },
});

export const { updatePreference, resetPreferences } = preferencesSlice.actions;
export const preferencesReducer = preferencesSlice.reducer;
