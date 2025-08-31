import { useState } from "react";
import { CategoryIcons, FreeIcons } from "../../utils/icons";

import { MONTHS_LIST } from "../../utils/constants";

import { useDispatch, useSelector } from "react-redux";

import { CustomButton1 } from "../buttons/CustomButton1";

import { formatDate } from "../../utils/dates";

import {
  deleteTransaction,
  updateTransaction,
} from "../../app/state/state.transactions";
import { Model } from "../utils/Model";

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

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleSave = () => {
    // update the txn.

    // updateTxn asks for id and updatedTxn in payload

    const payload = {
      id: txn.id,

      updatedTxn: formData,
    };

    dispatch(updateTransaction(payload));

    toggleEdit(false);
  };

  const handleCancel = () => {
    console.log("cancel");

    toggleEdit(false);
  };

  return (
    <Model>
      <div
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="text-red-600 float-right" onClick={handleCancel}>
          ✖
        </button>
          {/* description and Amount */}{" "}
        <div className="mt-6 space-y-4">
                   {" "}
          {["description", "amount"].map((field) => (
            <div key={field}>
                           {" "}
              <label className="block font-semibold capitalize">{field}</label> 
                         {" "}
              <input
                type={field === "amount" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded p-2"
                autoFocus={field === "description"}
              />
            </div>
          ))}
          {/* Time and date */}
          <div className="mt-6 space-y-4">
            {console.log(formData)}
            <input
              type="date"
              name="date"
              value={formData?.date}
              onChange={handleChange}
            />
          </div>
          {/* Category,Account and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              {" "}
              <label className="block font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option disabled>Select category</option>
                {categories?.map((c) => (
                  <option key={c.category} value={c.category}>
                    {c.category}
                  </option>
                ))}
              </select>
            </div>
            {/* Account */}
            <div>
              <label className="block font-semibold">Account</label>
              <select
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                                <option disabled>Select account</option>       
                {accounts?.map((a) => (
                  <option key={a.name} value={a.name}>
                                        {a.name}                 {" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Type */}
          <div className="flex gap-4 mt-4">
            {["income", "expense", "self"].map((type) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={`px-4 py-2 rounded ${
                  formData.type === type
                    ? type === "income"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}       
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <CustomButton1 variant="safe" handleClick={handleSave}>
            Save
          </CustomButton1>
          <CustomButton1 variant="danger" handleClick={handleCancel}>
            Cancel
          </CustomButton1>
        </div>{" "}
      </div>
    </Model>
  );
};
