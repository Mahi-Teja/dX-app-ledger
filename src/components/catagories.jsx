import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../app/state/state.categories";
import { Button1 } from "./button1";
import { Model } from "./Model";

const AddCategoryModal = ({ fields, updateFields, onClose, onAdd }) => (
  <Model>
    <section className="flex flex-col relative p-5 bg-blue-500">
      <div className="shadow-md rounded-lg p-6 w-96 bg-white">
        <h2 className="text-xl font-semibold mb-2">Add Category</h2>
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-3 right-5 font-bold text-lg"
        >
          ×
        </button>

        <div className="flex flex-col mt-4">
          <input
            name="type"
            onChange={updateFields}
            value={fields?.type || ""}
            className="p-3 m-1 rounded border"
            placeholder="Category Type"
          />
          <input
            name="category"
            onChange={updateFields}
            value={fields?.category || ""}
            className="p-3 m-1 rounded border"
            placeholder="Category Name"
          />
        </div>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white rounded mt-2 p-2 hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </section>
  </Model>
);

const Categories = () => {
  const [openAddAcc, setOpenAddAcc] = useState(false);
  const [fields, setFields] = useState({});
  const [localData, setLocalData] = useState({ categories: [] });

  const category = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("data"));
    if (saved?.categories) {
      setLocalData(saved);
    }
  }, []);

  const updateFields = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => setOpenAddAcc((prev) => !prev);

  const addToCategory = () => {
    const trimmedType = fields.type?.trim();
    const trimmedCategory = fields.category?.trim();

    if (!trimmedType || !trimmedCategory) {
      alert("All fields are required");
      return;
    }

    const alreadyExists = category.some(
      (item) => item.category.toLowerCase() === trimmedCategory.toLowerCase()
    );
    if (alreadyExists) {
      alert("Category already exists");
      return;
    }

    const newCategory = {
      type: trimmedType,
      category: trimmedCategory,
    };

    dispatch(addCategory(newCategory));
    setFields({});
    setOpenAddAcc(false);

    const updatedData = {
      ...localData,
      categories: [...(localData.categories || []), newCategory],
    };
    localStorage.setItem("data", JSON.stringify(updatedData));
    setLocalData(updatedData);
  };

  return (
    <section className="text-center">
      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <div className="bg-gray-100 shadow-md rounded-lg p-6 w-96">
          <h2 className="text-xl font-semibold mb-4">
            {localData?.categories?.length > 0
              ? "Your Categories"
              : "No Categories Yet"}
          </h2>

          {openAddAcc && (
            <AddCategoryModal
              fields={fields}
              updateFields={updateFields}
              onClose={toggleModal}
              onAdd={addToCategory}
            />
          )}

          <ul className="mb-4">
            {category?.map((cat, i) => (
              <li
                key={i}
                className="flex items-center justify-start p-2 m-1 rounded hover:bg-blue-200"
              >
                <img
                  src={cat?.icon || "/placeholder.png"}
                  alt="category_icon"
                  className="w-8 h-8 mr-2 border"
                />
                <div>{cat.category}</div>
              </li>
            ))}
          </ul>

          <Button1 className="w-3/4 my-1" handleClick={toggleModal}>
            Add
          </Button1>
        </div>
      </div>
    </section>
  );
};

export default Categories;
