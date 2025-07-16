import { useState } from "react";
// import { EditTxn } from "./EditTxn";
import { CategoryIcons, FreeIcons } from "../../utils/icons";
import { MONTHS_LIST } from "../../utils/constants";

import { useSelector } from "react-redux";
import { Model } from "../Model";
import { CustomButton1 } from "../buttons/CustomButton1";
import { formatDate } from "../../utils/dates";

export const EditTxn = ({ txn, toggleEdit }) => {
  const [formData, setFormData] = useState({ ...txn });
  const accounts = useSelector((s) => s.accounts);
  const categories = useSelector((s) => s.categories);

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
    // dispatch(updateTxn(formData));
    toggleEdit(false);
  };

  const handleCancel = () => {
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

        <div className="mt-6 space-y-4">
          {["description", "amount"].map((field) => (
            <div key={field}>
              <label className="block font-semibold capitalize">{field}</label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
        </div>
      </div>
    </Model>
  );
};

export const TxnItem = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const txnDate = new Date(transaction.date);
  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const TransactionSummary = () => (
    <ul className="flex  justify-evenly items-center text-gray-900 font-medium">
      <li className="text-sm  w-1/4">
        {MONTHS_LIST[txnDate.getMonth()].slice(0, 3)} {txnDate.getDate()}
      </li>
      <li className="text-xl  w-1/4">
        {CategoryIcons[transaction.category.icon?.toLowerCase()]}
      </li>
      <li className="text-lg font-semibold  w-full">
        {transaction.description}
      </li>
      <li
        className={` w-1/2 text-center ${
          transaction.type === "self"
            ? "font-bold text-indigo-600"
            : transaction.type === "income"
            ? "text-green-600 font-bold"
            : "text-red-600 font-bold"
        }`}
      >
        {transaction.type === "self"
          ? ""
          : transaction.type === "income"
          ? "+"
          : "-"}
        {transaction.amount}
      </li>
    </ul>
  );

  const TransactionDetails = () => (
    <div className="mt-4 mb-10 text-sm text-gray-700 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {CategoryIcons[transaction.category.icon?.toLowerCase()]}
          <span className="font-semibold">{transaction.category.name}</span>
        </div>
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          {FreeIcons.edit}
        </button>
      </div>
      <p>Date: {formatDate(transaction.date).allDate}</p>
      <p>Type: {transaction.type}</p>
      <p>Description: {transaction.description}</p>
      <p>Amount: ₹{transaction.amount}</p>
      <p>Account: {transaction.account?.name}</p>
    </div>
  );

  return isEditing ? (
    <EditTxn txn={transaction} toggleEdit={setIsEditing} />
  ) : (
    <div
      className={`txn-item m-2 p-3 rounded-lg cursor-pointer md:max-w-[60vw] mx-auto shadow-md bg-white transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-lg ${
        transaction.type === "income"
          ? "border-l-4 border-green-500 hover:bg-green-50"
          : "border-l-4 border-red-500 hover:bg-red-50"
      }`}
      onClick={toggleExpanded}
    >
      <TransactionSummary />
      {isExpanded && <TransactionDetails />}
    </div>
  );
};
