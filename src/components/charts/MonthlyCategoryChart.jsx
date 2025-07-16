import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getCategoryWiseTxnWrtMonth } from "../../utils/transactionsData";

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
  const expenseData = labels.map((label) => list[label]?.expense || 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: expenseData,
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Category-wise Expenses" },
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
};
