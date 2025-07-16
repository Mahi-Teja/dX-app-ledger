import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getAnnualSpendsByMonths } from "../../utils/transactionsData";

export const AnnualMonthlySpendsChart = ({ year }) => {
  const transactions = useSelector((s) => s.transactions);
  const annualSpendsByMonth = getAnnualSpendsByMonths(transactions);

  const labels = Object.keys(annualSpendsByMonth);
  const incomeData = labels.map(
    (item) => annualSpendsByMonth[item].income || 0
  );
  const expenseData = labels.map(
    (item) => annualSpendsByMonth[item].expense || 0
  );
  const netData = labels.map((item) => annualSpendsByMonth[item].net || 0);

  const data = {
    labels,
    datasets: [
      {
        label: `Income in ${year}`,
        data: incomeData,
        borderColor: "rgba(47, 192, 55, 0.6)",
        backgroundColor: "rgba(47, 192, 55, 0.3)",
        fill: true,
        tension: 0.3,
      },
      {
        label: `Expense in ${year}`,
        data: expenseData,
        borderColor: "rgba(192, 47, 47, 0.6)",
        backgroundColor: "rgba(192, 47, 47, 0.3)",
        fill: true,
        tension: 0.3,
      },
      {
        label: `Balance in ${year}`,
        data: netData,
        borderColor: "rgba(75, 192, 192, 0.6)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: `Monthly Spend Overview - ${year}` },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Line data={data} options={options} />
    </div>
  );
};
