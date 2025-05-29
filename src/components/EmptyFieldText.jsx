import React from "react";

const EmptyFieldText = ({ children }) => {
  return (
    <h1 className="text-center bg-gray-600 text-gray-400 rounded italic">
      {children}
    </h1>
  );
};

export default EmptyFieldText;
