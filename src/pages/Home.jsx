import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// components
import TodaysStats from "../components/TodaysStats";
import DateNav from "../components/DateNav";
import AddTxn from "../components/transactions/addTxn";
import TransactionTable from "../components/transactions/TransactionTableWrapper";
import { TransactionsList } from "../components/transactions/TransactionsList";
// Icons
import { ArrowIcons } from "../utils/icons";
import { WalletIcon } from "lucide-react";
import Txnstable from "../components/transactions/Txnstable";

// Helper: format date to YYYY-MM-DD
const formatISODate = (date) => new Date(date).toISOString().split("T")[0];

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [thisDaysStats, setThisDaysStats] = useState({
    expense: 0,
    income: 0,
    net: 0,
  });

  const transactions = useSelector((state) => state.transactions);

  // Effect: calculate today's expense & income totals
  useEffect(() => {
    const dateStr = formatISODate(selectedDate);

    const totals = transactions?.reduce(
      (acc, txn) => {
        if (formatISODate(txn.date) !== dateStr) return acc;
        if (txn.type === "expense") acc.expense += Number(txn.amount);
        if (txn.type === "income") acc.income += Number(txn.amount);
        return acc;
      },
      { expense: 0, income: 0 }
    );

    setThisDaysStats({
      ...totals,
      net: Number(totals.income) - Number(totals.expense),
    });
  }, [transactions, selectedDate]);

  // Today's Transactions List
  const todaysTxns = transactions.filter(
    (txn) => formatISODate(txn.date) === formatISODate(selectedDate)
  );

  return (
    <main className=" flex flex-col flex-1 h-screen pb-20 md:pb-2 mx-4 gap-4">
      {/* Date Navigator */}
      <DateNav selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* Stats Cards */}
      <section className="grid gap-2   grid-cols-6 justify-center justify-items-center ">
        <TodaysStats
          value={thisDaysStats.expense}
          icon={<>{ArrowIcons.decArrow}</>}
          type="expense"
          title="Expense"
        />
        <TodaysStats
          value={thisDaysStats.income}
          icon={<>{ArrowIcons.incArrow}</>}
          title="Income"
          type="income"
        />
        <TodaysStats
          value={thisDaysStats.net}
          type="balance"
          title="Balance"
          icon={<WalletIcon />}
        />
      </section>

      {/* Add Transaction */}
      <AddTxn selectedDate={selectedDate} />

      {/* Transactions List */}
      <TransactionTable
        transactions={todaysTxns}
        title={`Transactions on ${selectedDate.toDateString()}`}
      />
    </main>
  );
};

export default Home;
