import React, { useEffect, useState } from "react";
// import data from "../../dummy.json";
import Nav from "./Nav";
import { formatDate } from "../utils/dates";

import { useFilters } from "../hooks/hooks.useFilter";
// import useCalculatedAmount from "../hooks/hooks.amounts";
import { useSelector } from "react-redux";
import { TxnItem } from "./transactions/TxnItem";

const Transactions = () => {
  const transactions = useSelector((state) => state.transactions);
  // const { finalCatergoryAmout, finalAccountsAmout } = useCalculatedAmount();

  const [sortedTransactions, setSortedTransactions] = useState([]);
  // const [filteredTransactions, setfilteredTransactions] = useState([]);

  // useFilter hook
  const filterOptions = ["expense", "income"];
  const [Filters, selectedFilters] = useFilters(filterOptions);

  // sort transaction when transactions changed/ loaded
  useEffect(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedTransactions(sorted);
  }, [transactions]);

  // returns Sorted transactions : (if filters applied )=> filtered Tranactions
  const list = () => {
    const filterList = sortedTransactions.filter((txn) =>
      selectedFilters.includes(txn.type)
    );

    return selectedFilters.length > 0 ? filterList : sortedTransactions;
  };

  return (
    <section className=" bg-indigo-300 h-screen ">
      <div className="flex justify-between items-center  p-4 relative">
        <h2 className="text-center font-semibold">Transactions</h2>
        <Filters />
      </div>
      <section className="pb-6 h-full overflow-auto">
        {sortedTransactions.length > 0 ? (
          list().map((transaction, i) => {
            return <TxnItem key={i} transaction={transaction} />;
          })
        ) : (
          <h2 className="text-center italic font-bold rounded-lg text-indigo-200">
            No Transactions to show
          </h2>
        )}
      </section>
    </section>
  );
};

export default Transactions;

// export const TxnItem = ({ transaction }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currDate, setCurrDate] = useState(transaction.date);
//   const [dateData, setDateData] = useState(formatDate(transaction.date));

//   return (
//     <div
//       key={transaction.id}
//       onClick={() => {
//         setIsOpen((pre) => !pre);
//         // console.log(transaction);
//       }}
//       className={`txn-item  m-2 p-2 rounded-lg cursor-pointer  bg-[#fff] ${
//         transaction.type === "income"
//           ? "border-l-2 border-green-500 hover:bg-[#bef5b9]"
//           : "border-l-2 border-red-500   hover:bg-[#e7b3b3]"
//       }`}
//     >
//       <ul className={`flex justify-between  `}>
//         {isOpen ? (
//           <li title="date">
//             {formatDate(currDate)?.date_month}/{formatDate(currDate)?.year}
//           </li>
//         ) : (
//           <li title="date">{transaction.date}</li>
//         )}
//         <li title="description">{transaction.description}</li>

//         <li
//           title="amaount"
//           className={`${
//             transaction.type === "income"
//               ? " text-[#19f048] hover:text-[#8ced7b]"
//               : " text-[#e83326] hover:text-[#dc7979]"
//           }`}
//         >
//           {transaction.type === "income" ? "+" : "-"}
//           {transaction.amount}
//         </li>
//       </ul>
//       {isOpen && (
//         <ul className="flex justify-between ">
//           <li title="category">{transaction.category}</li>
//           <li title="account">{transaction.account}</li>
//         </ul>
//       )}
//     </div>
//   );
// };
