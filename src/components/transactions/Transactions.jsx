import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFilters } from "../../hooks/hooks.useFilter";
import { Pagination } from "../Pagination";
import {   Button1 } from "../buttons/button1";
import { generatePDF } from "../utils/PDF";
import { FreeIcons } from "../../utils/icons";
import { Dialoge } from "../Dialoge"; 
import TransactionTable from "./TransactionTableWrapper";

const Transactions = () => {
  const transactions = useSelector((state) => state.transactions);
  // const categories = useSelector((state) => state.categories);

  const [isViewAll, ] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const filterOptions = ["expense", "income"];
  const [Filters, selectedFilters] = useFilters(filterOptions);

  const sortedTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [transactions]
  );

  const filteredTransactions = useMemo(
    () =>
      selectedFilters.length
        ? sortedTransactions.filter((txn) => selectedFilters.includes(txn.type))
        : sortedTransactions,
    [sortedTransactions, selectedFilters]
  );

  return (
    <section className="flex flex-col w-full h-full    p-4 md:p-6 rounded-xl">
      {/* Header */}
      <header className="flex  flex-row justify-between  md:justify-between items-center rounded bg-white align-middle  gap-3 mb-4">
        <h2 className=" text-sm md:text-xl lg:text-2xl font-bold text-indigo-600 px-4">
          Transactions
        </h2>

        <div className="flex flex-wrap sm:flex-row gap-2 text-sm md:text-lg justify-end items-center w-full sm:w-auto">
          {/* Filters */}
          <Filters />

          {/* Toggle View */}
          {/* <CustomButton2
            label={`View ${isViewAll ? "Less" : "All"}`}
            onClickHandler={() => setIsViewAll((prev) => !prev)}
          /> */}

          {/* Download PDF */}
          {transactions.length > 0 && (
            <Button1
              title="Download PDF"
              handleClick={() => setIsDownloadOpen(true)}
            >
              {FreeIcons.download}
            </Button1>
          )}
        </div>

        {/* Download Dialog */}
        {isDownloadOpen && (
          <Dialoge
            title="Download PDF"
            description="transactions.pdf will be downloaded."
            agreeLabel="Download"
            disagreeLabel="Cancel"
            onAgree={() => {
              generatePDF(transactions);
              setIsDownloadOpen(false);
            }}
            onDisagree={() => setIsDownloadOpen(false)}
          />
        )}
      </header>

      {/* Transaction List */}
      <div className={`overflow-y-auto   rounded-xl    `}>
        {filteredTransactions.length > 0 ? (
          isViewAll ? (
            <TransactionTable
              transactions={filteredTransactions}
              title={`Transactions on  `}
            />
          ) : (
            <Pagination
              list={filteredTransactions}
              limit={15}
              resetPageTrigger={selectedFilters.length}
            />
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-4 sm:py-20 sm:px-6 rounded-2xl text-white">
    <div className="text-6xl mb-6">👛</div>
    <h3 className="text-xl sm:text-2xl font-semibold text-white">
      You're all caught up!
    </h3>
    <p className="mt-3 text-[#797991] font-semibold max-w-xs sm:max-w-sm">
      Looks like there are no transactions here. Add a new one to get started.
    </p>
  </div>
);

export default Transactions;
