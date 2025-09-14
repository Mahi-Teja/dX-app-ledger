import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button1 } from "../buttons/button1";
import { addTransaction } from "../../app/state/state.transactions";
import { selfTransactionAmount } from "../../app/state/state.accounts";
import { addCategory } from "../../app/state/state.categories";
import toast from "react-hot-toast";
import { createCategory } from "../../utils/create.helpers";

const SelfTxn = ({ selectedDate, setOpenAddTxn }) => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { from: "", to: "", amount: "" },
  });

  const watchFrom = watch("from");

  const addSelfTxn = (data) => {
    const { from, to, amount } = data;
    if (from === to) {
      setError("to", { message: "From and To accounts cannot be the same" });
      return;
    }

    const fromAccount = accounts.find((acc) => acc.id === from);
    const toAccount = accounts.find((acc) => acc.id === to);

    if (!fromAccount) {
      setError("from", { message: "Please select a valid 'From' account" });
      return;
    }
    if (!toAccount) {
      setError("to", { message: "Please select a valid 'To' account" });
      return;
    }

    // ✅ ensure "Self Transaction" category exists
    let selfCategory = categories.find(
      (c) => c.category === "Self" && c.type === "self"
    );
    if (!selfCategory) {
      selfCategory = createCategory("self", "Self", "🔄");

      dispatch(addCategory(selfCategory));
    }

    // ✅ create transaction object
    const newSelfTxn = {
      id: Date.now().toString(),
      type: "self",
      category: {
        id: selfCategory.id,
        name: selfCategory.category,
        icon: selfCategory.icon,
      },
      date: new Date(selectedDate).toISOString(),
      amount: parseFloat(amount),
      fromAccount: { id: fromAccount.id, name: fromAccount.name },
      toAccount: { id: toAccount.id, name: toAccount.name },
      description: `Transfer from '${fromAccount.name}' to '${toAccount.name}'`,
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addTransaction(newSelfTxn));
    dispatch(
      selfTransactionAmount({
        fromAccount,
        toAccount,
        amount: parseFloat(amount),
        type: "self",
      })
    );
    toast.success("Self transaction Added.");

    reset();
    setOpenAddTxn(false);
  };

  if (accounts.length < 2) {
    return <p>Need to have at least two accounts to do a self transaction.</p>;
  }

  return (
    <form onSubmit={handleSubmit(addSelfTxn)} className="flex flex-col gap-4">
      {/* From Account */}
      <div>
        <select
          {...register("from", { required: "From account is required" })}
          className="p-3 w-full rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-600"
        >
          <option value="">From Account</option>
          {accounts
            .filter((acc) => acc.id !== watch("to")) // prevent same as 'to'
            .map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
        </select>
        {errors.from && (
          <p className="text-red-500 text-sm">{errors.from.message}</p>
        )}
      </div>

      {/* To Account */}
      <div>
        <select
          {...register("to", { required: "To account is required" })}
          className="p-3 w-full rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-600"
        >
          <option value="">To Account</option>
          {accounts
            .filter((acc) => acc.id !== watchFrom) // prevent same as 'from'
            .map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
        </select>
        {errors.to && (
          <p className="text-red-500 text-sm">{errors.to.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <input
          type="number"
          placeholder="Amount"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 1, message: "Amount must be greater than 0" },
          })}
          className="p-3 w-full rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      <button type="submit" className="mt-2">
        Add Transaction
      </button>
    </form>
  );
};

export default SelfTxn;
