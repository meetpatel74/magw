"use client";
import React, { useEffect, useState } from "react";
import BarChart from "../../components/common/BarChart";
import PieChart from "../../components/common/PieChart";
import ExportButton from "../../components/common/ExportButton";
import { statsService } from "@/services/api";

export default function DashboardPage() {
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch user role counts
        const userRoleCounts = await statsService.getUserRoleCounts();
        const pieLabels = Object.keys(userRoleCounts).map(
          (role) => role.charAt(0).toUpperCase() + role.slice(1)
        );
        const pieValues = Object.values(userRoleCounts);
        setPieData({ labels: pieLabels, data: pieValues });

        // Fetch artwork year counts
        const artworkYearCounts = await statsService.getArtworkYearCounts();
        // Sort years ascending
        const sortedYears = Object.keys(artworkYearCounts).sort();
        const barValues = sortedYears.map((year) => artworkYearCounts[year]);
        setBarData({ labels: sortedYears, data: barValues });

        setError(null);
      } catch (err) {
        setError("Error loading data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="mb-2 font-semibold">Artworks by Year</h2>
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
