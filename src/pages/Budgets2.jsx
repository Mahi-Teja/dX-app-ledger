// components/Budgets.jsx
import { useState } from "react";
import { v4 as uid } from "uuid";
import { BarChart3, Wallet, AlertTriangle } from "lucide-react"; // icons

// --- Helper functions ---
const calculateBudgetProgress = (budget, transactions) => {
  const spent = transactions.reduce(
    (s, t) => s + (t.type === "expense" ? t.amount : 0),
    0
  );
  const remaining = budget.amount - spent;
  const percentUsed =
    budget.amount > 0 ? Math.min(100, (spent / budget.amount) * 100) : 0;
  return { spent, remaining, percentUsed };
};

const isThresholdReached = (budget, transactions) => {
  if (!budget.thresholdPercent) return false;
  const { percentUsed } = calculateBudgetProgress(budget, transactions);
  return percentUsed >= budget.thresholdPercent;
};

// --- BudgetCard ---
const BudgetCard = ({ budget, transactions, onEdit }) => {
  const { spent, remaining, percentUsed } = calculateBudgetProgress(
    budget,
    transactions
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{budget.title}</h3>
          <p className="text-xs text-gray-500">{budget.period || "custom"}</p>
        </div>
        <button
          onClick={() => onEdit(budget)}
          className="text-sm text-indigo-600 hover:underline"
        >
          Edit
        </button>
      </div>

      {/* Amounts */}
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1 text-gray-500 text-xs">
            <Wallet size={14} /> Initial
          </span>
          <span className="font-semibold">₹{budget.amount}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="flex items-center gap-1 text-gray-500 text-xs">
            <BarChart3 size={14} /> Spent
          </span>
          <span className="font-semibold text-red-600">₹{spent}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="flex items-center gap-1 text-gray-500 text-xs">
            Net
          </span>
          <span
            className={`font-semibold ${
              remaining >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{remaining}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            percentUsed < 80 ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ width: `${percentUsed}%` }}
        ></div>
      </div>

      {/* Warning */}
      {isThresholdReached(budget, transactions) && (
        <div className="flex items-center gap-2 text-xs text-red-600">
          <AlertTriangle size={14} /> You reached {budget.thresholdPercent}% of
          this budget
        </div>
      )}
    </div>
  );
};

// --- Modal ---
const BudgetModal = ({ open, onClose, onSave, initialData }) => {
  const defaultData = {
    title: "",
    amount: "",
    currency: "INR",
    period: "monthly",
    startDate: new Date().toISOString().slice(0, 10),
    thresholdPercent: 80,
    repeat: true,
    notes: "",
  };

  const [form, setForm] = useState(initialData || defaultData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title || form.title.trim().length < 2)
      errs.title = "Enter a title";
    if (!form.amount || Number(form.amount) <= 0)
      errs.amount = "Amount must be > 0";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const payload = {
      ...form,
      id: form.id || uid(),
      amount: Number(form.amount),
      createdAt: form.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(payload);
    onClose();
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg mx-4 p-6 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Budget" : "New Budget"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
            />
            {errors.title && (
              <p className="text-xs text-red-600">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
            />
            {errors.amount && (
              <p className="text-xs text-red-600">{errors.amount}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Period</label>
            <select
              name="period"
              value={form.period}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Threshold %
            </label>
            <input
              name="thresholdPercent"
              type="number"
              value={form.thresholdPercent}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="repeat"
              checked={form.repeat}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-600">
              Auto repeat each period
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main wrapper ---
export const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions] = useState([
    { id: 1, type: "expense", amount: 2000 },
    { id: 2, type: "expense", amount: 1500 },
    { id: 3, type: "income", amount: 5000 },
  ]); // demo txns

  const [openModal, setOpenModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const handleSave = (budget) => {
    setBudgets((prev) => {
      const exists = prev.find((b) => b.id === budget.id);
      if (exists) {
        return prev.map((b) => (b.id === budget.id ? budget : b));
      }
      return [...prev, budget];
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Budgets</h1>
        <button
          onClick={() => {
            setEditingBudget(null);
            setOpenModal(true);
          }}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500"
        >
          + Add Budget
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((b) => (
          <BudgetCard
            key={b.id}
            budget={b}
            transactions={transactions}
            onEdit={(budget) => {
              setEditingBudget(budget);
              setOpenModal(true);
            }}
          />
        ))}
        {budgets.length === 0 && (
          <p className="text-sm text-gray-500">No budgets yet</p>
        )}
      </div>

      <BudgetModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        initialData={editingBudget}
      />
    </div>
  );
};
