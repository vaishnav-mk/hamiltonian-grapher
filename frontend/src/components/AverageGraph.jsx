import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const AveragedChart = ({ data }) => {
  const [chartType, setChartType] = useState("line"); // Initialize chartType state

  const averagedData = data[0]?.map((_, index) => ({
    index: index + 1,
    average: data.reduce((sum, params) => sum + params[index], 0) / data.length,
  }));

  const handleChartTypeToggle = () => {
    setChartType((prevType) => (prevType === "line" ? "bar" : "line"));
  };

  const ChartComponent = chartType === "line" ? LineChart : BarChart;
  const BarOrLine = chartType === "line" ? Line : Bar;

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleChartTypeToggle}
        >
          Toggle Chart View
        </button>
      </div>
      <div className="mt-4">
        <ChartComponent width={1000} height={700} data={averagedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Legend />
          <BarOrLine
            type={chartType}
            dataKey="average"
            stroke={`#f70000`}
            fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            strokeWidth={1.5}
            connectNulls
          />
        </ChartComponent>
      </div>
    </div>
  );
};

export default AveragedChart;
