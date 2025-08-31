import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { useSelector } from "react-redux";
import { getDaywiseAmountOfAMonth } from "../../utils/transactionsData";
import { MONTHS_LIST } from "../../utils/constants";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const DayWiseMonthlyChart = ({
  month,
  year = new Date().getFullYear(),
  show = 2,
}) => {
  const transactions = useSelector((s) => s.transactions);
  const monthName = MONTHS_LIST[month];
  const noOfDaysInThatMonth = new Date(year, month + 1, 0).getDate();

  const dayAndAmount = getDaywiseAmountOfAMonth(transactions, month);

  const labels = Array.from({ length: noOfDaysInThatMonth }, (_, i) =>
    (i + 1).toString()
  );

  const netData = labels.map((lb) => dayAndAmount[lb]?.net || 0);
  const incomeData = labels.map((lb) => dayAndAmount[lb]?.income || 0);
  const expenseData = labels.map((lb) => dayAndAmount[lb]?.expense || 0);

  const datasets = [
    {
      label: "Expense",
      data: expenseData,
      backgroundColor: "rgba(251, 68, 68, 0.8)",
    },
    {
      label: "Income",
      data: incomeData,
      backgroundColor: "rgba(84, 228, 84, 0.8)",
    },
    {
      label: "Net",
      data: netData,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ];

  const data = {
    labels,
    datasets: datasets.slice(0, Math.min(show, 3)),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Day wise data of ${monthName}`,
      },
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DayWiseMonthlyChart;
