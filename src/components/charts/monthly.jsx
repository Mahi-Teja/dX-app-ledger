import "./chartsSetup";
import { Line, Bar, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  getAnnualSpendsByMonths,
  // getCategoryAndAmount,
  getCategoryWiseTxnWrtMonth,
  getDaywiseAmountOfAMonth,
  // getMonthlyTxnAmt,
} from "../../utils/transactionsData";
import { MONTHS_LIST } from "../../utils/constants";
// import { useState } from "react";
// import { data } from "react-router-dom";

// show indicates to render income (1), income & expense(2) or all three(3)  in one graph
const DayWiseMonthlyChart = ({
  month,
  year = new Date().getFullYear(),
  show = 2,
}) => {
  const transactions = useSelector((s) => s.transactions);
  // const [MonthName, setMonthName] = useState(null);
  const monthName = MONTHS_LIST[month];
  const noOfDaysInThatMonth = new Date(year, month + 1, 0).getDate();

  const dayAndAmount = getDaywiseAmountOfAMonth(transactions, month);

  // Formating for Charts
  const lables = Array.from({ length: noOfDaysInThatMonth }, (_, i) =>
    (i + 1).toString()
  );

  const netData = lables.map((lb) => dayAndAmount[lb]?.net || 0);
  const incomeData = lables.map((lb) => dayAndAmount[lb]?.income || 0);
  const expenseData = lables.map((lb) => dayAndAmount[lb]?.expense || 0);

  const dataSetsToRender = () => {
    if (show > 3) show = 3;
    let datasets = [
      {
        label: "expense",
        data: expenseData,
        backgroundColor: "rgba(251, 68, 68, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "income",
        data: incomeData,
        backgroundColor: "rgba(84, 228, 84, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "net",
        data: netData,
        backgroundColor: "rgba(84, 228, 84, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ];

    return datasets.slice(0, show);
  };
  const MonthlyData = {
    labels: lables,
    datasets: dataSetsToRender(),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Day wise data of  ${monthName}`,
      },
    },
  };

  return <Bar data={MonthlyData} options={options} />;
};

export const MonthlyCategoryChart = ({ month, year }) => {
  const transactions = useSelector((s) => s.transactions);
  const categories = useSelector((s) => s.categories);

  const list = getCategoryWiseTxnWrtMonth(
    categories,
    transactions,
    month,
    year
  );

  const labels = Object.keys(list);
  const values = Array(list).map((item) => item.net);

  const netData = labels.map((lb) => list[lb]?.net || 0);
  const incomeData = labels.map((lb) => list[lb]?.income || 0);
  const expenseData = labels.map((lb) => list[lb]?.expense || 0);

  const data = {
    labels, // should be an array of 10 strings
    datasets: [
      {
        label: "Expense",
        data: expenseData, // should be an array of 10 numbers
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(201, 203, 207)",
          "rgb(255, 99, 255)",
          "rgb(54, 162, 100)",
          "rgb(100, 100, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {};

  return <Bar data={data} options={options} />;
};

export const AnnualMonthlySpendsChart = ({ year }) => {
  const transactions = useSelector((s) => s.transactions);
  const annualSpendsBymonth = getAnnualSpendsByMonths(transactions);

  const labels = Object.keys(annualSpendsBymonth);
  const incomeDate = labels.map((item) => annualSpendsBymonth[item].income);
  const expenseDate = labels.map((item) => annualSpendsBymonth[item].expense);
  const netDate = labels.map((item) => annualSpendsBymonth[item].net);

  // console.log(labels, values);

  const data = {
    labels,
    datasets: [
      {
        label: `Income in ${year}`,
        data: incomeDate,
        borderColor: "rgba(47, 192, 55, 0.6)",
        backgroundColor: "rgba(47, 192, 55, 0.6)",
        fill: true,
        tension: 0.3, // for smooth lines
      },
      {
        label: `Expense in ${year}`,
        data: expenseDate,
        borderColor: "rgba(192, 47, 47, 0.6)",
        backgroundColor: "rgba(192, 47, 47, 0.6)",
        fill: true,
        tension: 0.3, // for smooth lines
      },
      {
        label: `Balance in ${year}`,
        data: netDate,
        borderColor: "rgba(75, 192, 192, 0.2)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3, // for smooth lines
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Monthly Spend Overview - ${year}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Line data={data} options={options} />;
};
export default DayWiseMonthlyChart;
/*
Summary Table
Chart Type	                    Labels	          Data	                Best Visual
Daily Spends (1 month)	  ["1", ..., "30"]	      [amt/day]	              Line/Bar
Category Breakdown	      ["Food", "Rent", ...]	  [amt/category]	        Doughnut/Bar
Monthly Comparison	      ["Jan", ..., "Dec"]	    [amt/month]	            Line/Bar
Payment Method Split	    ["UPI", "Cash", ...]	  [amt/method]	          Pie
Top Spending Areas	      Top 3–5 categories	    [amt]	                  Bar
Income vs Expense	        ["Jan", ..., "Dec"]	    [income[], expense[]]	  Line/Bar
*/
