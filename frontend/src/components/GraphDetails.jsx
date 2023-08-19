import React from "react";

const GraphDetails = ({ data, index, isActive, onClick }) => {
  const handleClick = () => {
    onClick(index);
  };

  const eigenStates = data.eigenstate;
  const variationalParameters = data.variational_parameters || [];

  return (
    <div
      className={`bg-[#1c1c1e] p-4 rounded-lg max-w-4xl shadow-md ${
        isActive ? "border-2 border-blue-500" : "border border-gray-200"
      }`}
      onClick={handleClick}
    >
      <p className="text-lg font-semibold mb-2 text-white">Graph {index + 1}</p>
      <div className="text-white flex flex-col gap-4">
        <p className="font-semibold">Eigenstate:</p>
        <table className="text-white border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">Binary</th>
              <th className="border border-gray-400 p-2">Decimal</th>
              <th className="border border-gray-400 p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(eigenStates).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-400 p-2">{key}</td>
                <td className="border border-gray-400 p-2">
                  {parseInt(key, 2)}
                </td>
                <td
                  className={`border ${
                    Math.max(...Object.values(eigenStates)) === value
                      ? "bg-green-800"
                      : Math.min(...Object.values(eigenStates)) === value
                      ? "bg-red-800"
                      : ""
                  } px-3 py-1 text-sm font-semibold text-white`}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider"></div>

      <p className="text-white mt-4 mb-4">
        <span className="font-semibold">Eigenvalue:</span>{" "}
        <span className="bg-gray-700 rounded-md px-3 py-1 text-sm font-semibold text-white">
          {data.eigenvalue}
        </span>
      </p>
      <div className="divider"></div>
      <p className="text-white flex flex-row flex-wrap gap-2">
        <span className="font-semibold">Variational Parameters:</span>{" "}
        {variationalParameters.map((param, index) => (
          <span
            key={index}
            className="inline-block bg-gray-700 rounded-md px-3 py-1 text-sm font-semibold text-white mr-2"
          >
            {param}
          </span>
        ))}
      </p>
    </div>
  );
};

export default GraphDetails;
