import { memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartBodyWrapper } from "./CateoryWiseTotalsChart";

const MonthlyTotalsChart = memo(function MonthlyTotalsChart({ dataSet, title }) {
  return (
    <ChartContainer title={title} className="h-96">
      <ChartBodyWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataSet}>
            <CartesianGrid strokeDasharray="8 8" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="income"
              fill="#4ade80"
              radius={[3, 3, 0, 0]}
              barSize={24}
              animationDuration={800}
              animationBegin={100}
              isAnimationActive={true}
            />
            <Bar
              dataKey="expense"
              fill="#f87171"
              radius={[3, 3, 0, 0]}
              barSize={24}
              animationDuration={800}
              animationBegin={100}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartBodyWrapper>
    </ChartContainer>
  );
});

export default MonthlyTotalsChart;
