import { memo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"; 

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6B6B",
  "#6BCB77", "#FFD93D", "#FF6F91", "#6A4C93", "#FF9671", "#FFC75F",
  "#F9F871", "#845EC2", "#D65DB1", "#FFABAB", "#B5EAEA", "#FFDAC1",
  "#E2F0CB", "#B0A8B9", "#FFC3A0", "#FFEE93", "#9AE3D4", "#FAD2E1",
  "#C9F0FF", "#FFB3C1", "#A0CED9", "#FFAAA6", "#FFD3B6", "#D5AAFF"
];

const CategoryWiseTotalChart = memo(function CategoryWiseTotalChart({
  title,
  dataSet2,
  nameKey,
  dataKey,
  innerRadius = 20,
  outerRadius = 90,
  paddingAngle = 1,
  activeShape = false,
}) {
  return (
    <ChartContainer title={title} className="h-96">
      <ChartBodyWrapper>
        <PieChartWrapper
          dataSet={dataSet2}
          nameKey={nameKey}
          dataKey={dataKey}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          activeShape={activeShape}
        />
      </ChartBodyWrapper>
    </ChartContainer>
  );
});

export default CategoryWiseTotalChart;

export const PieChartWrapper = ({
  dataSet,
  dataKey,
  nameKey,
  innerRadius,
  outerRadius,
  paddingAngle,
  activeShape,
}) => {
  // Filter only valid positive numbers
  const chartData =
    Array.isArray(dataSet) && dataSet.length > 0
      ? dataSet
          .filter(d => typeof d[dataKey] === "number" && !isNaN(d[dataKey]) && d[dataKey] > 0)
          .map(d => ({ ...d, [dataKey]: Math.abs(d[dataKey]) }))
      : [];

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-full w-full text-gray-500 font-medium">
        No {dataKey} data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          activeShape={activeShape}
          label={({ name, value }) => `${name}: ${value}`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${dataKey}-${nameKey}-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

// ChartContainer.js
export const ChartContainer = ({ children, title, className = "" }) => {
  return (
    <div
      className={`flex-1 flex flex-col items-center bg-white/50 rounded-lg shadow-sm p-4 ${className}`}
    >
      <h3 className="text-md font-medium mb-3 text-gray-700">{title}</h3>
      {children}
    </div>
  );
};

export const ChartBodyWrapper = ({ children }) => {
  return (
    <div className="w-full p-2 flex flex-col flex-1 justify-center items-center bg-white/50">
      {children}
    </div>
  );
};

