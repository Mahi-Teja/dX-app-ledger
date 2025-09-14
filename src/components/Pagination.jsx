import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import TransactionsList from "./transactions/TransactionsList";

export const Pagination = ({ list = [], limit = 10, resetPageTrigger = 0 }) => {
  const [activePage, setActivePage] = useState(0);

  // Reset page when trigger changes (filters/view all)
  useEffect(() => {
    setActivePage(0);
  }, [resetPageTrigger]);

  const pageCount = Math.ceil(list.length / limit);
  const pagedItems = list.slice(activePage * limit, (activePage + 1) * limit);

  const goToPage = (page) => setActivePage(page);
  const nextPage = () =>
    activePage < pageCount - 1 && setActivePage((prev) => prev + 1);
  const prevPage = () => activePage > 0 && setActivePage((prev) => prev - 1);

  if (!list.length) {
    return (
      <p className="text-center italic font-semibold text-gray-400 mt-10">
        No items to display
      </p>
    );
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] bg-white/70 rounded-lg shadow-sm ">
      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200 ">
        <TransactionsList transactions={pagedItems} />
      </div>

      {/* Pagination Controls */}
      <div className="shrink-0 -t bg-white px-4 py-2 flex items-center justify-center">
        <PageButton
          label={<ChevronLeft />}
          onClickHandler={prevPage}
          disabled={activePage === 0}
        />

        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {Array.from({ length: pageCount }, (_, i) => (
            <PageButton
              key={i}
              label={i + 1}
              onClickHandler={() => goToPage(i)}
              active={activePage === i}
            />
          ))}
        </div>

        <PageButton
          label={<ChevronRight />}
          onClickHandler={nextPage}
          disabled={activePage === pageCount - 1}
        />
      </div>
    </div>
  );
};

const PageButton = ({
  label,
  onClickHandler,
  disabled = false,
  active = false,
}) => (
  <button
    onClick={onClickHandler}
    disabled={disabled}
    className={`px-3 py-1 rounded shadow text-sm font-medium transition-colors
      ${
        active
          ? "bg-indigo-500 text-white"
          : "bg-white text-indigo-700 hover:bg-indigo-100"
      }
      disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {label}
  </button>
);
