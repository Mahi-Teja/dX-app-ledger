import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button1 } from "./button1";
import { Model } from "./Model";
import SelfTxn from "./SelfTxn.jsx";
import IncomeExpenseForm from "./IncomeExpenseForm";
import { FreeIcons } from "../utils/icons";

const AddTxn = ({ selectedDate }) => {
  const [openAddTxn, setOpenAddTxn] = useState(false);
  const [isExpense, setIsExpense] = useState(true);
  const [isSelfTxn, setIsSelfTxn] = useState(false);
  const [type, setType] = useState("expense");

  const toggleTxnModal = () => setOpenAddTxn((prev) => !prev);

  const handleTxnTypeChange = (type) => {
    setType(type);
    setIsSelfTxn(type === "self");
    setIsExpense(type === "expense");
  };

  return !openAddTxn ? (
    <Button1
      className="fixed bottom-20 right-8 md:w-14 md:h-14 flex justify-center items-center z-60   md:text-xl   rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg"
      handleClick={toggleTxnModal}
      title="Add New Transaction"
    >
      <>{FreeIcons.add}</>
    </Button1>
  ) : (
    <Model>
      <section className="p-6 backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl shadow-2xl max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add Transaction</h2>
          <button
            onClick={toggleTxnModal}
            className="text-gray-600 hover:text-red-600 transition"
          >
            ❌
          </button>
        </div>

        {/* Transaction Type Selector */}
        <div
          className={`p-2 mb-4 rounded-xl transition-all duration-300 ${
            isSelfTxn
              ? "bg-pink-100"
              : isExpense
              ? "bg-rose-100"
              : "bg-emerald-100"
          }`}
        >
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                label: "Expense",
                value: "expense",
                active: isExpense && !isSelfTxn,
              },
              {
                label: "Income",
                value: "income",
                active: !isExpense && !isSelfTxn,
              },
              { label: "Self Txn", value: "self", active: isSelfTxn },
            ].map(({ label, value, active }) => (
              <button
                key={value}
                onClick={() => handleTxnTypeChange(value)}
                className={`py-2 rounded-lg transition-all duration-300 text-sm ${
                  active
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Component Switch */}
        {isSelfTxn ? (
          <SelfTxn selectedDate={selectedDate} setOpenAddTxn={setOpenAddTxn} />
        ) : (
          <IncomeExpenseForm
            type={type}
            isExpense={isExpense}
            setOpenAddTxn={setOpenAddTxn}
            selectedDate={selectedDate}
          />
        )}
      </section>
    </Model>
  );
};

export default AddTxn;
