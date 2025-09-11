import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Wallet2, ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";
import BackButton from "../components/utils/BackPage";
import { CURRENCY_SYMBOLS } from "../utils/constants";
import { TransactionsList } from "../components/Transactions/TransactionsList";

const SelectedCategory = () => {
  const { name, id } = useParams();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories);
  const transactions = useSelector((state) => state.transactions);

  const [selectedCategory, setSelectedCategory] = useState(
    categories.find((cat) => cat.category.toLowerCase() === name)
  );
  const [filteredTxns, setFilteredTxns] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, net: 0 });

  useEffect(() => {
    if (!selectedCategory) {
      navigate("/404");
      return;
    }

    const txns = transactions.filter(
      (txn) => txn.category.id === selectedCategory.id
    );
    setFilteredTxns(txns);

    const income = txns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = txns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setTotals({ income, expense, net: income - expense });
  }, [selectedCategory, transactions, navigate]);

  if (!selectedCategory) return null;

  const fmt = (n) =>
    `${CURRENCY_SYMBOLS.INR}${Number(n || 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  return (
    <section className="px-2 max-w-[1200px] lg:mx-auto flex flex-col flex-1 h-full space-y-2">
      {/* Back button and page title */}
      <div className=" flex items-center mt-2 p-1 rounded bg-white">
        <span className="mx-4">
          <BackButton />
        </span>
        <h1 className="text-center  md:text-xl self-center font-semibold text-gray-800">
          Category Details
        </h1>
      </div>

      {/* Category Header */}
      <header className=" ">
        <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-sm px-4 sm:px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 grid place-items-center rounded-2xl bg-gray-100 p-2">
                {selectedCategory?.icon || (
                  <Wallet2 className="w-6 h-6" aria-hidden />
                )}
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold tracking-tight truncate">
                  {selectedCategory.category}
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs ms:text-sm text-gray-500">
                  <p>
                    {filteredTxns.length} transaction
                    {filteredTxns.length === 1 ? "" : "s"}
                  </p>
                  <p className="bg-gray-500 rounded-full h-1 w-1"></p>
                  <p>{selectedCategory?.type}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wide text-gray-500">
                Net Balance
              </p>
              <p
                className={`text-xl sm:text-2xl font-bold leading-tight ${
                  totals.net >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {fmt(totals.net)}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            <StatChip
              label="Income"
              value={fmt(totals.income)}
              icon={<ArrowDownRight className="w-4 h-4" aria-hidden />}
              hint="Money in"
            />
            <StatChip
              label="Expense"
              value={fmt(totals.expense)}
              icon={<ArrowUpRight className="w-4 h-4" aria-hidden />}
              hint="Money out"
            />
            <StatChip
              label="Net Change"
              value={fmt(totals.net)}
              icon={<ArrowUpRight className="w-4 h-4" aria-hidden />}
              hint="Income − Expense"
            />
          </div>
        </div>
      </header>

      {/* Transactions List */}

      <TransactionsList
        transactions={filteredTxns}
        title={"Transactions"}
        customClass={` rounded-2xl overflow-auto shadow-md h-[50vh] md:h-[60vh]`}
      />
    </section>
  );
};

export function StatChip({ label, value, icon, hint }) {
  return (
    <div className="group rounded-2xl border border-black/10 bg-white px-3 py-2 shadow-sm flex items-center gap-2">
      {icon && (
        <span className="shrink-0 rounded-xl bg-gray-100 p-1.5">{icon}</span>
      )}
      <div className="min-w-0">
        <p
          title={hint || value}
          className="text-[11px] leading-none text-gray-500"
        >
          {label}
        </p>
        <p className="text-sm sm:text-base font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

export default SelectedCategory;
