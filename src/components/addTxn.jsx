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

  const add = () => {
    // TODO:
    // Replace alerts with nice ui, like Toast
    if (!fields.description || !fields.amount) {
      alert("Please fill all fields");
      return;
    }
    if (isNaN(fields.amount)) {
      alert("Amount should be a number");
      return;
    }

    // new transaction object
    const newTxn = {
      id: transactions?.length + 1,
      description: fields.description,
      amount: fields.amount,
      date: new Date(seldectedDate).toISOString().split("T")[0],
      type: isExpense ? "expense" : "income",
      category: fields.category,
      account: fields.account,
    };

    // finding the account to adjust the balance
    const accToOperate = accounts.find((acc) => acc.name == fields.account);

    // new account object
    const acc = {
      account: accToOperate,
      accountName: fields.account,
      amount: fields.amount,
      type: isExpense ? "expense" : "income",
    };
    //update State : transaction, credit/debit amount to account
    dispatch(addTransaction(newTxn));
    isExpense
      ? dispatch(debitAmountToAccount(acc)) // debit amount
      : dispatch(creditAmountToAccount(acc)); // credit account

    setFields({});
    setOpenAddTxn(false);
  };

  const toggleTxnModal = () => setOpenAddTxn((pre) => !pre);

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

        <div
          className={`p-2 mb-4 rounded-xl transition-all duration-300 ${
            isExpense ? "bg-rose-100" : "bg-emerald-100"
          }`}
        >
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setIsExpense(true);
                setFields({ ...fields, type: "expense" });
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isExpense
                  ? "bg-rose-500 text-white shadow-md"
                  : "bg-white text-gray-700"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => {
                setIsExpense(false);
                setFields({ ...fields, type: "income" });
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                !isExpense
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-white text-gray-700"
              }`}
            >
              Income
            </button>
          </div>
        </div>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            required
            value={fields.description || ""}
            onChange={(e) =>
              setFields({ ...fields, description: e.target.value })
            }
            placeholder="Description"
            className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
          />
          <input
            type="number"
            required
            value={fields.amount || ""}
            placeholder="Amount"
            onChange={(e) =>
              setFields({ ...fields, amount: Number(e.target.value) })
            }
            className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
          />
          <div className="flex flex-col justify-center w-full md:flex-row">
            <select
              onChange={(e) =>
                setFields({ ...fields, category: e.target.value })
              }
              className="p-3 mb-1  rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
            >
              <option value="">Select Category</option>
              {categories?.map((category, i) => (
                <option key={i} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>

            <select
              onChange={(e) =>
                setFields({ ...fields, account: e.target.value })
              }
              className="p-3 mt-1 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
            >
              <option value="">Select Account</option>
              {accounts?.map((account, i) => (
                <option key={i} value={account.name}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <Button1 handleClick={add} className="mt-2">
            Add Transaction
          </Button1>
        </form>
      </section>
    </Model>
  );
};

export default AddTxn;
