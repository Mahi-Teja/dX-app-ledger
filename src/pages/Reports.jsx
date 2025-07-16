import Chart from "chart.js/auto";
import Dropdown from "../app/state/Dropdown";
import { MONTHS_LIST } from "../utils/constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmptyFieldText from "../components/EmptyFieldText";
import DayWiseMonthlyChart from "../components/charts/DaywiswMonthlyChart";
import { MonthlyCategoryChart } from "../components/charts/MonthlyCategoryChart";
import { AnnualMonthlySpendsChart } from "../components/charts/AnnualMonthlyChart";

export const Reports = () => {
  const [selected, setSelected] = useState(new Date().getMonth());
  const transactions = useSelector((s) => s.transactions);
  const [toggletype, setToggletype] = useState("income");

  const noData = transactions.length <= 0;

  return (
    <section className="w-full overflow-auto pb-10">
      <h1 className="text-2xl font-bold text-center mb-6">Reports</h1>

      {noData ? (
        <EmptyFieldText customClass="w-fit mx-auto px-5">
          Nothing to show at the moment
        </EmptyFieldText>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {/* Monthly Report Card */}
          <div className="bg-white rounded-2xl md:col-span-2 lg:col-span-3 shadow-md p-6 space-y-6 h-[500px]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Monthly Report
              </h2>
              <Dropdown
                label="Select a Month"
                setSelected={setSelected}
                selected={selected}
                items={MONTHS_LIST}
              />
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
              <MonthlyCategoryChart
                month={selected}
                type={toggletype}
                year={2025}
              />
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
