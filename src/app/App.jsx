import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Accounts from "../pages/Accounts.jsx";
import { Reports } from "../pages/Reports.jsx";
import { Profile } from "../pages/Profile.jsx";
import { Login } from "../pages/Login.jsx";
import { Loginn } from "../pages/Loginn.jsx";
import { Signup } from "../pages/Signup.jsx";
import ProtectedRoute from "../pages/Protected.jsx";
import Nav from "../components/Nav.jsx";
import Categories from "../components/Categories/Catagories.jsx";
import SelectedAccount from "../pages/SelectedAccount.jsx";
import SelectedCategory from "../pages/SelectedCategory.jsx";
import BudgetsPage from "../pages/Budgets.jsx";
import Transactions from "../components/transactions/Transactions.jsx";

import { Toaster } from "react-hot-toast";

import AllTxnCalendar from "../pages/AllTxnCalendar.jsx";
import Test from "../components/Test.jsx";

export const App = () => {
  const dB = JSON.parse(localStorage.getItem("dxData"));
  const location = useLocation();

  // Paths where Nav should be hidden
  const hideNavForPath = ["/login", "/signup", "/loginn"];
  const showNavPath = !hideNavForPath.includes(location.pathname);

  return (
    <main className="bg-indigo-300 lg:mx-auto max-w-[1400px] min-h-screen box-border flex">
      <Toaster />
      {showNavPath && <Nav />}
      <section className="flex-1 overflow-y-auto">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              dB?.user?.username ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              dB?.user?.username ? <Navigate to="/" replace /> : <Signup />
            }
          />
          <Route
            path="/loginn"
            element={
              dB?.user?.username ? <Navigate to="/" replace /> : <Loginn />
            }
          />

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
          {/* <Route
          path="/txns"
          element={
            <ProtectedRoute>
              <AllTxnCalendar />
            </ProtectedRoute>
          }
        /> */}
          {/* <Route
          path="/test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          } 
        /> */}

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>
    </main>
  );
};
