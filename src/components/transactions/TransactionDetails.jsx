import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const TransactionDetails = ({ transaction, setIsEditing, handleDelete }) => {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 mb-10">
      <div className="flex justify-between items-start mb-4">
        {/* Category and Icon */}
        <div className="flex items-center space-x-3">
          <div className="text-xl text-gray-500">
            {/* The icon can be a custom component based on category */}
            {transaction.category.icon}
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {transaction.category.name}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            aria-label="Edit Transaction"
          >
            {/* Using a consistent icon library like Heroicons for a cleaner look */}
            {/* For example, an edit icon component */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="text-gray-500 hover:text-red-600 transition-colors duration-200"
            onClick={(e) => handleDelete(e)}
            aria-label="Delete Transaction"
          >
            {/* For example, a trash can icon component */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 01-2 0v6a1 1 0 112 0V8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span className="font-medium">Amount:</span>
          <span className="text-lg font-semibold text-blue-600">
            ₹{transaction.amount}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Description:</span>
          <p>{transaction.description || "N/A"}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Account:</span>
          <p>{transaction.account?.name || "N/A"}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Date:</span>
          <p>{format(new Date(transaction.date), "MMMM d, yyyy")}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Type:</span>
          <p
            className={`capitalize font-semibold ${
              transaction.type === "expense" ? "text-red-500" : "text-green-500"
            }`}
          >
            {transaction.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
