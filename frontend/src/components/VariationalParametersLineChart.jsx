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
  ReferenceLine,
} from "recharts";

const VariationalParametersLineChart = ({ variationalParameters }) => {
  const [chartView, setChartView] = useState("line");
  const [plotMinima, setPlotMinima] = useState(true);
  const [plotMaxima, setPlotMaxima] = useState(true);

  const toggleChartView = () => {
    setChartView((prevView) => (prevView === "line" ? "bar" : "line"));
  };

  const data = variationalParameters.map((value, index) => ({
    index: index + 1,
    value,
  }));

  const minima = Math.min(...variationalParameters);
  const maxima = Math.max(...variationalParameters);

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
            <Line type="line" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            {plotMinima && (
              <ReferenceLine
                y={minima}
                stroke="green"
                label={`Minima: ${minima.toFixed(3)}`}
              />
            )}
            {plotMaxima && (
              <ReferenceLine
                y={maxima}
                stroke="red"
                label={`Maxima: ${maxima.toFixed(3)}`}
              />
            )}
          </LineChart>
        ) : (
          <BarChart width={1000} height={700} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
            {plotMinima && (
              <ReferenceLine
                y={minima}
                stroke="red"
                label={`Minima: ${minima.toFixed(3)}`}
              />
            )}
            {plotMaxima && (
              <ReferenceLine
                y={maxima}
                stroke="green"
                label={`Maxima: ${maxima.toFixed(3)}`}
              />
            )}
          </BarChart>
        )}
      </div>

      <div className="mt-4 bg-[#1c1c1e] p-4 rounded-lg shadow-md border border-gray-200">
        <p className="text-white items-center flex gap-2">
          <input
            type="checkbox"
            checked={plotMaxima}
            onChange={() => setPlotMaxima((prev) => !prev)}
            className="toggle toggle-sm"
          />
          <span className="font-semibold text-green-500">Graph Maxima:</span>{" "}
          {minima.toFixed(3)}{" "}
        </p>
        <p className="text-white items-center flex gap-2">
          <input
            type="checkbox"
            checked={plotMinima}
            onChange={() => setPlotMinima((prev) => !prev)}
            className="toggle toggle-sm"
          />
          <span className="font-semibold text-red-500">Graph Minima:</span>{" "}
          {maxima.toFixed(3)}{" "}
        </p>
      </div>
    </div>
  );
};

export default VariationalParametersLineChart;
