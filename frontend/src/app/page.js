"use client";
import React from "react";
import InputForm from "@/components/InputForm";

function App() {
  return (
    <div className="min-h-screen bg-[#2c2c2e] flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-black ">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#bb8249]">
          Ctrl Alt Del -{" "}
        </span>

        <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#bb8249]">
          Hamiltonian Graphing
        </span>
      </h1>
      <div className="bg-[#1c1c1e] rounded-lg p-6 shadow-2xl">
        <InputForm />
      </div>
    </div>
  );
}

export default App;
