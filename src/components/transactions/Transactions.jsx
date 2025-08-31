import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFilters } from "../../hooks/hooks.useFilter";
import { TxnItem } from "./TxnItem";
import { Pagination } from "../Pagination";
import { CustomButton2 } from "../buttons/button1";
import { Tags } from "../Tags";
import { Button1 } from "../buttons/button1";
import { generatePDF } from "../utils/PDF";

const Transactions = () => {
  const transactions = useSelector((state) => state.transactions);
  const categories = useSelector((state) => state.categories);

  const [isViewAll, setIsViewAll] = useState(false);
  const filterOptions = ["expense", "income"];
  const [Filters, selectedFilters] = useFilters(filterOptions);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return selectedFilters.length > 0
      ? sortedTransactions.filter((txn) => selectedFilters.includes(txn.type))
      : sortedTransactions;
  }, [sortedTransactions, selectedFilters]);

  return (
    <section className="h-screen w-full">
      <header className="flex justify-between items-center p-4 ">
        <h2 className="text-center font-semibold">Transactions</h2>
        <div className="w-full b mx-1 p-1 text-xs flex"></div>
        <div className="flex gap-2 items-center">
          {<Filters />}
          <CustomButton2
            label={`View  ${isViewAll ? "Less" : "All"}`}
            onClickHandler={() => setIsViewAll((prev) => !prev)}
          />
          <button onClick={() => generatePDF(transactions)}>pdf</button>
        </div>
      </header>

      {isViewAll ? (
        <AllTxns transactions={filteredTransactions} />
      ) : (
        <Pagination
          list={filteredTransactions}
          limit={15}
          total={filteredTransactions.length}
        />
      )}
    </section>
  );
};

const AllTxns = ({ transactions }) => {
  return (
    <section className="pb-6  overflow-auto">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TxnItem key={transaction.id} transaction={transaction} />
        ))
      ) : (
        <h2 className="text-center italic font-bold rounded-lg text-indigo-200">
          No Transactions to show
        </h2>
      )}
    </section>
  );
};

export default Transactions;
