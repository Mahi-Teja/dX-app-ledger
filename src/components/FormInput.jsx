import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error = "",
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-3 rounded-lg bg-white border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-400" : "focus:ring-blue-400"
        } placeholder-gray-500 text-gray-700`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
