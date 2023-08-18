import React, { useState, useMemo } from "react";
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

const AveragedChart = ({ data }) => {
  const [chartType, setChartType] = useState("line");
  const [plotMinima, setPlotMinima] = useState(true);
  const [plotMaxima, setPlotMaxima] = useState(true);

  const averagedData = useMemo(() => {
    if (!data.length) return [];

    const numIterations = data[0].length;
    const averagedData = data[0]?.map((_, index) => {
      const iterationData = data.map((params) => params[index]);
      const average =
        iterationData.reduce((sum, value) => sum + value, 0) / data.length;

      return {
        index: index + 1,
        average,
      };
    });

    return averagedData;
  }, [data]);

  const globalMinima = Math.min(...averagedData.map((item) => item.average));
  const globalMaxima = Math.max(...averagedData.map((item) => item.average));

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
          {plotMinima && (
            <ReferenceLine
              type="horizontal"
              y={globalMinima}
              stroke="green"
              label={`Global Minima: ${globalMinima.toFixed(3)}`}
            />
          )}
          {plotMaxima && (
            <ReferenceLine
              type="horizontal"
              y={globalMaxima}
              stroke="red"
              label={`Global Maxima: ${globalMaxima.toFixed(3)}`}
            />
          )}
        </ChartComponent>
      </div>
      <div className="mt-4 bg-[#1c1c1e] p-4 rounded-lg shadow-md border border-gray-200">
        <p className="text-white items-center flex gap-2">
          <input
            type="checkbox"
            checked={plotMaxima}
            onChange={() => setPlotMaxima((prev) => !prev)}
            className="toggle toggle-sm"
          />
          <span className="font-semibold text-green-500">Average Maxima:</span>{" "}
          {globalMaxima.toFixed(3)}
        </p>
        <p className="text-white items-center flex gap-2">
          <input
            type="checkbox"
            checked={plotMinima}
            onChange={() => setPlotMinima((prev) => !prev)}
            className="toggle toggle-sm"
          />
          <span className="font-semibold text-red-500">Average Minima:</span>{" "}
          {globalMinima.toFixed(3)}
        </p>
      </div>
    </div>
  );
};

export default AveragedChart;
