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
