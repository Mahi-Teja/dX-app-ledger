import React, { useState, useRef, useEffect } from "react";

const SelectionView = ({ options = [], setOpenAddModel, feildName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt[feildName]?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <input
        type="text"
        value={selectedValue[feildName]}
        placeholder={selectedValue || "Select or Search..."}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        className="w-full p-2 border rounded"
      />

      {isOpen && (
        <div className="reletive z-10  w-full bg-white border rounded shadow mt-1 max-h-48 overflow-auto">
          {/* search and create one */}
          <div className="flex flex-col">
            {/* <div className=""> */}
            <input type="text" />
            {/* </div> */}
            <div
              className="p-2 text-blue-600 hover:underline cursor-pointer border-t"
              onClick={() => {
                setOpenAddModel(true);
                setIsOpen(false);
              }}
            >
              ➕ Create one
            </div>
          </div>
          <div className="overflow-auto max-h-16">
            {options.length > 0 ? (
              options.map((opt, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer "
                  onClick={() => {
                    setSelectedValue(opt);
                    setIsOpen(false);
                  }}
                >
                  {opt[feildName]}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No matches</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionView;
