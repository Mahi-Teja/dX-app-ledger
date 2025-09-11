import React, { useState, useRef, useEffect } from "react";

const SelectionView = ({
  options = [],
  setOpenAddModel,
  feildName,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  // filter options
  const filteredOptions = options.filter((opt) =>
    opt[feildName]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle option select
  const handleSelect = (opt) => {
    setSelectedValue(opt);
    setSearchTerm("");
    setIsOpen(false);
    onChange?.(opt); // pass selected value to parent
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      {/* Input */}
      <input
        type="text"
        value={isOpen ? searchTerm : selectedValue?.[feildName] || ""}
        placeholder="Select or Search..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-48 overflow-auto">
          {/* Create one */}
          <div
            className="p-2 text-blue-600 hover:underline cursor-pointer border-b"
            onClick={() => {
              setOpenAddModel(true);
              setIsOpen(false);
            }}
          >
            ➕ Create one
          </div>

          {/* Options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, i) => (
              <div
                key={i}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(opt)}
              >
                {opt[feildName]}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No matches</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectionView;
