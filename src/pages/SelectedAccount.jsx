import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Wallet2, ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";
import BackButton from "../components/utils/BackPage";
import { StatChip } from "./SelectedCategory";
import { AccountIcons } from "../utils/icons";
import { TransactionsList } from "../components/Transactions/TransactionsList";

const SelectedAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const accounts = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transactions);
  // const [selectedtxns,setSelectedTxns] = useState([])

  const account = accounts.find((acc) => acc.id === id);

  const [selectedAccount, setSelectedAccount] = useState(account);
  const [txns, setTxns] = useState([]);
  const [tots, setTots] = useState({ income: 0, expense: 0, net: 0 });

  useEffect(() => {
    if (!account) {
      navigate("/404");
      return;
    }

    setSelectedAccount(account);

    // filter transactions belonging to this account
    const relatedTxns = transactions.filter((txn) =>
      txn.type == "self" ? txn.fromAccount.id : txn.account.id === account.id
    );
    setTxns(relatedTxns);
    // totals
    const income = relatedTxns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = relatedTxns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setTots({
      income,
      expense,
      net: income - expense,
    });
  }, [account, transactions, navigate]);

  if (!selectedAccount) return null;

  return (
    <section className="px-6 max-w-screen space-y-4">
      {/* Back button and page title */}
      <div className=" flex items-center gap-4">
        <span className="md:hidden">
          <BackButton />
        </span>
        <h1 className="md:text-2xl font-semibold text-gray-800">
          Account Details
        </h1>
      </div>
      <AccountHeader
        name={account.name}
        icon={account?.icon} // or <Banknote /> from lucide-react
        totalTxns={txns?.length}
        income={tots?.income}
        expense={tots?.expense}
        balance={tots.net}
        initialBalance={account.initialBalance}
        currency="₹"
        type={account.type}
      />
      {/* Transactions List */}
      <TransactionsList
        transactions={txns}
        title={"Transactions"}
        customClass={` rounded-2xl overflow-auto shadow-md h-[50vh] md:h-[60vh]`}
      />
    </section>
  );
};

/**
 * AccountHeader – clean, minimalist header for an account summary
 *
 * Props:
 *  - name: string
 *  - icon?: ReactNode | string (url). If omitted, a Wallet icon is shown
 *  - totalTxns: number
 *  - income: number
 *  - expense: number
 *  - balance: number
 *  - initialBalance?: number
 *  - currency?: string (default "₹")
 */
function AccountHeader({
  name,
  icon,
  totalTxns = 0,
  income = 0,
  expense = 0,
  balance = 0,
  initialBalance = 0,
  currency = "₹",
  type = "",
}) {
  const fmt = (n) =>
    `${currency}${Number(n || 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  const Icon = () => {
    if (!icon) return <Wallet2 className="w-6 h-6" aria-hidden />;
    if (typeof icon === "string") {
      return (
        <img
          src={icon}
          alt="Account icon"
          className="w-7 h-7 rounded-xl object-cover"
          loading="lazy"
        />
      );
    }
    return icon; // assume a ReactNode
  };

  return (
    <header className="w-full">
      <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-sm px-4 sm:px-6 py-4 shadow-sm">
        {/* Top row: icon + name + balance */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 grid place-items-center rounded-2xl bg-gray-100 p-2">
              {/* <Icon />
               */}
              {icon || AccountIcons[type]}
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight truncate">
                {name}
              </h1>
              <div className="flex items-center text-xs md:text-sm text-gray-500  gap-2">
                <p className="text-xs text-gray-500 truncate">
                  {totalTxns} transaction{totalTxns === 1 ? "" : "s"}
                </p>
                <p className="bg-gray-500 rounded-full h-1 w-1"></p>
                <p className="text-xs text-gray-500 truncate">{type}</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-gray-500">
              Balance
            </p>
            <p className="text-xl sm:text-2xl font-bold leading-tight">
              {fmt(balance)}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          <StatChip
            label="Income"
            value={fmt(income)}
            icon={<ArrowDownRight className="w-4 h-4" aria-hidden />}
            hint="Money in"
          />
          <StatChip
            label="Expense"
            value={fmt(expense)}
            icon={<ArrowUpRight className="w-4 h-4" aria-hidden />}
            hint="Money out"
          />
          <StatChip
            label="Initial"
            icon={<ArrowUpRight className="w-4 h-4" aria-hidden />}
            value={fmt(initialBalance)}
            hint="Opening balance"
          />
          <StatChip
            icon={<ArrowUpRight className="w-4 h-4" aria-hidden />}
            label="Net Change"
            value={fmt(income - expense)}
            hint="Income − Expense"
          />
        </div>
      </div>
    </header>
  );
}

export default SelectedAccount;
