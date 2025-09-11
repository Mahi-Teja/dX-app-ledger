import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateAccount } from "../../app/state/state.accounts";
import { ACCOUNT_TYPES } from "../../utils/constants";
import { CustomButton1 } from "../buttons/CustomButton1";
import { Model } from "../utils/Model";

export const EditDetailsComp = ({ editDetails, toggleEdit }) => {
  const dispatch = useDispatch();
  const [editFields, setEditFields] = useState(editDetails);
  const [selectedType, setSelectedType] = useState(editDetails.type);

  const updateOnChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]: name === "balance" ? Number(value) : value,
    }));
  };

  const handleEdit = () => {
    dispatch(updateAccount({ editedAccount: editFields }));
    setEditFields({});
    toggleEdit(false);
  };

  const handleCancel = () => {
    setEditFields({});
    toggleEdit(false);
  };

  return (
    <Model>
      <section className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-black/10 shadow-lg w-full max-w-lg">
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Edit <span className="text-indigo-600">{editDetails?.name}</span>
        </h2>

        {/* Name field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
            Account Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={editFields.name || ""}
            onChange={updateOnChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="Enter account name"
          />
        </div>

        {/* Type field */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-600 mb-1">
            Account Type
          </label>
          <select
            id="type"
            name="type"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              updateOnChange(e);
            }}
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none text-gray-900"
          >
            {ACCOUNT_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Balance field */}
        <div className="mb-6">
          <label htmlFor="balance" className="block text-sm font-medium text-gray-600 mb-1">
            Current Balance
          </label>
          <input
            id="balance"
            type="number"
            name="balance"
            value={editFields.balance}
            onChange={updateOnChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="Enter balance"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <CustomButton1 variant="safe" handleClick={handleCancel}>
            Cancel
          </CustomButton1>
          <CustomButton1 variant="danger" handleClick={handleEdit}>
            Save
          </CustomButton1>
        </div>
      </section>
    </Model>
  );
};
