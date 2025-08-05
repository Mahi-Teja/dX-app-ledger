import React from "react";

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
  icon = "🎯",
  buttonText = "Add New",
  onClick,
}) => (
  <div className="flex flex-col items-center justify-center  w-full py-16 text-center text-gray-600">
    <div className="bg-gradient-to-b from-[#c2e8c8] to-[#9394bc] backdrop-blur-3xl  rounded-xl p-40">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-lg mb-4">{message}</p>
      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>
    </div>
  </div>
);
