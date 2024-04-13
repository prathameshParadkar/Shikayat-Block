import React, { useEffect } from "react";
import APIRequests from "../api";

const TestComponent = () => {
  const mfetch = async () => {
    const res = await APIRequests.mtest().catch((err) =>
      console.log("test", err)
    );

    if (!res) return;
    console.log("mtest data", res.data);

    console.log("test", res.data.mdata.riskScores.combinedRisk);
    console.log("test t", res.data.mdata.riskMessage);
  };

  useEffect(() => {
    console.log("TestComponent mounted.");
    mfetch();
  }, []);
  return (
    <div className= "bg-blue-500 text-white p-4">
      <h1 className= "text-2xl font-bold">Hello, Tailwind CSS!</h1>
      <p className= "mt-2">Tailwind CSS is awesome!</p>
    </div>
  );
};

export default TestComponent;
