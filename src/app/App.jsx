import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store.js";

import Home from "../pages/Home.jsx";
import Accounts from "../pages/Accounts.jsx";
import Txn from "../pages/Txn.jsx";
import { Budgets } from "../pages/Budgets.jsx";
import { Profile } from "../pages/Profile.jsx";
import Test from "../components/Test.jsx";
import { Login } from "../pages/Login.jsx";
import { Loginn } from "../pages/Loginn.jsx";
import { Signup } from "../pages/Signup.jsx";
import ProtectedRoute from "../pages/Protected.jsx";
import Nav from "../components/Nav.jsx";
import Categories from "../components/catagories.jsx";

export const App = ({ children }) => {
  const dB = JSON.parse(localStorage.getItem("dxData"));
  const location = useLocation();
  const hideNavForPath = ["/login", "/signup"];
  const showNavPath = !hideNavForPath.includes(location.pathname);
  return (
    <main className="h-screen  box-border">
      {/* <BrowserRouter>
        <HashRouter> */}
      {/* {window.location.href.includes("/signup") ? null : <Nav />} */}
      {showNavPath && <Nav />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            dB?.user?.username ? (
              <Login />
            ) : (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            )
          }
        />
        <Route path="/loginn" element={<Loginn />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <Budgets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Txn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Signup />} />
      </Routes>
      {/* </HashRouter> 
      </BrowserRouter> */}
    </main>
  );
};
