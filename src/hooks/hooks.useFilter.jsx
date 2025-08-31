import React, { useState } from "react";
import { FreeIcons } from "../utils/icons";
import { CustomButton2 } from "../components/buttons/button1";

// Supports array of strings for now (e.g., ["expense", "income"])
// Can be extended to take array of objects with { type, title, key }
export const useFilters = (options = []) => {
  const fls = {
    category: [],
    accounts: [],
    type: [],
    date: ["fromdate/selectedDate", "toDate"],
  };
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [newselectedFilters, setnewSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (option) => {
    setSelectedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setShowFilters(false);
  };

  const Filters = () => (
    <div className="relative">
      {/* date */}
      {/* categories */}
      {/* Accounts */}
      <CustomButton2
        label={
          <span className="flex items-center gap-2">
            Filters{" "}
            {showFilters ? FreeIcons.filteropen : FreeIcons.filterClosed}
          </span>
        }
        onClickHandler={() => setShowFilters((prev) => !prev)}
      />

      {showFilters && (
        <div className="absolute top-8 right-0 z-10 rounded shadow-2xl bg-white p-2 w-max min-w-[160px]">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-2 py-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedFilters.includes(option)}
                onChange={() => toggleFilter(option)}
                className="accent-blue-500"
              />
              <span className="text-sm capitalize">{option}</span>
            </label>
          ))}

          <div className="mt-2 flex justify-end">
            <button
              className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return [Filters, selectedFilters];
};
