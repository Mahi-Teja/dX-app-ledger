import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../app/state/state.categories";
import { Button1 } from "./button1";
import { Model } from "./Model";
import { CategoryIcons, FreeIcons } from "../utils/icons";

export const AddCategoryModal = ({ onClose, onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [type, setType] = useState("expense");
  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState(null);
  const [isSelected, setIsSelected] = useState(null);
  const [error, setError] = useState("");

  const iconsList = Object.keys(CategoryIcons);

  const handleAdd = () => {
    const trimmedCategory = categoryName.trim();

    if (!type || !trimmedCategory) {
      setError("All fields are required.");
      return;
    }

    const exists = categories.some(
      (item) => item.category.toLowerCase() === trimmedCategory.toLowerCase()
    );

    if (exists) {
      setError("Category already exists.");
      return;
    }
    const newCategory = {
      type,
      category: trimmedCategory,
      icon,
      id: Date.now(),
    };

    dispatch(addCategory(newCategory));
    onSuccess(newCategory); // Notify parent
    onClose(); // Close modal
  };

  return (
    <Model>
      <section className="relative shadow-md rounded-xl p-6 w-full max-w-md bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Category</h2>

        <button
          onClick={onCancel}
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
        >
          {FreeIcons.close1}
        </button>

        {/* Toggle Type */}
        <div
          className={`flex justify-between rounded-lg overflow-hidden mb-6 ${
            type === "expense" ? "bg-rose-100" : "bg-emerald-100"
          }`}
        >
          {["expense", "income"].map((t) => (
            <button
              key={t}
              className={`w-1/2 py-2 text-sm font-medium transition-all ${
                type === t
                  ? t === "expense"
                    ? "bg-rose-400 text-white"
                    : "bg-emerald-400 text-white"
                  : ""
              }`}
              onClick={() => setType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Input */}
        <input
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => {
            setError("");
            setCategoryName(e.target.value);
          }}
        />

        {/* Icon Grid */}
        <p className="text-xs text-center italic text-gray-500 mb-2">
          Select an icon (optional)
        </p>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {iconsList.map((iconKey, i) => (
            <div
              key={i}
              onClick={() => {
                setIsSelected((prev) => (prev === i ? null : i));
                setIcon((prevIcon) => (prevIcon === iconKey ? null : iconKey));
              }}
              className={`p-3 rounded-lg flex items-center justify-center cursor-pointer transition hover:bg-yellow-200 ${
                isSelected === i ? "bg-yellow-300" : "bg-gray-100"
              }`}
            >
              {CategoryIcons[iconKey]}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <Button1 handleClick={handleAdd} className="w-full">
          Add Category
        </Button1>
      </section>
    </Model>
  );
};
