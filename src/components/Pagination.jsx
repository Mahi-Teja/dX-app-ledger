import React, { useState } from "react";
import { TxnItem } from "./transactions/TxnItem";

export const Pagination = ({ limit, total, list = [] }) => {
  const [activePage, setActivePage] = useState(0);

  const pageCount = Math.ceil(total / limit);
  const pagedItems = list.slice(activePage * limit, (activePage + 1) * limit);

  const goToPage = (pageNo) => setActivePage(pageNo);
  const nextPage = () =>
    activePage < pageCount - 1 && setActivePage((prev) => prev + 1);
  const prevPage = () => activePage > 0 && setActivePage((prev) => prev - 1);

  if (!list.length)
    return <p className="text-center py-4">No Transactions to show</p>;

  return (
    <>
      <ul className="h-[78vh] p-2 overflow-auto">
        {pagedItems.map((txn) => (
          <TxnItem key={txn.id} transaction={txn} />
        ))}
      </ul>

      <div className="flex justify-center gap-1 py-2">
        <PageButton
          label="-"
          onClickHandler={prevPage}
          disabled={activePage === 0}
        />

        {Array.from({ length: pageCount }, (_, i) => (
          <PageButton
            key={i}
            label={i + 1}
            onClickHandler={() => goToPage(i)}
            customClass={activePage === i ? "font-bold" : ""}
          />
        ))}

        <PageButton
          label="+"
          onClickHandler={nextPage}
          disabled={activePage === pageCount - 1}
        />
      </div>
    </>
  );
};

const PageButton = ({
  label,
  onClickHandler,
  customClass = "",
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClickHandler}
      className={`p-1 w-6 rounded shadow bg-white text-sm shadow-gray-600 disabled:opacity-50 ${customClass}`}
    >
      {label}
    </button>
  );
};
