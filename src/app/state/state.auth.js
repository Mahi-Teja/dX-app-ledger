import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
};
//  Nothing is used rn
const authSlice = createSlice({
  initialState,
  reducers: {
    signUser: (state, action) => {
      state.isAuthenticated = true;
      // set token => from action.payload
      // state.token=''
    },
    logoutUser: (state, action) => {
      state.isAuthenticated = false;
      // remove token
      state.token = null;
    },
    //currently only used for FrontEnd app to use multiplt accounts
    removeUser: (state, action) => {
      state.isAuthenticated = false;
      // remove token
      state.token = null;
      const data = JSON.parse(localStorage.getItem("dxData"));
      // username
      const user = action.payload.user;
      // find the user and remove it and add the rest
      // const removedList = data.filter(d=>)
    },
  },
});
