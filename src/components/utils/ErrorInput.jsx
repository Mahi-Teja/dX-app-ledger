import React from "react";

const ErrorInput = ({ children }) => {
  return <div className="text-red-600 ">{children || "Feild required"}</div>;
};

export default ErrorInput;
