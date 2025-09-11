import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addaccount } from "../../app/state/state.accounts";
import { Button1 } from "../buttons/button1";
import { Model } from "../utils/Model";
import { ACCOUNT_TYPES } from "../../utils/constants";
import toast from "react-hot-toast";

export const AddAccountModel = ({ onClose, onSuccess, onCancel }) => {
  const dispatch = useDispatch();
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
    setFields((prev) => ({
      ...prev,
      [id === "balance" ? "balance" : id === "type" ? "type" : "name"]:
        id === "balance" ? Number(value) : value,
    }));
  };

  const handleAddAccount = () => {
    const { name, balance, type, icon } = fields;

    if (!name || isNaN(balance)) {
      toast.error("All fields are required and balance must be a number");
      return;
    }

    const newId = Date.now().toString();
    const newAccount = { id: newId, name, balance, type, icon };

    try {
      dispatch(addaccount(newAccount));
      toast.success("Account created successfully!");
      onSuccess?.(newAccount);
      setFields({ name: "", balance: "", type: "cash", icon: null });
      onClose(false);
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <Model setState={onClose}>
      <section className="flex  flex-col justify-center items-center rounded-lg relative bg-white p-6 max-w-sm mx-auto w-full  ">
        {/* Header */}
        <header className="flex-shrink-0 relative mb-4">
          <h2 className="text-xl font-bold text-center">Add Account</h2>
          <button
            onClick={onCancel}
            className="absolute top-0 right-0 text-gray-500 hover:text-red-500 text-2xl"
          >
            ×
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="  space-y-4">
          <input
            autoFocus
            id="name"
            value={fields.name}
            onChange={updateFields}
            className="w-full p-3 border rounded"
            type="text"
            placeholder="Account Name"
          />

          <input
            id="balance"
            value={fields.balance}
            onChange={updateFields}
            className="w-full p-3 border rounded"
            type="number"
            placeholder="Balance"
          />

          <select
            id="type"
            value={fields.type}
            onChange={updateFields}
            className="w-full p-3 border rounded bg-white text-black"
          >
            {ACCOUNT_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          {/* Optional Emoji/Icon selector */}
          {/* <EmojiSelector setSelectedEmoji={setSelectedEmoji} selectedEmoji={selectedEmoji} /> */}
        </div>

        {/* Footer / Action */}
        <div className="mt-4 flex-shrink-0">
          <Button1 handleClick={handleAddAccount}>Add Account</Button1>
        </div>
      </section>
    </Model>
  );
};
