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

const AllVariationalParametersLineChart = ({ allVariationalParameters }) => {
  const [chartView, setChartView] = useState("line");
  const [plotMinima, setPlotMinima] = useState(true);
  const [plotMaxima, setPlotMaxima] = useState(true);

  const toggleChartView = () => {
    setChartView((prevView) => (prevView === "line" ? "bar" : "line"));
  };

  const mergedData = useMemo(() => {
    if (!allVariationalParameters.length) return [];

    const numIterations = allVariationalParameters[0].length;
    const data = allVariationalParameters[0].map((_, index) => {
      return {
        index: index + 1,
        ...allVariationalParameters.reduce((acc, params, graphIndex) => {
          acc[`iteration_${graphIndex + 1}`] = params[index];
          return acc;
        }, {}),
      };
    });

    const flattenedData = data
      .map((item) => Object.values(item).slice(1))
      .flat();
    const globalMinima = Math.min(...flattenedData);
    const globalMaxima = Math.max(...flattenedData);

    return { data, globalMinima, globalMaxima };
  }, [allVariationalParameters]);

  const ChartComponent = chartView === "line" ? LineChart : BarChart;
  const BarOrLine = chartView === "line" ? Line : Bar;

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
        <ChartComponent width={1000} height={700} data={mergedData.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Legend />
          {allVariationalParameters.map((_, graphIndex) => (
            <BarOrLine
              key={graphIndex}
              type={chartView}
              dataKey={`iteration_${graphIndex + 1}`}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              connectNulls
              strokeWidth={2}
            />
          ))}
          {plotMinima && (
            <ReferenceLine
              type="horizontal"
              y={mergedData.globalMinima}
              stroke="red"
              label={`Global Minima: ${mergedData.globalMinima.toFixed(3)}`}
            />
          )}
          {plotMaxima && (
            <ReferenceLine
              type="horizontal"
              y={mergedData.globalMaxima}
              stroke="green"
              label={`Global Maxima: ${mergedData.globalMaxima.toFixed(3)}`}
            />
          )}
        </ChartComponent>
      </div>
      <div className="mt-4 bg-[#1c1c1e] p-4 rounded-lg shadow-md border border-gray-200">
        <p className="text-white items-center flex gap-2">
          <input
            type="checkbox"
            checked={plotMinima}
            onChange={() => setPlotMaxima((prev) => !prev)}
            className="toggle toggle-sm"
          />
          <span className="font-semibold text-green-500">Global Maxima:</span>{" "}
          {mergedData.globalMaxima.toFixed(3)}
        </p>
        <p className="text-white items-center flex gap-2">
          <input
            type="checkbox"
            checked={plotMaxima}
            onChange={() => setPlotMinima((prev) => !prev)}
            className="toggle toggle-sm"
          />
          <span className="font-semibold text-red-500">Global Minima:</span>{" "}
          {mergedData.globalMinima.toFixed(3)}
        </p>
      </div>
    </div>
  );
};

export default AllVariationalParametersLineChart;
