import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../app/state/state.categories";
import { Button1 } from "./button1";
import { Model } from "./Model";
import { CategoryIcons, FreeIcons } from "../utils/icons";

const AddCategoryModal = ({
  fields,
  setFieldsData,
  updateFields,
  onClose,
  onAdd,
}) => {
  const [isSelected, setIsSelected] = useState(null);
  const iconsList = Object.keys(CategoryIcons);

  return (
    <Model>
      <section className="shadow-md rounded-lg p-6 lg:w-96 bg-white">
        <h2 className="text-xl font-semibold mb-2">Add Category</h2>
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute cursor-pointer top-8 right-10 font-bold text-lg"
        >
          {FreeIcons.close1}
        </button>

        <section className="flex flex-col ">
          <input
            name="category"
            onChange={updateFields}
            value={fields?.category || ""}
            className="p-3 m-1 rounded border"
            placeholder="Category Name"
          />
          <div className="">
            <p className="text-xs md:text-sm italic text-center text-gray-500">
              Select one icon (optional)
            </p>
            <div className="grid grid-cols-4">
              {iconsList.map((icon, i) => {
                return (
                  <div
                    onClick={() => {
                      setIsSelected((pre) => (pre == i ? null : i)),
                        setFieldsData((pre) =>
                          pre.icon == icon
                            ? { ...pre, icon: null }
                            : { ...pre, icon }
                        );
                    }}
                    className={`p-4 cursor-pointer flex m-0.5 rounded justify-center items-center active:bg-[#dbdb58] hover:bg-[#dbdb58e6] hover:p-2 ${
                      isSelected == i && "bg-[#dfdf47e6] "
                    }`}
                    key={i}
                    value={icon}
                  >
                    {/* {icon} */}
                    {CategoryIcons[icon]}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Button1 handleClick={onAdd} className={"w-full"}>
          Add
        </Button1>
      </section>
    </Model>
  );
};
const Categories = () => {
  const [openAddAcc, setOpenAddAcc] = useState(false);
  const [fields, setFields] = useState({});
  // useselector
  const category = useSelector((state) => state.categories);

  // const transactions = useSelector((state) => state.transactions);

  const dispatch = useDispatch();

  const updateFields = (e) => {
    // console.log(fields);

    const { name, value } = e.target;

    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => setOpenAddAcc((prev) => !prev);

  const addToCategory = () => {
    const trimmedType = fields.type?.trim();
    const trimmedCategory = fields.category?.trim();
    const icon = fields?.icon;

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
      icon,
    };

    dispatch(addCategory(newCategory));
    setFields({});
    setOpenAddAcc(false);
  };

  return (
    <section className="  ">
      <div className="flex flex-col items-center justify-center    ">
        <section className="flex items-center justify-around mt-6 mb-3 md:justify-center  md:gap-36 w-full ">
          <h2 className="text-xl font-semibold  ">
            {category?.length > 0 ? "Your Categories" : "No Categories Yet"}
          </h2>
          <Button1 className="" handleClick={toggleModal}>
            Add
          </Button1>
        </section>
        <div className="bg-gray-100 shadow-md rounded-lg p-6 min-w-[40vh] md:min-w-[70vh] lg:max-w-[90vh] ">
          {openAddAcc && (
            <AddCategoryModal
              fields={fields}
              updateFields={updateFields}
              onClose={toggleModal}
              onAdd={addToCategory}
              setFieldsData={setFields}
            />
          )}

          <ul className="mb-4">
            {category?.map((cat, i) => {
              return (
                <li
                  key={i}
                  className="flex gap-4 items-center justify-start p-2 m-1 rounded hover:bg-blue-200"
                >
                  <span className="text-2xl text-[#000000]">
                    {CategoryIcons[cat?.icon]}
                  </span>
                  <div>{cat.category}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Categories;
