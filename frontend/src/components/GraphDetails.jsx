import React from "react";

const GraphDetails = ({ data, index, isActive, onClick }) => {
  const handleClick = () => {
    onClick(index);
  };

  return (
    <div
      className={`bg-[#1c1c1e] p-4 rounded-lg shadow-md ${
        isActive ? "border-2 border-blue-500" : "border border-gray-200"
      }`}
      onClick={handleClick}
    >
      <p className="text-lg font-semibold mb-2 text-white">Graph {index + 1}</p>
      <p className="text-white">
        <span className="font-semibold">Eigenstate:</span> {data.eigenstate}
      </p>
      <p className="text-white">
        <span className="font-semibold">Eigenvalue:</span> {data.eigenvalue}
      </p>
    </div>
  );
};

export default GraphDetails;
