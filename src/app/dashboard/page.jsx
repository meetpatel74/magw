"use client";
import React, { useEffect, useState } from "react";
import BarChart from "../../components/common/BarChart";
import PieChart from "../../components/common/PieChart";
import ExportButton from "../../components/common/ExportButton";

const mockBarData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  data: [12, 19, 3, 5, 2],
};
const mockPieData = {
  labels: ["Admin", "User", "Guest"],
  data: [10, 20, 5],
};

export default function DashboardPage() {
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setBarData(mockBarData);
      setPieData(mockPieData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="mb-2 font-semibold">Monthly Records</h2>
          <BarChart labels={barData.labels} data={barData.data} />
        </div>
        <div>
          <h2 className="mb-2 font-semibold">User Distribution</h2>
          <PieChart labels={pieData.labels} data={pieData.data} />
        </div>
      </div>
      <ExportButton barData={barData} pieData={pieData} />
    </div>
  );
}
