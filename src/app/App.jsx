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
import Txn from "../pages/Transactions.jsx";
import { Reports } from "../pages/Reports.jsx";
import { Profile } from "../pages/Profile.jsx";
import Test from "../components/Test.jsx";
import { Login } from "../pages/Login.jsx";
import { Loginn } from "../pages/Loginn.jsx";
import { Signup } from "../pages/Signup.jsx";
import ProtectedRoute from "../pages/Protected.jsx";
import Nav from "../components/Nav.jsx";
import Categories from "../components/Categories/Catagories.jsx";
import SelectedAccount from "../pages/SelectedAccount.jsx";
import AllTxnCalendar from "../pages/AllTxnCalendar.jsx";
import SelectedCategory from "../pages/SelectedCategory.jsx";
import BudgetsPage from "../pages/Budgets.jsx";
import Transactions from "../components/Transactions/Transactions.jsx";
import { TxnItem } from "../components/transactions/TxnItem.jsx";

export const App = ({ children }) => {
  const dB = JSON.parse(localStorage.getItem("dxData"));
  const location = useLocation();
  const hideNavForPath = ["/login", "/signup"];
  const showNavPath = !hideNavForPath.includes(location.pathname);
  return (
    <main className={`bg-indigo-300  h-screen  box-border flex`}>
      {showNavPath && <Nav />}
      {/* <section className="sm:h-[90vh] md:h-screen sm:w-full sm:overflow-auto"> */}
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
          path="/accounts/:id"
          element={
            <ProtectedRoute>
              <SelectedAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/txns"
          element={
            <ProtectedRoute>
              <AllTxnCalendar />
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
          path="/category/:name"
          element={
            <ProtectedRoute>
              <SelectedCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <BudgetsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
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
    </main>
  );
};
