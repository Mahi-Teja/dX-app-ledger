import { Line, Bar } from "react-chartjs-2";
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
import {
  categoryWiseTxnWrtYear,
  getCategoryAndAmount,
} from "../utils/transactionsData";

// Register components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);
const LineChart = () => {
  const categories = useSelector((s) => s.categories);
  const transactions = useSelector((s) => s.transactions);
  let list = getCategoryAndAmount(transactions, categories);
  let d = Object.values(list);
  let l = Object.keys(list);
  // console.log(list, d, l);

  const yearCatList = categoryWiseTxnWrtYear(transactions, categories);

  const data = {
    labels: l,
    datasets: [
      {
        label: "amount",
        data: categories.map((c) => list[c.category].income),
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
        fill: false,
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
        text: "Category wise data",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default LineChart;
