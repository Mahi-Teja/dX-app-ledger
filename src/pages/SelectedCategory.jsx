import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TxnItem } from "../components/transactions/TxnItem";
import DateWiseTxn from "../components/transactions/DateWiseTxn";
import BackButton from "../components/utils/BackPage";

const SelectedCategory = () => {
  const { name, id } = useParams();
  const categories = useSelector((state) => state.categories);
  const transactions = useSelector((state) => state.transactions);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [SelectedCategory, setSelectedCategory] = useState(
    categories.find((cat) => cat.category.toLowerCase() == name)
  );

  useEffect(() => {
    const txns = transactions.filter(
      (txn) => txn.category.id == SelectedCategory.id
    );
    setFilteredTransactions(txns);
  }, [SelectedCategory, transactions]);

  return (
    <section className="w-full h-screen">
      <div className="md:hidden">
        <BackButton />
      </div>
      <div className="text-bold text-xl flex gap-3  ">
        <div>Category:</div>
        <h1> {SelectedCategory?.category}</h1>
        <h1>Total txns: {filteredTransactions.length}</h1>
      </div>
      <div className="">
        <div className="flex flex-col bg-gray-300">
          {/* <h1 className="text-xl font-bold">Transactions</h1> */}
          <div className="relative p-4">
            {filteredTransactions.length > 0 ? (
              <DateWiseTxn
                filterObject={SelectedCategory?.category}
                transactions={filteredTransactions}
              />
            ) : (
              "No Transactions"
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedCategory;

// {filteredTransactions.length > 0 ? (
//             <div className="">
//               {filteredTransactions.map((txn, i) => {
//                 return <TxnItem key={i} transaction={txn} />;
//               })}
//             </div>
