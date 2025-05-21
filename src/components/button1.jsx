import React from "react";

export const Button1 = ({
  children,
  className = "",
  handleClick = () => {},
  title = "",
}) => {
  return (
    <button
      className={`bg-indigo-600 rounded p-2 m-2 cursor-pointer text-white font-semibold ${className}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      title={title}
    >
      {children}
    </button>
  );
};
