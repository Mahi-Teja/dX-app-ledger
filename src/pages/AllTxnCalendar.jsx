import React from "react";
import { useSelector } from "react-redux";
import { Pagination } from "../components/Pagination";

const AllTxnCalendar = () => {
  const transactions = useSelector((state) => state.transactions);
  const sortedTxns = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return <Pagination limit={10} list={sortedTxns} total={sortedTxns.length} />;
};

export default AllTxnCalendar;
