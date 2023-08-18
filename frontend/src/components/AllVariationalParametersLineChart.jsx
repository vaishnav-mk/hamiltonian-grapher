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

const AllVariationalParametersLineChart = ({ allVariationalParameters }) => {
  const [chartView, setChartView] = useState("line");

  const toggleChartView = () => {
    setChartView((prevView) => (prevView === "line" ? "bar" : "line"));
  };

  const mergedData = allVariationalParameters[0]?.map((_, index) => ({
    index: index + 1,
    ...allVariationalParameters.reduce((acc, params, graphIndex) => {
      acc[`iteration_${graphIndex + 1}`] = params[index];
      return acc;
    }, {}),
  }));

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={toggleChartView}
        >
          Toggle Chart View
        </button>
      </div>
      <div className="mt-4 h-auto min-h-full">
        {chartView === "line" ? (
          <LineChart width={1000} height={700} data={mergedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            {allVariationalParameters.map((_, graphIndex) => (
              <Line
                key={graphIndex}
                type="line"
                dataKey={`iteration_${graphIndex + 1}`}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                connectNulls
                strokeWidth={2}
              />
            ))}
          </LineChart>
        ) : (
          <BarChart width={1000} height={700} data={mergedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            {allVariationalParameters.map((_, graphIndex) => (
              <Bar
                key={graphIndex}
                dataKey={`iteration_${graphIndex + 1}`}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                barSize={5000}
              />
            ))}
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default AllVariationalParametersLineChart;
