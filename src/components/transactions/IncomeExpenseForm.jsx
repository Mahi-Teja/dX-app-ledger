import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../app/state/state.transactions";
import {
  creditAmountToAccount,
  debitAmountToAccount,
} from "../../app/state/state.accounts";
import { Button1, SubmitButton } from "../buttons/button1";
import { AddCategoryModal } from "../Categories/AddCategory";
import { AddAccountModel } from "../accounts/AddAccount";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import SelectionView from "../SelectionView";

// Bugs:
// Add transaction create one + if we close it the input is filled with 'create one +'
//  and then create one+ is not opening model

const IncomeExpenseForm = ({
  isExpense,
  type,
  selectedDate,
  setOpenAddTxn,
}) => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      amount: "",
      categoryId: "",
      accountId: "",
    },
  });

  const onSubmit = (data) => {
    // Manual validation
    if (!data.description) {
      setError("description", {
        type: "manual",
        message: "Description is required",
      });
      return;
    }
    if (!data.amount || isNaN(data.amount) || data.amount <= 0) {
      setError("amount", {
        type: "manual",
        message: "Amount must be a positive number",
      });
      return;
    }
    if (!data.categoryId) {
      setError("categoryId", {
        type: "manual",
        message: "Category is required",
      });
      return;
    }
    if (!data.accountId) {
      setError("accountId", { type: "manual", message: "Account is required" });
      return;
    }

    // Additional check for category/account existence
    const account = accounts.find((acc) => acc.id === data.accountId);
    const category = categories.find(
      (cat) => String(cat.id) === String(data.categoryId)
    );

    if (!account || !category) {
      toast.error("Account or Category not found. Please try again.");
      return;
    }

    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    const newTxn = {
      id: Date.now().toString(),
      type: isExpense ? "expense" : "income",
      amount: data.amount,
      date: formattedDate,
      category: {
        id: category.id,
        name: category.category,
        icon: category.icon,
      },
      account: { id: account.id, name: account.name },
      description: data.description,
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const accPayload = {
      account,
      amount: newTxn.amount,
      type: newTxn.type,
    };

    dispatch(addTransaction(newTxn));
    isExpense
      ? dispatch(debitAmountToAccount(accPayload))
      : dispatch(creditAmountToAccount(accPayload));

    toast.success("Transaction Added.", { position: "bottom-right" });
    setOpenAddTxn(false);
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "__new__") {
      setShowAddCategoryModal(true);
    } else {
      setValue("categoryId", e.target.value);
      clearErrors("categoryId"); // Clear the error when a valid option is selected
    }
  };

  const handleAccountChange = (e) => {
    if (e.target.value === "__new__") {
      setShowAddAccountModal(true);
    } else {
      setValue("accountId", e.target.value);
      clearErrors("accountId"); // Clear the error when a valid option is selected
    }
  };

  const handleCategorySuccess = (newCategory) => {
    setValue("categoryId", newCategory.id);
    setShowAddCategoryModal(false);
  };

  const handleAccountSuccess = (newAccount) => {
    setValue("accountId", newAccount.id);
    setShowAddAccountModal(false);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("description")}
        placeholder="Description"
        className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      />
      {errors.description && (
        <p className="text-[#e41818] italic">{errors.description.message} ⚠</p>
      )}

      <input
        type="number"
        step="0.01"
        {...register("amount", { valueAsNumber: true })}
        placeholder="Amount"
        className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      />
      {errors.amount && (
        <p className="text-[#e41818] italic">{errors.amount.message} ⚠</p>
      )}

      <div className="flex flex-col gap-2 justify-center items-center w-full md:flex-row">
        <select
          {...register("categoryId")}
          onChange={handleCategoryChange}
          className="p-3 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
        >
          <option value="">Select Category</option>
          <option value="__new__">Create one +</option>
          {categories
            ?.filter((c) => c.type === type)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
        </select>

        <select
          {...register("accountId")}
          onChange={handleAccountChange}
          className="p-3 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
        >
          <option value="">Select Account</option>
          <option value="__new__">Create one +</option>
          {accounts?.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>
      {errors.categoryId && (
        <p className="text-[#e41818] italic">{errors.categoryId.message} ⚠</p>
      )}
      {errors.accountId && (
        <p className="text-[#e41818] italic">{errors.accountId.message} ⚠</p>
      )}
      {/* Custom Dropdown,with search,create integraed */}
      {/* <SelectionView
        options={accounts}
        feildName="name"
        setOpenAddModel={setShowAddAccountModal}
        onChange={(account) => setValue("accountId", account.id)}
      /> 
       <SelectionView
        options={categories}
        feildName="name"
        setOpenAddModel={setShowAddCategoryModal}
        onChange={(category) => setValue("categoryId", category.id)}
      /> */}
      <button
        className={`bg-indigo-600 rounded p-2 m-2 cursor-pointer text-white font-semibold`}
        type="submit"
      >
        Add Transaction{" "}
      </button>

      {showAddCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowAddCategoryModal(false)}
          onCancel={() => {
            setShowAddCategoryModal(false);
          }}
          onSuccess={handleCategorySuccess}
        />
      )}

      {showAddAccountModal && (
        <AddAccountModel
          onClose={() => setShowAddAccountModal(false)}
          onCancel={() => {
            setShowAddAccountModal(false);
          }}
          onSuccess={handleAccountSuccess}
        />
      )}
    </form>
  );
};

export default IncomeExpenseForm;
