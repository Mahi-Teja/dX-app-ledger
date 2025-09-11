import React from "react";

const IconButton = ({ handleClick, children }) => {
  return (
    <button
      className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
      onClick={(e) => handleClick(e)}
    >
      {children}
    </button>
  );
};

export default IconButton;
