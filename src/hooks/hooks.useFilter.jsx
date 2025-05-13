import React, { useState } from "react";

//  can take options as array of object
//  each object has type: checkbox, or date if it is a date,categories->dropdown like that
//  title to show like expense,income..
//  and if anyother needed

export const useFilters = (options) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = () => {
    // can set any state currently not used
  };
  const Filters = () => (
    <section className="relative borde transition-all">
      <button onClick={() => setShowFilters((pre) => !pre)}>Filters</button>

      {showFilters && (
        <section className="absolute top-8 right-0 z-10 rounded shadow-2xl bg-white p-2 ">
          {options.map((option, i) => {
            return (
              <section
                key={i}
                className="flex flex-start align-baseline items-baseline px-2 mx-2"
              >
                {/* <div className="p-2 m-2 h-2 w-2 bg-gray-500 rounded"></div> */}
                <input
                  type="checkbox"
                  name={option}
                  id={option}
                  onChange={() =>
                    setSelectedFilters((pre) =>
                      pre.includes(option)
                        ? pre.filter((item) => item !== option)
                        : [...pre, option]
                    )
                  }
                  checked={selectedFilters?.includes(option)}
                  className="p-2 mx-1 items-center text-lg"
                />
                <h3 className="items-center text-lg">{option}</h3>
              </section>
            );
          })}
          <div className="flex flex-col">
            <button
              className=" bg-blue-400 text-sm m-1 p-2 mx-1 rounded"
              onClick={() => {
                setShowFilters((pre) => !pre);
                applyFilters();
              }}
            >
              Apply
            </button>
            <button
              className=" bg-blue-400 text-sm  p-2 mx-1 rounded"
              onClick={() => {
                setShowFilters((pre) => !pre);

                setSelectedFilters([]);
              }}
            >
              Clear All
            </button>
          </div>
        </section>
      )}
    </section>
  );

  return [Filters, selectedFilters];
};
