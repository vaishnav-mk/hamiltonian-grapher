"use client"
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client"; // Import socket.io-client library
import GraphDetails from "@/components/GraphDetails";

const WebSocketPage = () => {
  const [socketStatus, setSocketStatus] = useState("");
  const [iterations, setIterations] = useState([]);
  
  useEffect(() => {
    const socket = io("ws://localhost:8000");
    
    socket.on("connect", () => {
      setSocketStatus("Connected");
      
      // Send a message to start the calculation
      const requestData = {
        terms: [
          // ... Define your Hamiltonian terms here
        ],
      };
      socket.emit("start_calculation", requestData);
    });

    socket.on("iteration_update", (iteration) => {
      // Handle the iteration update
      setIterations((prevIterations) => [...prevIterations, iteration]);
    });

    socket.on("calculation_completed", () => {
      // Handle calculation completion
      setSocketStatus("Calculation completed");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#2c2c2e] flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-[#bb8249]">
          Ctrl Alt Del -{" "}
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-[#bb8249]">
          Hamiltonian Graphing
        </span>
      </h1>
      <div className="bg-[#1c1c1e] rounded-lg p-6 shadow-2xl">
        {iterations.map((iteration, index) => (
          <div key={index}>
            <p>Iteration: {iteration.iteration}</p>
            <p>Status: {iteration.status}</p>
          </div>
        ))}
        <p>{socketStatus}</p>
      </div>
    </div>
  );
};

export default WebSocketPage;
