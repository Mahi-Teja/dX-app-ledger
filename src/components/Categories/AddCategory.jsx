import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../app/state/state.categories";
import { Button1 } from "../buttons/button1";
import { FreeIcons } from "../../utils/icons";
import { Model } from "../utils/Model";
import { createCategory } from "../../utils/create.helpers";
import toast from "react-hot-toast";

export const AddCategoryModal = ({ onClose, onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [type, setType] = useState("expense");
  const [categoryName, setCategoryName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Submit handler
  const handleAdd = () => {
    try {
      const trimmed = categoryName.trim();

      if (!type || !trimmed) {
        setError("All fields are required.");
        return;
      }

      const exists = categories.some(
        (item) => item.category.toLowerCase() === trimmed.toLowerCase()
      );

      if (exists) {
        setError("Category already exists.");
        return;
      }

      const newCategory = createCategory(type, trimmed, emoji);

      dispatch(addCategory(newCategory));
      onSuccess(newCategory);
      toast.success(`Category Added`);
      onClose();
    } catch (error) {
      toast.error(`Failed to add category`);
      console.error("Error adding category:", error);
      setError("Something went wrong while adding category.");
    }
  };

  // Keyboard handling (Enter/Esc)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
    if (e.key === "Escape") onCancel();
  };

  return (
    <Model role="dialog" aria-modal="true">
      <section
        onKeyDown={handleKeyDown}
        className="relative shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md bg-white"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Category
        </h2>

        <button
          onClick={onCancel}
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          {FreeIcons.close1}
        </button>

        {/* Toggle Type */}
        <div className="flex mb-6 rounded-full border border-gray-200 bg-gray-100 overflow-hidden">
          {["expense", "income"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`w-1/2 py-2 text-sm font-medium transition-all duration-200
                ${
                  type === t
                    ? t === "expense"
                      ? "bg-rose-500 text-white"
                      : "bg-emerald-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Category Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Category Name
          </label>
          <input
            ref={inputRef}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${
                error
                  ? "border-red-400 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
            placeholder="e.g. Groceries"
            value={categoryName}
            onChange={(e) => {
              setError("");
              setCategoryName(e.target.value);
            }}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Emoji Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Emoji (optional)
          </label>
          <input
            type="text"
            maxLength={2}
            className="w-20 p-2 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="😊"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1 italic">
            Tip: Press <kbd>Win + .</kbd> (Windows) or{" "}
            <kbd>Cmd + Ctrl + Space</kbd> (Mac) to open emoji picker.
          </p>
        </div>

        {/* Actions */}
        <Button1
          handleClick={handleAdd}
          className="w-full"
          disabled={!categoryName.trim()}
        >
          Add Category
        </Button1>
      </section>
    </Model>
  );
};
