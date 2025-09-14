import { WalletIcon } from "lucide-react";
import Dropdown from "../components/utils/Dropdown";
import { MONTHS_LIST } from "../utils/constants";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import EmptyFieldText from "../components/EmptyFieldText";
import DayWiseMonthlyChart from "../components/charts/DaywiswMonthlyChart";
import { MonthlyCategoryChart } from "../components/charts/MonthlyCategoryChart";
import { AnnualMonthlySpendsChart } from "../components/charts/AnnualMonthlyChart";
import TodaysStats from "../components/TodaysStats";
import { Button1 } from "../components/buttons/button1";
import { ArrowIcons, FreeIcons } from "../utils/icons";
import ErrorBoundary from "../components/utils/ChartsErrorBoundary";
import {
  getCategoryWiseTotals,
  monthlytransactionTotal,
} from "../utils/rechartsLogic";
import MonthlyTotalsChart from "../components/charts/MonthlyTotalCharts";
import CategoryWiseTotalChart from "../components/charts/CateoryWiseTotalsChart";

export const Reports = () => {
  const [selected, setSelected] = useState(new Date().getMonth());
  const transactions = useSelector((s) => s.transactions);
  // const categories = useSelector((s) => s.categories);
  // const [toggletype, setToggletype] = useState("income");
  // const [monthlyCategoryAmount, setMonthlyCategoryAmount] = useState({});
  // const [MonthlyAmount, setMonthlyAmount] = useState({});
  const monthlyTotalsDataSet = useMemo(() => {
    return monthlytransactionTotal(selected, transactions);
  }, [selected, transactions]);
  const categoriesTotalDataSet = useMemo(
    () => getCategoryWiseTotals(transactions),
    [transactions]
  );

  return (
    <section className="flex flex-col flex-1 px-4 pb-16 md:pb-4 py-6 space-y-6">
      {/* Header */}
      <header className="w-full flex     justify-between items-center bg-white shadow-sm rounded-lg p-4 gap-3">
        <h2 className="text-xl  md:text-2xl font-semibold text-gray-800">
          Your Reports
        </h2>
        <ReportsBar
          customClass="   "
          selectedMonth={selected}
          setSelectedMonth={setSelected}
        />
      </header>

      {/* Monthly Stats or Empty State */}
      {/* {noData ? (
    <EmptyFieldText className="w-fit mx-auto px-5 py-4">
      Nothing to show at the moment
    </EmptyFieldText>
    
  ) : (
    <MonthlyStats
      MonthlyAmount={MonthlyAmount}
      customClass="w-full"
    />
  )} */}

      {/* Charts Section */}
      <section className="grid  grid-cols-1  lg:grid-cols-1  gap-6">
        <div className="">
          <MonthlyTotalsChart
            title={`Monthly Transactions (Income vs Expenses) - ${MONTHS_LIST[selected]}`}
            dataSet={monthlyTotalsDataSet}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <CategoryWiseTotalChart
            title="Category - Toatl Expenses"
            dataSet2={categoriesTotalDataSet}
            nameKey="category"
            dataKey="expense"
          />
          <CategoryWiseTotalChart
            title="Category - Toatl Income"
            dataSet2={categoriesTotalDataSet}
            nameKey="category"
            dataKey="income"
          />
        </div>
      </section>
    </section>
  );
};

const MonthlyStats = ({ MonthlyAmount = {}, customClass = "" }) => {
  return (
    <section
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center justify-items-center ${customClass}`}
    >
      <TodaysStats
        statTitle="Income"
        stat={MonthlyAmount.income || 0}
        icon={<>{ArrowIcons.incArrow}</>}
        type="income"
      />
      <TodaysStats
        statTitle="Expense"
        stat={MonthlyAmount.expense || 0}
        icon={<>{ArrowIcons.decArrow}</>}
        type="expense"
      />
      <TodaysStats
        statTitle="Balance"
        stat={MonthlyAmount.savings || 0}
        icon={<WalletIcon />}
        type="balance"
      />
    </section>
  );
};

const ReportsBar = ({ selectedMonth, setSelectedMonth, customClass }) => {
  return (
    <div className={`       ${customClass}`}>
      {/* <div className="">{selectedMonth}</div> */}
      <div className="">
        <Dropdown
          label="Select a Month"
          setSelected={setSelectedMonth}
          selected={selectedMonth}
          items={MONTHS_LIST}
        />
      </div>
    </div>
  );
};

// const Chh = ()=><section>
//             {/* Monthly Report Card */}
//             <div className="bg-white rounded-2xl md:col-span-2 lg:col-span-3 shadow-md p-6 space-y-6 h-[500px]">
//               <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   Monthly Report
//                 </h2>
//                 <h2 className={`text-lg font-semibold text-gray-800"`}>
//                   {MONTHS_LIST[selected]}
//                 </h2>
//               </div>
//               <div className="h-[400px] col-span-2">
//                 <DayWiseMonthlyChart month={selected} year={2025} />
//               </div>
//             </div>

//             {/* Monthly Category Breakdown */}
//             <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 h-[500px]">
//               <h2 className="text-lg font-semibold text-gray-800 text-center">
//                 Expense Breakdown - {MONTHS_LIST[selected]}
//               </h2>
//               <div className="h-[400px]">
//                 <ErrorBoundary>
//                   <MonthlyCategoryChart
//                     month={selected}
//                     type={toggletype}
//                     year={2025}
//                   />
//                 </ErrorBoundary>
//               </div>
//             </div>

//             {/* Annual Overview */}
//             <div className="bg-white rounded-2xl shadow-md p-6 space-y-6 h-[500px]">
//               <h2 className="text-lg font-semibold text-gray-800 text-center">
//                 Annual Overview
//               </h2>
//               <div className="h-[400px]">
//                 <AnnualMonthlySpendsChart month={selected} year={2025} />
//               </div>
//             </div>
//           </section>
