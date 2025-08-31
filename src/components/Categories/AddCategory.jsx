import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../app/state/state.categories";
import { Button1 } from "../buttons/button1";
import { FreeIcons } from "../../utils/icons";
import { Model } from "../utils/Model";

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
      icon: emoji,
      id: Date.now().toString(),
    };

    dispatch(addCategory(newCategory));
    onSuccess(newCategory);
    onClose();
  };

  return (
    <Model role="dialog" aria-modal="true">
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

        {/* Category Name */}
        <input
          ref={inputRef}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => {
            setError("");
            setCategoryName(e.target.value);
          }}
        />

        {/* Emoji Input */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">
            Emoji (optional)
          </label>
          <input
            type="text"
            maxLength={2}
            className="w-20 p-2 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="😊"
            value={emoji}
            onChange={(e) => {
              const val = e.target.value;
              setEmoji(val);
            }}
          />
          <p className="text-xs text-gray-500 mt-1 italic">
            Tip: Use <kbd>Win + .</kbd> (Windows) or{" "}
            <kbd>Cmd + Ctrl + Space</kbd> (Mac) to open emoji picker.
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

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
