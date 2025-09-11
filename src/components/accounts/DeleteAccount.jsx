import { useDispatch } from "react-redux";
import { deleteAccount } from "../../app/state/state.accounts";
import { Model } from "../utils/Model";
import toast from "react-hot-toast";

export const DeleteComp = ({ setOpenState, account }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAccount(account));
    setOpenState(false); // Close modal after delete
    toast.success("Account Deleted");
  };

  return (
    <Model>
      <section className="bg-white p-6 rounded flex flex-col items-center shadow-2xl">
        <section className="font-semibold mb-2">
          Are you sure you want to delete?
        </section>

        <div className="text-sm text-center mb-4">
          This action cannot be undone. This will permanently delete the
          account.
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => setOpenState(false)}
            className="bg-blue-400 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </section>
    </Model>
  );
};
