import React, { useState } from "react";
import VariationalParametersLineChart from "./VariationalParametersLineChart";
import GraphDetails from "./GraphDetails";
import AllVariationalParametersLineChart from "./AllVariationalParametersLineChart";
import AverageGraph from "./AverageGraph";

const InputForm = () => {
  const [terms, setTerms] = useState([
    { coefficient: "0.00698131079425246", operator: "IIZ" },
  ]);
  const [iterations, setIterations] = useState("1");
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [inputText, setInputText] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [activeGraphIndex, setActiveGraphIndex] = useState(0);
  const [showAllGraphs, setShowAllGraphs] = useState(false);
  const [graphType, setGraphType] = useState("all");

  const handleCoefficientChange = (e, index) => {
    const newTerms = [...terms];
    newTerms[index].coefficient = e.target.value.replace(/\s/g, "");
    setTerms(newTerms);
  };

  const handleOperatorChange = (e, index) => {
    const newTerms = [...terms];
    newTerms[index].operator = e.target.value.replace(/\s/g, "");
    setTerms(newTerms);
  };

  const handleIterationsChange = (e) => {
    setIterations(e.target.value);
  };

  const toggleView = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  const handleAddButton = () => {
    setTerms([...terms, { coefficient: "", operator: "" }]);
  };

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleConvertInput = () => {
    const newTerms = inputText
      .split("\n")
      .map((line) => line.split(" * "))
      .map(([coefficient, operator]) => ({
        coefficient: coefficient.trim(),
        operator: operator.trim(),
      }));
    console.log(newTerms);

    setTerms(newTerms);
    setIsFlipped(false);
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/eigen?iterations=${iterations}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          terms,
        }),
      });
      const responseData = await response.json();
      setResponseData(responseData);
      setActiveGraphIndex(0);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleNextGraphClick = () => {
    setActiveGraphIndex(
      (prevIndex) => (prevIndex + 1) % (responseData.length + 1)
    );
  };

  const handlePreviousGraphClick = () => {
    setActiveGraphIndex((prevIndex) =>
      prevIndex === 0 ? responseData.length - 1 : prevIndex - 1
    );
  };

  const handleChartTypeToggle = () => {
    setGraphType((prevType) => (prevType === "all" ? "average" : "all"));
  };

  const handleGraphClick = (index) => {
    setActiveGraphIndex(index);
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4">
        <div>
          <div className=" p-4 rounded-md bg-[#111111]">
            {isFlipped ? (
              <textarea
                className=" rounded w-full py-1 px-2"
                rows="10"
                value={inputText}
                onChange={handleInputTextChange}
              />
            ) : (
              terms.map((term, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-4 w-full justify-between"
                >
                  <div>
                    <label className="block mb-2">
                      <span className="mr-2 text-white">Coefficient:</span>
                      <input
                        className=" rounded w-full py-1 px-2"
                        type="text"
                        value={term.coefficient}
                        onChange={(e) => handleCoefficientChange(e, index)}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">
                      <span className="mr-2 text-white">Operator:</span>
                      <input
                        className=" rounded w-full py-1 px-2"
                        type="text"
                        value={term.operator}
                        onChange={(e) => handleOperatorChange(e, index)}
                      />
                    </label>
                  </div>

                  <div className="">
                    <label className="mb-2 flex flex-col">
                      <span className="mr-2 text-black">-</span>
                      <button
                        className={`${
                          loading ? "bg-gray-400" : "bg-red-500"
                        } text-white px-2 py-1 rounded`}
                        onClick={() => {
                          const newTerms = [...terms];
                          newTerms.splice(index, 1);
                          setTerms(newTerms);
                        }}
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </label>
                  </div>
                </div>
              ))
            )}
            <div>
              <label className="block mb-2">
                <span className="mr-2 text-white">Iterations:</span>
                <input
                  className=" rounded w-full py-1 px-2"
                  type="number"
                  value={iterations}
                  onChange={handleIterationsChange}
                />
              </label>
            </div>
            <div>
              {isFlipped ? (
                <div className="flex justify-between gap-4">
                  <button
                    className={`${
                      loading ? "bg-gray-400" : "bg-blue-500"
                    } text-white px-4 py-2 rounded`}
                    onClick={handleConvertInput}
                    disabled={loading}
                  >
                    Convert and Apply
                  </button>
                  <div className="flex flex-row gap-1 items-center rounded-md p-2">
                    <input
                      type="checkbox"
                      className={`toggle ${
                        isFlipped ? "toggle-success" : "toggle-error"
                      }`}
                      checked={isFlipped}
                      onChange={toggleView}
                    />
                    <label htmlFor="toggle" className="text-white">
                      Toggle View
                    </label>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <button
                    className={`${
                      loading ? "bg-gray-400" : "bg-blue-500"
                    } text-white px-4 py-2 rounded`}
                    onClick={handleButtonClick}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                  <div className="flex flex-row gap-1 items-center rounded-md p-2">
                    <input
                      type="checkbox"
                      className={`toggle ${
                        isFlipped ? "toggle-success" : "toggle-error"
                      }`}
                      checked={isFlipped}
                      onChange={toggleView}
                    />
                    <label htmlFor="toggle" className="ml-2 text-white">
                      Toggle View
                    </label>
                  </div>
                  <button
                    className={`${
                      loading ? "bg-gray-400" : "bg-green-500"
                    } text-white px-4 py-2 rounded`}
                    onClick={handleAddButton}
                    disabled={loading}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center h-48 w-full">
            <div className="animate-pulse w-full h-40 bg-gray-600 rounded-md p-4 flex flex-col gap-4">
              <div className="animate-pulse w-full h-5 bg-gray-300 rounded-md"></div>
              <div className="animate-pulse w-2/3 h-5 bg-gray-300 rounded-md"></div>
              <div className="animate-pulse w-3/5 h-5 bg-gray-300 rounded-md"></div>
              <div className="animate-pulse w-4/5 h-5 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center h-48 w-full">
            <div className="animate-pulse w-full h-40 bg-gray-600 rounded-md p-4 flex flex-col gap-4">
              <div className="animate-pulse w-full h-5 bg-gray-300 rounded-md"></div>
              <div className="animate-pulse w-2/3 h-5 bg-gray-300 rounded-md"></div>
              <div className="animate-pulse w-3/5 h-5 bg-gray-300 rounded-md"></div>
              <div className="animate-pulse w-4/5 h-5 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        )}
        {!loading && responseData.length > 0 && (
          <div className=" flex flex-col gap-4 justify-around p-4 rounded-md bg-[#111111]">
            <h1 className="text-2xl font-semibold text-white">
              {graphType === "all"
                ? `Graph for all ${responseData.length} iterations`
                : `Average Graph for ${responseData.length} iterations`}
            </h1>
            <button
              className={`${
                graphType == "all" ? "bg-green-500" : "bg-red-500"
              } text-white px-4 py-2 rounded self-end`}
              onClick={handleChartTypeToggle}
            >
              View {graphType === "all" ? "Average" : "All"} Graph
              {!graphType === "all" ? "s" : ""}
            </button>
            {graphType === "all" ? (
              <AllVariationalParametersLineChart
                allVariationalParameters={responseData.map(
                  (data) => data.variational_parameters
                )}
              />
            ) : (
              <AverageGraph
                data={responseData.map((data) => data.variational_parameters)}
              />
            )}
          </div>
        )}
        {!loading && responseData.length > 0 && (
          <div className=" flex flex-col gap-4 justify-around p-4 rounded-md bg-[#111111]">
            <h1 className="text-2xl font-semibold text-white">
              All Variational Parameters
            </h1>
            <div className="flex flex-row gap-4 justify-around">
              <div className="flex flex-col gap-3">
                {responseData.slice(0, 3).map((data, index) => (
                  <GraphDetails
                    key={index}
                    data={data}
                    index={index}
                    isActive={index === activeGraphIndex}
                    onClick={handleGraphClick}
                  />
                ))}

                {responseData.length > 3 && (
                  <>
                    {showAllGraphs && (
                      <div className="flex flex-col gap-2">
                        {responseData.slice(3).map((data, index) => (
                          <GraphDetails
                            key={index}
                            data={data}
                            index={index + 3}
                            isActive={index + 3 === activeGraphIndex}
                            onClick={handleGraphClick}
                          />
                        ))}
                      </div>
                    )}
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => setShowAllGraphs(!showAllGraphs)}
                    >
                      {showAllGraphs
                        ? "Hide Additional Graphs"
                        : "View All Graphs"}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="items-center flex flex-row justify-around">
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  responseData.length <= 1 || activeGraphIndex === 0 ? "" : ""
                }`}
                onClick={handlePreviousGraphClick}
              >
                {"<"}
              </button>
              <button
                className={`bg-green-500 text-white px-4 py-2 rounded ${
                  responseData.length <= 1 ||
                  activeGraphIndex === responseData.length - 1
                    ? "hidden"
                    : ""
                }`}
                onClick={handleNextGraphClick}
              >
                {activeGraphIndex === responseData.length - 1 ? "Done" : ">"}
              </button>
            </div>
          </div>
        )}

        {!loading && responseData.length > 0 && (
          <div className="gap-4 justify-around p-4 rounded-md bg-[#111111]">
            <h1 className="text-2xl font-semibold text-white">
              Displaying Graph # {activeGraphIndex + 1}
            </h1>
            <div className="mt-4 w-full">
              <VariationalParametersLineChart
                variationalParameters={
                  responseData[activeGraphIndex]?.variational_parameters || []
                }
                activeGraphIndex={activeGraphIndex}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;
