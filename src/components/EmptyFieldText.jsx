import React from "react";
import { FolderOpen, PlusCircle } from "lucide-react"; // example icons

const EmptyFieldText = ({ children, customClass }) => {
  return (
    <h1
      className={`text-center bg-gray-600 text-gray-400 rounded italic ${customClass}`}
    >
      {children}
    </h1>
  );
};

export default EmptyFieldText;


export const EmptyWithAction = ({
  message = "No items found",
  icon: Icon = FolderOpen, // default icon
  buttonText = "Add New",
  onClick,
}) => (
  <div className="flex flex-col items-center justify-center w-full py-12 px-4 text-center text-gray-600">
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 sm:p-12 max-w-sm w-full">
      {/* Icon */}
      <div className="mb-4 text-indigo-500">
        <Icon size={56} strokeWidth={1.5} className="mx-auto" />
      </div>

      {/* Message */}
      <p className="text-base sm:text-lg font-medium mb-6">{message}</p>

      {/* Action Button */}
      <button
        onClick={onClick}
        className="w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-6 py-2.5 
                   bg-indigo-600 text-white font-medium rounded-xl shadow-md
                   hover:bg-indigo-700 active:scale-95 transition-transform duration-150"
      >
        <PlusCircle size={18} />
        {buttonText}
      </button>
    </div>
  </div>
);

