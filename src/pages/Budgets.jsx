import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Model } from "../components/utils/Model";
import {
  addBudget,
  updateBudget,
  deleteBudget,
} from "../app/state/state.budgets";
import { FreeIcons } from "../utils/icons";
import { Button1 } from "../components/buttons/button1";
import EmptyFieldText from "../components/EmptyFieldText";

const BudgetsPage = () => {
  const dispatch = useDispatch();
  const budgets = useSelector((s) => s.budgets);
  const categories = useSelector((s) => s.categories);
  const transactions = useSelector((s) => s.transactions);

  const [newBudget, setNewBudget] = useState({
    categoryId: "",
    allocated: "",
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  useEffect(() => {}, []);
  useEffect(() => {}, [transactions]);

  const openEditor = (budget = {}) => {
    if (categories.length < 1) return;
    setIsEditOpen(true);
    if (budget.categoryId) {
      setNewBudget({
        categoryId: budget.categoryId,
        allocated: budget.allocated || "",
      });
    } else {
      setNewBudget({ categoryId: "", allocated: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prev) => ({
      ...prev,
      [name]: name === "allocated" ? Number(value) : value,
    }));
  };

  const handleAddBudget = () => {
    const { categoryId, allocated } = newBudget;

    if (!categoryId || !allocated) return;

    const category = categories.find((c) => c.id.toString() === categoryId);
    console.log(categoryId, category, allocated);
    if (!category) return;

    const existing = budgets.find((b) => b.categoryId === categoryId);
    const newEntry = {
      id: Date.now().toString(),
      category: {
        id: category.id,
        name: category.category,
        icon: category.icon,
      },
      icon: category.icon,
      allocated: Number(allocated),
      spent: existing?.spent || 0,
    };

    if (existing) {
      dispatch(updateBudget(newEntry));
    } else {
      dispatch(addBudget(newEntry));
    }

    setNewBudget({ categoryId: "", allocated: "" });
    setIsEditOpen(false);
  };

  const handleDelete = (budgetToDelete) => {
    dispatch(deleteBudget(budgetToDelete));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Budgets</h2>
      </div>

      {isEditOpen && (
        <Model setState={setIsEditOpen}>
          <div className="space-y-3 p-4 bg-white rounded shadow-md max-w-sm mx-auto">
            <select
              name="categoryId"
              value={newBudget.categoryId}
              onChange={handleInputChange}
              className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-600"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  onChange={handleInputChange}
                >
                  {category.category}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="allocated"
              placeholder="Allocated Amount"
              value={newBudget.allocated}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded w-full"
            />
            <Button1
              handleClick={handleAddBudget}
              className="w-full  text-white px-4 py-2 rounded "
            >
              Save Budget
            </Button1>
          </div>
        </Model>
      )}

      {budgets.length < 1 && (
        <EmptyFieldText customClass={``}>
          {categories.length < 1
            ? `You should Have atleast One Category to Add Budget.`
            : `No Budgets set, Set one!!`}
        </EmptyFieldText>
      )}
      <div className="grid gap-4  grid-cols-2 md:grid-cols-3">
        {budgets.map((b, idx) => {
          const percentage = Math.min((b.spent / b.allocated) * 100, 100);
          const isOver = b.spent > b.allocated;

          return (
            <div
              key={idx}
              className={`p-4  rounded shadow space-y-2 min-w-45 min-h-6 border-gray-200 ${
                isOver ? "bg-red-50" : "bg-green-50"
              }`}
            >
              <div className="flex justify-between gap-4 items-center font-semibold">
                <span>{b.category}</span>
                <span>
                  {b.spent} / {b.allocated}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2">
                <div
                  className={`h-2 rounded ${
                    isOver ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between pt-2 text-sm">
                <button
                  onClick={() => openEditor(b)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        <AddBudgetButton handleClick={openEditor} />
      </div>
    </div>
  );
};

const AddBudgetButton = ({ handleClick }) => (
  <button
    onClick={(e) => handleClick(e)}
    className="text-gray-100 px-4 py-2 text-3xl flex justify-center items-center border-dashed cursor-pointer  rounded shadow bg-gray-400 text-center hover:text-gray-300"
  >
    {FreeIcons.add}
  </button>
);

export default BudgetsPage;
