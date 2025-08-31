import { WalletIcon } from "lucide-react";
import Dropdown from "../app/state/Dropdown";
import { MONTHS_LIST } from "../utils/constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyFieldText from "../components/EmptyFieldText";
import DayWiseMonthlyChart from "../components/charts/DaywiswMonthlyChart";
import { MonthlyCategoryChart } from "../components/charts/MonthlyCategoryChart";
import { AnnualMonthlySpendsChart } from "../components/charts/AnnualMonthlyChart";
import TodaysStats from "../components/TodaysStats";
import {
  getCategoryWiseTxnWrtMonth,
  getMonthlyTxnAmt,
} from "../utils/transactionsData";
import { Button1 } from "../components/buttons/button1";
import { ArrowIcons } from "../utils/icons";
import ErrorBoundary from "../components/utils/ChartsErrorBoundary";

export const Reports = () => {
  const [selected, setSelected] = useState(new Date().getMonth());
  const transactions = useSelector((s) => s.transactions);
  const categories = useSelector((s) => s.categories);
  const [toggletype, setToggletype] = useState("income");
  const [monthlyCategoryAmount, setMonthlyCategoryAmount] = useState({});
  const [MonthlyAmount, setMonthlyAmount] = useState({});
  const noData = transactions.length <= 0;

  useEffect(() => {
    const CategoryMonthly = getCategoryWiseTxnWrtMonth(
      categories,
      transactions,
      selected
    );
    const monthly = getMonthlyTxnAmt(transactions, selected);
    setMonthlyAmount(monthly);
    setMonthlyCategoryAmount(CategoryMonthly);
  }, [selected, transactions, categories]);

  return (
    <section className="w-full overflow-auto pb-10">
      <h1 className="text-2xl font-bold text-center mb-6">Reports</h1>

      {noData ? (
        <EmptyFieldText customClass="w-fit mx-auto px-5">
          Nothing to show at the moment
        </EmptyFieldText>
      ) : (
        <div className="flex  flex-col md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <ReportsBar
            customClass={`col-span-2`}
            selectedMonth={selected}
            setSelectedMonth={setSelected}
          />
          <MonthlyStats
            customClass={`col-span-2`}
            MonthlyAmount={MonthlyAmount}
          />
          {/* Monthly Report Card */}
          <div className="bg-white rounded-2xl md:col-span-2 lg:col-span-3 shadow-md p-6 space-y-6 h-[500px]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Monthly Report
              </h2>
              <h2 className={`text-lg font-semibold text-gray-800"`}>
                {MONTHS_LIST[selected]}
              </h2>
            </div>
            <div className="h-[400px] col-span-2">
              <DayWiseMonthlyChart month={selected} year={2025} />
            </div>
          </div>

          {/* Monthly Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 h-[500px]">
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Expense Breakdown - {MONTHS_LIST[selected]}
            </h2>
            <div className="h-[400px]">
              <ErrorBoundary>
                <MonthlyCategoryChart
                  month={selected}
                  type={toggletype}
                  year={2025}
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Annual Overview */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6 h-[500px]">
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Annual Overview
            </h2>
            <div className="h-[400px]">
              <AnnualMonthlySpendsChart month={selected} year={2025} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const MonthlyStats = ({ MonthlyAmount = {}, customClass = "" }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-3 w-full justify-between items-center ${customClass}`}
    >
      <TodaysStats
        statTitlel={"Income"}
        stat={MonthlyAmount.income}
        icon={<>{ArrowIcons.incArrow}</>}
        type={"income"}
      />
      <TodaysStats
        statTitlel={"Expense"}
        stat={MonthlyAmount.expense}
        icon={<>{ArrowIcons.decArrow}</>}
        type={"expense"}
      />
      <TodaysStats
        stat={MonthlyAmount.savings}
        type={"balance"}
        statTitlel="Balance"
        icon={<>{<WalletIcon />}</>}
      />
    </div>
  );
};

const ReportsBar = ({ selectedMonth, setSelectedMonth, customClass }) => {
  return (
    <div className={`flex w-full justify-between items-center ${customClass}`}>
      {/* <div className="">{selectedMonth}</div> */}
      <div className="">
        <Dropdown
          label="Select a Month"
          setSelected={setSelectedMonth}
          selected={selectedMonth}
          items={MONTHS_LIST}
        />
      </div>
      {/* To select ehich charts to show and hide model with checkboxes */}
      {/* <div className="">
        <Button1>View</Button1>
      </div> */}
    </div>
  );
};
