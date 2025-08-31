import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addaccount } from "../app/state/state.accounts";
import { Button1 } from "./button1";
import { Model } from "./Model";
import EmojiSelector from "./EmojiPicker"; // Ensure this is correctly imported
import { ACCOUNT_TYPES } from "../utils/constants"; // Replace with your actual import

export const AddAccountModel = ({ onClose, onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("cash");
  const [fields, setFields] = useState({
    name: "",
    balance: "",
    type: "cash",
    icon: null,
  });
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  useEffect(() => {
    setFields((prev) => ({ ...prev, icon: selectedEmoji }));
  }, [selectedEmoji]);

  const updateFields = (e) => {
    const { id, value } = e.target;

    if (id === "balance") {
      setFields((prev) => ({ ...prev, balance: Number(value) }));
    } else if (id === "accType") {
      setFields((prev) => ({ ...prev, type: value }));
      setSelectedValue(value);
    } else if (id === "accName") {
      setFields((prev) => ({ ...prev, name: value }));
    }
  };

  const handleAddAccount = () => {
    const { name, balance, type, icon } = fields;

    if (!name || isNaN(balance)) {
      alert("All fields are required and balance must be a number");
      return;
    }

    const newId = Date.now().toString();
    const newAccount = {
      id: newId,
      name,
      balance,
      type,
      icon,
    };

    dispatch(addaccount(newAccount));
    onSuccess?.(newAccount); // Return ID to parent
    setFields({ name: "", balance: "", type: "cash", icon: null });
    onClose(false);
  };

  return (
    <Model setState={onClose}>
      <section className="flex justify-center items-center rounded-lg relative p-8 bg-white">
        <section className="flex flex-col w-full max-w-sm">
          <div className="shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold text-center">Add Account</h2>
            <button
              onClick={onCancel}
              className="absolute top-4 right-6 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col">
            <input
              autoFocus
              id="accName"
              onChange={updateFields}
              value={fields.name}
              className="p-3 m-1 rounded border"
              type="text"
              placeholder="Account Name"
            />
            <input
              id="balance"
              onChange={updateFields}
              value={fields.balance}
              className="p-3 m-1 rounded border"
              type="number"
              placeholder="Balance"
            />
            <select
              id="accType"
              value={selectedValue}
              onChange={updateFields}
              className="p-3 m-1 rounded border bg-white text-black"
            >
              {ACCOUNT_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* <EmojiSelector
              setSelectedEmoji={setSelectedEmoji}
              selectedEmoji={selectedEmoji}
            /> */}
          </div>

          <Button1 handleClick={handleAddAccount}>Add</Button1>
        </section>
      </section>
    </Model>
  );
};
