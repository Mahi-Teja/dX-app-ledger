import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../app/state/state.transactions";
import {
  creditAmountToAccount,
  debitAmountToAccount,
} from "../app/state/state.accounts";
import { Button1 } from "./button1";

const IncomeExpenseForm = ({ isExpense, seldectedDate, setOpenAddTxn }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({});
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);

  console.log(fields);

  const updateFields = (e) => {
    const { name, value } = e.target;
    name == "amount" || name == "balance"
      ? setFields((pre) => ({ ...pre, [name]: Number(value) }))
      : setFields((pre) => ({ ...pre, [name]: value }));
  };

  console.log(seldectedDate);

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
    const ddd = new Date(seldectedDate)?.toISOString().split("T")[0];

    // new transaction object
    const newTxn = {
      id: Date.now().toString(),
      description: fields.description,
      amount: fields.amount,
      date: ddd,
      type: isExpense ? "expense" : "income",
      category: fields.category,
      account: fields.account,
    };
    console.log(newTxn);

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

  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        name="description"
        required
        value={fields.description || ""}
        onChange={(e) => updateFields(e)}
        placeholder="Description"
        className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      />
      <input
        type="number"
        name="amount"
        required
        value={fields.amount || ""}
        placeholder="Amount"
        onChange={(e) => updateFields(e)}
        className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      />
      <div className="flex flex-col justify-center w-full md:flex-row">
        <select
          name="category"
          onChange={(e) => updateFields(e)}
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
          name="account"
          onChange={(e) => updateFields(e)}
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
  );
};

export default IncomeExpenseForm;
