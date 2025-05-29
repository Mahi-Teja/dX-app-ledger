// react
import { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// Components
import { Button1 } from "./button1";
import { Model } from "./Model";
// reducer functions
import { addTransaction } from "../app/state/state.transactions";
import {
  creditAmountToAccount,
  debitAmountToAccount,
} from "../app/state/state.accounts";
import SelfTxn from "./selfTxn";
import IncomeExpenseForm from "./IncomeExpenseForm";

const AddTxn = ({ seldectedDate }) => {
  const dispatch = useDispatch();
  // getting state
  const transactions = useSelector((state) => state.transactions);
  const categories = useSelector((state) => state.categories);
  const accounts = useSelector((state) => state.accounts);

  //state variables for this component
  const [openAddTxn, setOpenAddTxn] = useState(false);
  const [fields, setFields] = useState({});
  const [isExpense, setIsExpense] = useState(true);
  const [isSelfTxn, setIsSelfTxn] = useState(false);

  const updateFields = (e) => {
    const { name, value } = e.target;
    name == "amount" || name == "balance"
      ? setFields((pre) => ({ ...pre, [name]: Number(value) }))
      : setFields((pre) => ({ ...pre, [name]: value }));
  };

  const toggleTxnModal = () => setOpenAddTxn((pre) => !pre);
  const toggleSelf = () => {
    setIsSelfTxn(true);
  };

  return !openAddTxn ? (
    <Button1
      className=" lg:block   fixed bottom-20 text-center align-middle self  rounded-full   w-14  text-white right-8  text-4xl shadow-indigo-300 shadow-sm mx-auto mt-6  "
      handleClick={toggleTxnModal}
      title="Add New transacton"
    >
      +
    </Button1>
  ) : (
    <Model>
      <section className="p-6 backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl shadow-2xl w-full max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add Transaction</h2>
          <button
            onClick={toggleTxnModal}
            className="text-gray-600 hover:text-red-600 transition"
          >
            ❌
          </button>
        </div>
        {/* Expense or Income  */}
        <div
          className={`p-2 mb-4 rounded-xl transition-all duration-300 ${
            isExpense ? "bg-rose-100" : "bg-emerald-100"
          }`}
        >
          <div className="grid grid-cols-3 justify-center gap-4">
            <button
              onClick={() => {
                setIsSelfTxn(false);
                setIsExpense(true);
                setFields({ ...fields, type: "expense" });
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isExpense && !isSelfTxn
                  ? "bg-rose-500 text-white shadow-md"
                  : "bg-white text-gray-700"
              }`}
            >
              Expense
            </button>

            <button
              onClick={() => {
                setIsSelfTxn(false);
                setIsExpense(false);
                setFields({ ...fields, type: "income" });
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                !isExpense && !isSelfTxn
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-white text-gray-700"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => {
                setIsSelfTxn(true);
                setIsExpense(false);
                setFields({ ...fields, type: "self" });
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isSelfTxn
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-white text-gray-700"
              }`}
            >
              Self Txn
            </button>
          </div>
        </div>
        {/* Form for details */}
        {isSelfTxn ? (
          <SelfTxn
            seldectedDate={seldectedDate}
            setOpenAddTxn={setOpenAddTxn}
          />
        ) : (
          <IncomeExpenseForm
            isExpense={isExpense}
            setOpenAddTxn={setOpenAddTxn}
            seldectedDates={seldectedDate}
          />
        )}
      </section>
    </Model>
  );
};

export default AddTxn;
