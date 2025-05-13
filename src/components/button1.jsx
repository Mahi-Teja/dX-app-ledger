import React from "react";

export const Button1 = ({
  children,
  className = "",
  handleClick = () => {},
}) => {
  return (
    <button
      className={`bg-blue-600 rounded p-2 m-2 cursor-pointer text-white font-semibold ${className}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      {children}
    </button>
  );
};
