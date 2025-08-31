import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button1 } from "../components/button1";
import { CategoryIcons } from "../utils/icons";
import { AddCategoryModal } from "./AddCategory";
import { EmptyWithAction } from "./EmptyFieldText";

const Categories = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const categories = useSelector((state) => state.categories);

  return (
    <section className="w-full flex flex-col items-center">
      {categories.length > 0 && (
        <header className="w-full flex flex-col items-center mt-6 mb-4">
          <div className="flex justify-between items-center w-full max-w-3xl px-4">
            <h2 className="text-xl font-semibold">Your Categories</h2>
            <Button1 handleClick={() => setOpenAddModal(true)}>Add</Button1>
          </div>
        </header>
      )}

      {openAddModal && (
        <AddCategoryModal
          onClose={() => setOpenAddModal(false)}
          onSuccess={() => setOpenAddModal(false)}
          onCancel={() => setOpenAddModal(false)}
        />
      )}

      {categories.length < 1 ? (
        <EmptyWithAction
          message="No Categories,"
          icon="🚧"
          buttonText="Add One"
          onClick={setOpenAddModal}
        />
      ) : (
        <div className="w-full max-w-3xl px-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {categories.map((cat, i) => (
              <li
                key={i}
                className="flex items-center justify-between bg-gray-100 hover:bg-blue-100 p-4 rounded-lg transition cursor-pointer"
              >
                <span className="text-2xl text-gray-800">
                  {CategoryIcons[cat?.icon] || cat?.icon}
                </span>
                <span className="text-md font-medium">{cat.category}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Categories;
