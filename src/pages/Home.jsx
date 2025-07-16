import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// components
import { TxnItem } from "../components/transactions/TxnItem";
import AddTxn from "../components/addTxn";
import TodaysStats from "../components/TodaysStats";
import DateNav from "../components/DateNav";
// Icons
import { ArrowIcons } from "../utils/icons";
import { Wallet2Icon, WalletIcon } from "lucide-react";

// Helper: format date to YYYY-MM-DD
const formatISODate = (date) => new Date(date).toISOString().split("T")[0];

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todaysExpenses, setTodaysExpenses] = useState(0);
  const [todaysIncomes, setTodaysIncomes] = useState(0);

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

    setTodaysExpenses(totals.expense);
    setTodaysIncomes(totals.income);
  }, [transactions, selectedDate]);

  // Today's Transactions List
  const TodaysTxns = transactions
    ?.filter((txn) => formatISODate(txn.date) === formatISODate(selectedDate))
    ?.map((txn) => <TxnItem key={txn.id} transaction={txn} />);

  return (
    <main className="flex flex-col w-full">
      <DateNav selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <section className="grid gap-2 w-full  md:text-lg grid-cols-1  md:grid-cols-3  justify-center px-2 md:p-4">
        <TodaysStats
          stat={todaysExpenses}
          icon={<>{ArrowIcons.decArrow}</>}
          type={"expense"}
          statTitlel=" Expense"
        />
        <TodaysStats
          stat={todaysIncomes}
          icon={<>{ArrowIcons.incArrow}</>}
          statTitlel=" Income"
          type={"income"}
        />
        <TodaysStats
          stat={todaysIncomes - todaysExpenses}
          type={"balance"}
          statTitlel="Balance"
          icon={<>{<WalletIcon />}</>}
        />
      </section>

      <AddTxn selectedDate={selectedDate} />

      <section className="h-[76vh] md:h-[70vh] p-2">
        <section className="h-full mx-2 p-2 rounded-xl bg-indigo-100 overflow-auto">
          <p className=" text-center">
            Transactions on{" "}
            <span className="font-semibold">{selectedDate.toDateString()}</span>
          </p>
          <div className="p-1">
            {TodaysTxns?.length > 0 ? (
              TodaysTxns
            ) : (
              <p className="text-center italic text-indigo-700">
                No Transactions to show
              </p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;
