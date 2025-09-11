import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAccount } from "../app/state/state.accounts";
import { resetTransactions } from "../app/state/state.transactions";
import { resetCategory } from "../app/state/state.categories";
import { resetUser } from "../app/state/user";
import { resetBudgets } from "../app/state/state.budgets";

export const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {});

  const logOut = () => {
    localStorage.removeItem("dxData");
    dispatch(resetAccount());
    dispatch(resetTransactions());
    dispatch(resetCategory());
    dispatch(resetUser());
    dispatch(resetBudgets())
    navigate("/signup");
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Your Profile
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Username
            </label>
            <p className="text-lg font-medium text-gray-800">
              {user?.username}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <p className="text-lg font-medium text-gray-800">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Currency
            </label>
            <p className="text-lg font-medium text-gray-800">
              {user.currency ? user?.currency.toUpperCase() : user?.currency}
            </p>
          </div>
        </div>

        <button
          onClick={logOut}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Log Out
        </button>
      </div>
    </section>
  );
};
