import React, { useEffect, useState } from "react";
import data from "../../dummy.json";
import Nav from "./Nav";
import { formatDate } from "../utils/dates";

import { useFilters } from "../hooks/hooks.useFilter";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../app/state/state.transactions";

const Transactions = ({ limit, date }) => {
  // const data = JSON.parse(localStorage.getItem("data"));
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  const [sortedTransactions, setSortedTransactions] = useState([]);

  // const [selectedDate, setSelectedDate] = useState(null);
  // const [filter, setFilter] = useState([]);
  // const [showFilter, setShowFilter] = useState(false);

  // useFilter hook
  const [Filters, selectedFilters] = useFilters([
    "expense",
    "income",
    "Utilities",
    "Food & Groceries",
  ]);

  useEffect(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedTransactions(sorted);
  }, [transactions]);

  // const todaysList = sortedTransactions.filter(
  //   (transaction) => date == transaction.date
  // );
  // useEffect(() => {}, [selectedDate]);

  const t = (listToMap) =>
    listToMap.map((transaction, i) => {
      return <TxnItem key={i} transaction={transaction} />;
    });

  // const TodaysSortedList = t(todaysList);
  // const List = t(sortedTransactions);

  return (
    <section className=" ">
      <div className="flex justify-between items-center  p-4 relative">
        <h2>Transaction</h2>
        <Filters />
      </div>
      <section className="pb-6 h-full overflow-auto">
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map((transaction, i) => {
            return <TxnItem key={i} transaction={transaction} />;
          })
        ) : (
          <p className="text-center">No Transactions to show</p>
        )}
      </section>
    </section>
  );
};

export default Transactions;

export const TxnItem = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dateData = formatDate(transaction.date);
  return (
    <div
      key={transaction.id}
      onClick={(e) => setIsOpen((pre) => !pre)}
      className={`txn-item  m-2 p-2 rounded-lg cursor-pointer  ${
        transaction.type === "income"
          ? "border-l-2 border-green-500 bg-[#99f3ad] hover:bg-[#c2ffcf]"
          : "border-l-2 border-red-500   bg-[#f39f99] hover:bg-[#9e6964]"
      }`}
    >
      <ul className={`flex justify-between  `}>
        {/* <li>
                    <img src={transaction.category.icon} alt="category_icon" />
                  </li> */}
        {isOpen ? (
          <li title="date">
            {dateData.date_month}/{dateData.year}
          </li>
        ) : (
          <li title="date">{dateData.date_month}</li>
        )}
        <li title="description">{transaction.description}</li>

        <li title="amaount">
          {transaction.type === "income" ? "+" : "-"}${transaction.amount}
        </li>
      </ul>
      {isOpen && (
        <ul className="flex justify-between ">
          <li title="category">{transaction.category}</li>
          <li title="account">{transaction.account}</li>
        </ul>
      )}
    </div>
  );
};
