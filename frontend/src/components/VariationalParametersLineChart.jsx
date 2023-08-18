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

const VariationalParametersLineChart = ({ variationalParameters }) => {
  const [chartView, setChartView] = useState("line");

  const toggleChartView = () => {
    setChartView((prevView) => (prevView === "line" ? "bar" : "line"));
  };

  const data = variationalParameters.map((value, index) => ({
    index: index + 1,
    value,
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
      <div className="mt-4">
        {chartView === "line" ? (
          <LineChart width={1000} height={700} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="line" dataKey="value" stroke="#8884d8" />
          </LineChart>
        ) : (
          <BarChart width={1000} height={700} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default VariationalParametersLineChart;
