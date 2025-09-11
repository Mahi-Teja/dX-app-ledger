import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../app/state/state.transactions";
import { Model } from "../utils/Model";
import { CustomButton1 } from "../buttons/CustomButton1";

export const EditTxn = ({ txn, toggleEdit }) => {
  const [formData, setFormData] = useState({ ...txn });
  const accounts = useSelector((s) => s.accounts);
  const categories = useSelector((s) => s.categories);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleTypeSelect = (type) => setFormData((prev) => ({ ...prev, type }));
  const handleSave = () => {
    dispatch(updateTransaction({ id: txn.id, updatedTxn: formData }));
    toggleEdit(false);
  };
  const handleCancel = () => toggleEdit(false);

  const TYPE_COLORS = {
    income: "bg-green-500 text-white",
    expense: "bg-red-500 text-white",
    self: "bg-indigo-500 text-white",
  };

  return (
    <Model>
      <div
        className="bg-white/50 max-w-lg w-full   md:mx-auto p-6 rounded-xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
          onClick={handleCancel}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-lg md:text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Transaction
        </h2>

        {/* Type Selector */}
        <div className="flex justify-between md:mb-6 gap-3">
          {["income", "expense", "self"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeSelect(type)}
              className={`flex-1 py-2 rounded-lg font-semibold text-center transition-all ${
                formData.type === type
                  ? TYPE_COLORS[type]
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="md:space-y-4">
          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Transaction description"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              autoFocus
            />
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="₹0"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Category & Account */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category?.name || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select category</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Account</label>
              {formData.type !== "self" ? (
                <select
                  name="account"
                  value={formData.account?.name || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select account</option>
                  {accounts?.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <select
                    name="fromAccount"
                    value={formData.fromAccount?.name || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">From account</option>
                    {accounts?.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="toAccount"
                    value={formData.toAccount?.name || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">To account</option>
                    {accounts?.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <CustomButton1 variant="safe" handleClick={handleSave}>
            Save
          </CustomButton1>
          <CustomButton1 variant="danger" handleClick={handleCancel}>
            Cancel
          </CustomButton1>
        </div>
      </div>
    </Model>
  );
};
