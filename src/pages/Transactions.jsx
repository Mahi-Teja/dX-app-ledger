import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFilters } from "../hooks/hooks.useFilter";
import { TxnItem } from "../components/transactions/TxnItem";
import { BiFilterAlt } from "react-icons/bi";
import { RiAddLine } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { format } from "date-fns";
import { Pagination } from "../components/Pagination";

const Txn = () => {
  const transactions = useSelector((state) => state.transactions);
  const filterOptions = ["expense", "income"];

  const [Filters, selectedFilters] = useFilters(filterOptions);
  const [isViewAll, setIsViewAll] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const sortedTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [transactions]
  );

  const filteredTransactions = useMemo(
    () =>
      selectedFilters.length > 0
        ? sortedTransactions.filter((txn) => selectedFilters.includes(txn.type))
        : sortedTransactions,
    [sortedTransactions, selectedFilters]
  );

  return (
    <section className="min-h-screen p-4 sm:p-6 md:p-10 bg-[#1a1a2e] text-[#f5f5f5] font-poppins">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#1a1a2e] pb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Transactions
        </h1>
        <HeaderActions
          onAdd={() => setIsAddModalOpen(true)}
          Filters={Filters}
          isViewAll={isViewAll}
          toggleView={() => setIsViewAll((prev) => !prev)}
        />
      </header>

      {/* Body */}
      <div className="space-y-8">
        {filteredTransactions.length > 0 ? (
          isViewAll ? (
            <AllTxns transactions={filteredTransactions} />
          ) : (
            <Pagination
              list={filteredTransactions}
              limit={12}
              total={filteredTransactions.length}
            />
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};

const HeaderActions = ({ onAdd, Filters, isViewAll, toggleView }) => (
  <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
    {/* Filters */}
    <div className="relative">
      <button
        className="group p-3 rounded-full border border-[#4a4e69] text-white hover:bg-[#4a4e69] transition-colors"
        aria-label="Filter transactions"
      >
        <BiFilterAlt className="text-xl" />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-white text-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Filters
        </span>
      </button>
      {<Filters />}
    </div>

    {/* View Toggle */}
    <button
      onClick={toggleView}
      className="group p-3 rounded-full border border-[#4a4e69] text-white hover:bg-[#4a4e69] transition-colors"
      aria-label={
        isViewAll
          ? "Switch to Paginated View"
          : "Switch to All Transactions View"
      }
    >
      <BsArrowRepeat className="text-xl" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-white text-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isViewAll ? "Paginated View" : "View All"}
      </span>
    </button>

    {/* New Transaction */}
    <button
      onClick={onAdd}
      className="p-3 sm:p-4 rounded-full bg-[#ff7b52] text-white shadow-lg hover:shadow-xl transition-all"
    >
      <RiAddLine className="text-2xl" />
    </button>
  </div>
);

const AllTxns = ({ transactions }) => {
  const groupedTransactions = transactions.reduce((acc, txn) => {
    const date = format(new Date(txn.date), "MMMM d, yyyy");
    if (!acc[date]) acc[date] = [];
    acc[date].push(txn);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(groupedTransactions).map(([date, txns]) => (
        <div key={date}>
          <h3 className="sticky top-20 z-10 text-lg font-semibold text-[#a0a0b0] mb-4 pb-2 border-b border-[#28283d] bg-[#1a1a2e]">
            {date}
          </h3>
          <div className="grid gap-4">
            {txns.map((transaction) => (
              <TxnItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-4 sm:py-20 sm:px-6 bg-[#28283d] rounded-2xl border border-[#4a4e69] text-white">
    <div className="text-6xl mb-6">👛</div>
    <h3 className="text-xl sm:text-2xl font-semibold text-white">
      You're all caught up!
    </h3>
    <p className="mt-3 text-[#a0a0b0] max-w-xs sm:max-w-sm">
      Looks like there are no transactions here. Add a new one to get started.
    </p>
  </div>
);

export default Txn;
