import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../app/state/state.transactions";
import { format, parseISO } from "date-fns";
import { BsArrowRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { EditTxn } from "./EditTransaction";
import { ArrowIcons, CategoryIcons } from "../../utils/icons";

export const TxnItem = ({ transaction, openId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const toggleExpanded = () => setIsExpanded((prev) => !prev);
  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteTransaction({ id: transaction?.id }));
    setIsEditing(false);
  };

  const isIncome = transaction.type === "income";
  const isSelf = transaction.type === "self";

  if (isEditing) {
    return <EditTxn txn={transaction} toggleEdit={setIsEditing} />;
  }

  return (
    <div
      className={`bg-[#fff] rounded   p-2  shadow-sm hover:shadow-md hover:bg-[#ddd]  transition-all duration-200 ease-in-out cursor-pointer   max-w-full
      ${
        // isIncome ? "border-l-4 border-green-500" : "border-l-4 border-red-500"
        ""
      }`}
      onClick={toggleExpanded}
    >
      {/* Transaction Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Category Icon */}
          <div className="flex-shrink-0 text-lg sm:text-xl text-gray-600">
            {isSelf
              ? CategoryIcons.self
              : isIncome
              ? ArrowIcons.incArrow
              : ArrowIcons.decArrow}
          </div>

          {/* Info */}
          <div className="flex gap-4  justify-around  items-center min-w-0">
            <span className="text-xs sm:text-sm text-gray-500">
              {transaction.date
                ? format(parseISO(transaction.date), "MMM d, yyyy")
                : "N/A"}
            </span>
            <span className="text-sm sm:text-base font-semibold text-gray-900 truncate">
              {transaction.description || "No Description"}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="flex items-center ml-3 sm:ml-4">
          {!isSelf ? (
            <span
              className={`text-sm sm:text-lg font-bold ${
                isIncome ? "text-green-600" : "text-red-600"
              }`}
            >
              {isIncome ? "+" : "-"}₹{transaction.amount}
            </span>
          ) : (
            <span className="text-lg font-bold text-indigo-600">
              <BsArrowRight />
            </span>
          )}
        </div>
      </div>

      {/* Transaction Details (Expanded) */}
      {isExpanded && (
        <>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm text-gray-700">
              <span className="font-medium text-gray-500">Category:</span>
              <span className="text-right">{transaction.category.name}</span>

              {isSelf ? (
                <>
                  <span className="font-medium text-gray-500">From:</span>
                  <span className="text-right">
                    {transaction.fromAccount?.name || "N/A"}
                  </span>
                  <span className="font-medium text-gray-500">To:</span>
                  <span className="text-right">
                    {transaction.toAccount?.name || "N/A"}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-medium text-gray-500">Account:</span>
                  <span className="text-right">
                    {transaction.account?.name || "N/A"}
                  </span>
                </>
              )}

              <span className="font-medium text-gray-500">Type:</span>
              <span className="text-right capitalize">{transaction.type}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-3 space-x-2 sm:space-x-3">
            <button
              className="p-1.5 rounded-md hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
              onClick={handleEdit}
              aria-label="Edit transaction"
            >
              <BsPencilSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              className="p-1.5 rounded-md hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
              onClick={handleDelete}
              aria-label="Delete transaction"
            >
              <BsTrash className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
