import React, { useState } from "react";

const Dropdown = ({
  defaultValue,
  selected,
  setSelected,
  label = "Select",
  items = [],
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (item) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex justify-between w-40 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          {items[selected] || label}
          <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute z-10 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(idx)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
