import { Button1 } from "../components/button1.jsx";
// import data from "../dummy.json";
import Accounts from "./Accounts.jsx";
import Catagories from "../components/catagories.jsx";
import Nav from "../components/Nav.jsx";
import Transactions, { TxnItem } from "../components/Transactions.jsx";
import AddTxn from "../components/addTxn.jsx";
import { useEffect, useRef, useState } from "react";
import { Model } from "../components/Model.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToLocalDB } from "../utils/addToLocalDB.js";
import { addUser } from "../app/state/user.js";
import { addaccount } from "../app/state/state.accounts.js";
import { addCategory } from "../app/state/state.categories.js";
import {
  addStateTransactions,
  addTransaction,
} from "../app/state/state.transactions.js";
import TodaysStats from "../components/TodaysStats.jsx";

//
// Add date navigation
// Adding State
//  Adding BackEnd
//

function App() {
  const [todaysExpenses, setTodaysExpenses] = useState(0);
  const [todaysIncomes, setTodaysIncomes] = useState(0);
  const [dates, setDates] = useState(new Date());
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);

  // const [data, setData] = useState(JSON.parse(localStorage.getItem("dxData")));
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem("dxData"));

  // If LocalDb has data update the state with that data when loaded
  useEffect(() => {
    if (data?.accounts.length > 0) {
      dispatch(addaccount(data?.accounts));
    }
    if (data?.transactions?.length > 0) {
      dispatch(addStateTransactions(data?.transactions));
    }
    if (data?.user) {
      dispatch(addUser(data?.user));
      // dispatch(addCategory(data?.categories));
      // dispatch(addTransaction(data?.transactions));
    }
  }, []);

  // dates value to use
  const Today = useRef(new Date().toISOString().split("T")[0]);
  const Yest = useRef(getDates(-1, true));
  const Tomm = useRef(getDates(1, true));

  // function to get yesterday and tommorrow
  function getDates(day, dateOnly = false) {
    let d = dates;
    d.setDate(d.getDate() + day);
    return dateOnly ? new Date(d).toISOString().split("T")[0] : d;
  }

  // useEffect to filter all the transactions for that day
  useEffect(() => {
    const todaysExpense = transactions
      ?.filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.date == new Date().toISOString().split("T")[0]
      )
      ?.reduce(
        (acc, transaction) => Number(acc) + Number(transaction.amount),
        0
      );
    const todaysIncome = transactions
      ?.filter(
        (transaction) =>
          transaction.type === "income" &&
          transaction.date == new Date().toISOString().split("T")[0]
      )
      ?.reduce(
        (acc, transaction) => Number(acc) + Number(transaction.amount),
        0
      );

    setTodaysExpenses(todaysExpense);
    setTodaysIncomes(todaysIncome);
  }, [transactions]);

  const TodaysTxns = transactions
    ?.filter((txn) => txn.date == Today.current)
    ?.map((txn, i) => {
      return <TxnItem key={i} transaction={txn} />;
    });

  return (
    <main className="bg-gray-400  ">
      {/* <Nav /> */}
      <section className="flex justify-evenly flex-wrap">
        <div className=""> {"<<"} </div>
        <div className="">
          Yesterday {JSON.stringify(new Date()).split("T")[0]}
        </div>
        <div className="">Today {JSON.stringify(new Date()).split("T")[0]}</div>
        <div className="">Tommorrow</div>
        <div className="">{">>"}</div>
        <input type="date" name="" id="" />
      </section>
      <section className="flex">
        <TodaysStats
          stat={todaysExpenses}
          statTitlel={"Today's Expenes"}
        ></TodaysStats>
        <TodaysStats
          stat={todaysIncomes}
          statTitlel={"Today's Income"}
        ></TodaysStats>
      </section>

      <AddTxn />

      <section className="  ">
        <section className="h-[60vh] mx-2  p-2 rounded-xl  bg-[#3e3e3e] overflow-auto">
          <p className="font-semibold text-center">Transactions</p>
          <div className="p-1">
            {TodaysTxns?.length > 0 ? (
              TodaysTxns
            ) : (
              <p className="text-center">No Transactions made today to show</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
