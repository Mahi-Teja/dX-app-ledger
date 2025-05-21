import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import data from "../../dummy.json";
import { TxnItem } from "../components/transactions/TxnItem.jsx";
import AddTxn from "../components/addTxn.jsx";
import TodaysStats from "../components/TodaysStats.jsx";
// icons
import { FaCalendarAlt } from "react-icons/fa";
import DateNav from "../components/DateNav.jsx";
//
// Add date navigation
//
//  Adding BackEnd
//

function Home() {
  const [todaysExpenses, setTodaysExpenses] = useState(0);
  const [todaysIncomes, setTodaysIncomes] = useState(0);
  const [dates, setDates] = useState(new Date());
  const [selectedDate, setselectedDate] = useState(dates);
  const [openDate, setOpenDate] = useState(false);
  const dateInputRef = useRef(null);
  const transactions = useSelector((state) => state.transactions);
  // const accounts = useSelector((state) => state.accounts);
  // console.log(new Date(selectedDate).toISOString().split("T")[0]);

  // dates value to use
  const Today = useRef(new Date().toISOString().split("T")[0]);
  // const Yest = useRef(getDates(-1, true));
  // const Tomm = useRef(getDates(1, true));

  // const isoDate = (date)=> new Date(date).toISOString().split("T")[0]

  // useEffect to filter all the transactions for that day
  useEffect(() => {
    const todaysExpense = transactions
      ?.filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.date == new Date(selectedDate).toISOString().split("T")[0]
      )
      ?.reduce(
        (acc, transaction) => Number(acc) + Number(transaction.amount),
        0
      );
    const todaysIncome = transactions
      ?.filter(
        (transaction) =>
          transaction.type === "income" &&
          transaction.date == new Date(selectedDate).toISOString().split("T")[0]
      )
      ?.reduce(
        (acc, transaction) => Number(acc) + Number(transaction.amount),
        0
      );

    setTodaysExpenses(todaysExpense);
    setTodaysIncomes(todaysIncome);
  }, [transactions, selectedDate]);

  const TodaysTxns = transactions
    ?.filter(
      (txn) => txn.date == new Date(selectedDate).toISOString().split("T")[0]
    )
    ?.map((txn, i) => {
      return <TxnItem key={i} transaction={txn} />;
    });

  // const DateNav = () => {
  //   return (
  //     <section className="row-span-1 flex justify-evenly flex-wrap">
  //       <div className=""> {"<<"} </div>
  //       {/* <div className="">Yesterday</div> */}
  //       <div
  //         className="font-semibold"
  //         onClick={() => setselectedDate(Date.now())}
  //       >
  //         Today
  //       </div>
  //       {/* <div className="">Tommorrow</div> */}
  //       <div className="">{">>"}</div>
  //       <FaCalendarAlt
  //         onClick={() => {
  //           setOpenDate((pre) => !pre);
  //           // console.log(dateInputRef.current.);
  //         }}
  //       />
  //       {openDate && (
  //         <input
  //           ref={dateInputRef}
  //           title="customDate"
  //           type="date"
  //           onChange={(e) => setselectedDate(e.target.value)}
  //           name=""
  //           id=""
  //           autoFocus
  //         />
  //       )}
  //     </section>
  //   );
  // };

  return (
    <main className=" flex flex-col m-0">
      {/* <Nav /> */}

      {/* <DateNav className="row-span-" /> */}
      <DateNav selectedDate={selectedDate} setSelectedDate={setselectedDate} />

      {/* <CustomDatePicker /> */}
      <section className=" row-span- flex">
        <TodaysStats
          stat={todaysExpenses}
          statTitlel={"Today's Expenes"}
        ></TodaysStats>
        <TodaysStats
          stat={todaysIncomes}
          statTitlel={"Today's Income"}
        ></TodaysStats>
      </section>

      <AddTxn seldectedDate={selectedDate} />
      {/* sm:76vh md: */}
      <section className="h-[76vh] md:h-[70vh] p-2  ">
        <section className=" h-full    mx-2  p-2 rounded-xl  bg-indigo-100 overflow-auto">
          <p className="font-semibold text-center">Transactions</p>
          <div className="p-1">
            {TodaysTxns?.length > 0 ? (
              TodaysTxns
            ) : (
              <p className="text-center italic  rounded-lg text-indigo-700">
                No Transactions to show
              </p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Home;
