import React, { useEffect, useState } from "react";
import { Button1 } from "./button1";
import { Model } from "./Model";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../app/state/state.transactions";
import { addToLocalDB } from "../utils/addToLocalDB";
import {
  creditAmountToAccount,
  debitAmountToAccount,
  selfTransactionAmount,
} from "../app/state/state.accounts";
import Dropdown from "../app/state/Dropdown";

const SelfTxn = ({ selectedDate, setOpenAddTxn }) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const categories = useSelector((state) => state.categories);
  const accounts = useSelector((state) => state.accounts);

  // const [txns, setTxns] = useState(transactions);
  const [fields, setFields] = useState({ to: {}, from: {}, amount: 0 });
  const [isExpense, setIsExpense] = useState(true);
  const filteredTo = accounts;
  const filteredFrom = accounts.filter((acc) => acc.id != fields.to);

  const add = () => {
    if (isNaN(fields.amount)) {
      alert("Amount should be a number");
      return;
    }
    if (fields.amount === 0) {
      alert("Enter some amount");
      return;
    }

    const toAccount = accounts.find((acc) => acc.id == fields.to);
    const fromAccount = accounts.find((acc) => acc.id == fields.from);

    if (!fromAccount || !toAccount) return alert("Select both accounts.");
    if (fromAccount === toAccount)
      return alert("From and To accounts cannot be the same.");
    if (isNaN(fields.amount) || fields.amount <= 0)
      return alert("Enter a valid amount.");
    // new transaction object
    const newTxn = {
      id: Date.now().toString(), // Ideally UUID in real apps
      type: "self",
      category: {
        id: "cat_self_txn",
        name: "Self Transaction",
        icon: "self",
      }, // or use a static ID you use in category list
      date: new Date(selectedDate).toISOString(), // Better format than UTC string
      amount: Number(fields.amount),

      // From and To (normalized structure)
      fromAccount: {
        id: fromAccount.id,
        name: fromAccount.name,
      },
      toAccount: {
        id: toAccount.id,
        name: toAccount.name,
      },

      // Optional meta fields
      description: `Transfer from '${fromAccount.name}' to '${toAccount.name}'`,
      notes: "", // user-defined notes if needed
      tags: [], // future tagging support
    };

    // new account object
    const acc = {
      fromAccount,
      toAccount,
      amount: fields.amount,
      type: "self",
    };
    dispatch(addTransaction(newTxn));
    //update State : transaction, credit and debit amount to  and from account
    dispatch(selfTransactionAmount(acc));

    setFields({});
    setOpenAddTxn(false);
  };

  return accounts.length < 2 ? (
    "Need to have min two accounts to do a self transaction."
  ) : (
    <form className="flex flex-col  gap-4">
      <div className="flex flex-col gap-3 justify-center w-full  ">
        {/* From Account */}
        <select
          onChange={(e) => setFields({ ...fields, from: e.target.value })}
          className="p-3  rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
        >
          <option value="">From Account</option>
          {filteredFrom?.map((account, i) => (
            <option key={i} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

        {/* To Account */}
        <select
          onChange={(e) => setFields({ ...fields, to: e.target.value })}
          className="p-3  rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
        >
          <option value="">To Account</option>
          {filteredTo?.map((account, i) => (
            <option key={i} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

        {/* Amount */}
        <input
          type="number"
          required
          value={fields.amount || ""}
          placeholder="Amount"
          name="amount"
          onChange={(e) =>
            setFields({ ...fields, amount: Number(e.target.value) })
          }
          className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
        />
      </div>
      <Button1 handleClick={add} className="mt-2">
        Add Transaction
      </Button1>
    </form>
  );
};

export default SelfTxn;
