import { useDispatch } from "react-redux";
import { updateAccount } from "../../app/state/state.accounts";
import { ACCOUNT_TYPES } from "../../utils/constants";
import { CustomButton1 } from "../buttons/CustomButton1";
import { useState } from "react";
import { Model } from "../utils/Model";

export const EditDetailsComp = ({ editDetails, toggleEdit }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(editDetails.type);
  const [editFields, setEditFields] = useState(editDetails);

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
      <section className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Editing {editDetails?.name} Account
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={editFields.name || ""}
            onChange={updateOnChange}
            className="w-full p-3 rounded border border-gray-300 bg-white text-black"
            placeholder="Enter name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm text-gray-600 mb-1">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              updateOnChange(e);
            }}
            className="w-full p-3 rounded border border-gray-300 bg-white text-black"
          >
            {ACCOUNT_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="balance" className="block text-sm text-gray-600 mb-1">
            Balance
          </label>
          <input
            id="balance"
            type="number"
            name="balance"
            value={editFields.balance}
            onChange={updateOnChange}
            className="w-full p-3 rounded border border-gray-300 bg-white text-black"
            placeholder="Enter balance"
          />
        </div>

        <div className="flex justify-between gap-4">
          <CustomButton1 variant="danger" handleClick={handleEdit}>
            Save
          </CustomButton1>
          <CustomButton1 variant="safe" handleClick={handleCancel}>
            Cancel
          </CustomButton1>
        </div>
      </section>
    </Model>
  );
};
