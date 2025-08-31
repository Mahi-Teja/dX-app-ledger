import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../app/state/state.transactions";
import {
  creditAmountToAccount,
  debitAmountToAccount,
} from "../../app/state/state.accounts";
import { Button1 } from "../buttons/button1";
import { AddCategoryModal } from "../Categories/AddCategory";
import { AddAccountModel } from "../accounts/AddAccount";
import SelectionView from "../SelectionView";

const IncomeExpenseForm = ({
  isExpense,
  type,
  selectedDate,
  setOpenAddTxn,
}) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    description: "",
    amount: "",
    categoryId: "",
    accountId: "",
  });
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  const [returnedCategory, setReturnedCategory] = useState(null);
  const [returnedAccount, setReturnedAccount] = useState(null);

  const openAddCategoryModal = () => setShowAddCategoryModal(true);
  const openAddAccountModal = () => setShowAddAccountModal(true);

  const updateFields = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const add = () => {
    const { description, amount, categoryId, accountId } = fields;

    if (!description || !amount || !categoryId || !accountId) {
      alert("Please fill all fields");
      return;
    }

    if (isNaN(amount)) {
      alert("Amount should be a number");
      return;
    }

    const account = accounts.find((acc) => acc.id === accountId);
    const category = categories.find((cat) => {
      return String(cat.id) === String(categoryId);
    });

    // 🛑 Safety check
    if (!account || !category) {
      alert("Account or Category not found. Please try again.");
      return;
    }

    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    const newTxn = {
      id: Date.now().toString(),
      type: isExpense ? "expense" : "income",
      amount,
      date: formattedDate,
      category:
        returnedCategory && returnedCategory.id === categoryId
          ? {
              id: returnedCategory.id,
              name: returnedCategory.category,
              icon: returnedCategory.icon,
            }
          : {
              id: category.id,
              name: category.category,
              icon: category.icon,
            },
      account:
        returnedAccount && returnedAccount.id === accountId
          ? {
              id: returnedAccount.id,
              name: returnedAccount.name,
            }
          : {
              id: account.id,
              name: account.name,
            },

      description,
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
    };

    const accPayload = {
      account,
      amount,
      type: newTxn.type,
    };

    dispatch(addTransaction(newTxn));
    isExpense
      ? dispatch(debitAmountToAccount(accPayload))
      : dispatch(creditAmountToAccount(accPayload));

    setFields({ description: "", amount: "", categoryId: "", accountId: "" });
    setOpenAddTxn(false);
  };
  if (showAddCategoryModal)
    return (
      <AddCategoryModal
        onClose={() => {
          setShowAddCategoryModal(false);
        }}
        onCancel={() => {
          setShowAddCategoryModal(false);
          setFields((prev) => ({ ...prev, categoryId: "" }));
        }}
        onSuccess={(newCategory) => {
          setReturnedCategory(newCategory);
          setFields((prev) => ({ ...prev, categoryId: newCategory.id }));
          setShowAddCategoryModal(false);
        }}
      />
    );

  if (showAddAccountModal)
    return (
      <AddAccountModel
        onClose={() => {
          setShowAddAccountModal(false);
        }}
        onCancel={() => {
          setShowAddAccountModal(false);
          setFields((prev) => ({ ...prev, accountId: "" }));
        }}
        onSuccess={(newAccount) => {
          setReturnedAccount(newAccount);
          setFields((prev) => ({ ...prev, accountId: newAccount.id }));
          setShowAddAccountModal(false);
        }}
      />
    );

  return (
    <form className="flex flex-col gap-2">
      <input
        type="text"
        name="description"
        required
        value={fields.description}
        onChange={updateFields}
        placeholder="Description"
        className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      />
      <input
        type="number"
        name="amount"
        required
        value={fields.amount}
        onChange={updateFields}
        placeholder="Amount"
        className="p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
      />
      <div className="flex flex-col  gap-2 justify-center items-center w-full md:flex-row">
        <select
          name="categoryId"
          value={fields.categoryId}
          onChange={(e) => {
            if (e.target.value === "__new__") {
              openAddCategoryModal();
            } else {
              updateFields(e);
            }
          }}
          className="p-3   w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
        >
          <option value="">Select Category</option>
          <option value="__new__" className="  font-medium">
            create one +{}
          </option>
          {categories?.map((category) => {
            return (
              category.type === type && (
                <option key={category.category} value={category.id}>
                  {category.category}
                </option>
              )
            );
          })}
        </select>

        <select
          name="accountId"
          value={fields.accountId}
          onChange={(e) => {
            if (e.target.value === "__new__") {
              openAddAccountModal();
            } else {
              updateFields(e);
            }
          }}
          className="p-3 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
        >
          <option value="">Select Account</option>
          <option
            onClick={() => setShowAddAccountModal(true)}
            value="__new__"
            className="  font-medium"
          >
            create one +{}
          </option>
          {accounts?.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>
      {/* {showAddCategoryModal && (
        <AddCategoryModal
          onClose={() => {
            setShowAddCategoryModal(false);
          }}
          onCancel={() => {
            setShowAddCategoryModal(false);
            setFields((prev) => ({ ...prev, categoryId: "" }));
          }}
          onSuccess={(newCategory) => {
            setReturnedCategory(newCategory);
            setFields((prev) => ({ ...prev, categoryId: newCategory.id }));
            setShowAddCategoryModal(false);
          }}
        />
      )}
      

      {showAddAccountModal && (
        <AddAccountModel
          onClose={() => {
            setShowAddAccountModal(false);
          }}
          onCancel={() => {
            setShowAddAccountModal(false);
            setFields((prev) => ({ ...prev, accountId: "" }));
          }}
          onSuccess={(newAccount) => {
            setReturnedAccount(newAccount);
            setFields((prev) => ({ ...prev, accountId: newAccount.id }));
            setShowAddAccountModal(false);
          }}
        />
      )} */}
      {/* <SelectionView
        setReturnValue={setReturnedAccount}
        options={accounts}
        feildName={"name"}
        openAddModel={showAddAccountModal}
        setOpenAddModel={setShowAddAccountModal}
      /> */}
      <Button1 handleClick={add} className="mt-2">
        Add Transaction
      </Button1>
    </form>
  );
};

export default IncomeExpenseForm;
