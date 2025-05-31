// src/app/exhibitions/page.jsx
"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { exhibitionService } from "@/services/api";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function Exhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    type: "",
    current: null,
    upcoming: null,
  });

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        setLoading(true);
        const data = await exhibitionService.getAll(filter);
        setExhibitions(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching exhibitions:", err);
        setError("Failed to load exhibitions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, [filter]);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Exhibitions</h1>

          {/* Filter controls */}
          <div className="flex space-x-4">
            <select
              className="border rounded px-3 py-2"
              value={filter.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <option value="">All Types</option>
              <option value="contemporary">Contemporary</option>
              <option value="classical">Classical</option>
              <option value="digital">Digital</option>
              <option value="photography">Photography</option>
              <option value="sculpture">Sculpture</option>
              <option value="other">Other</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={filter.current === null ? "" : filter.current.toString()}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? null : e.target.value === "true";
                handleFilterChange("current", value);
              }}
            >
              <option value="">All Status</option>
              <option value="true">Current</option>
              <option value="false">Not Current</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={filter.upcoming === null ? "" : filter.upcoming.toString()}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? null : e.target.value === "true";
                handleFilterChange("upcoming", value);
              }}
            >
              <option value="">All Timing</option>
              <option value="true">Upcoming</option>
              <option value="false">Not Upcoming</option>
            </select>
          </div>
        </div>

        {/* Loading and error states */}
        {loading && <p className="text-center py-8">Loading exhibitions...</p>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Exhibition grid */}
        {!loading && !error && exhibitions.length === 0 && (
          <p className="text-center py-8">
            No exhibitions found matching your criteria.
          </p>
        )}

        {!loading && !error && exhibitions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exhibitions.map((exhibition) => (
              <div
                key={exhibition.id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={exhibition.image || "/gallary-exh.jpg"}
                  alt={exhibition.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold">
                      {exhibition.title}
                    </h2>
                    <div className="flex gap-1">
                      {exhibition.isCurrent && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                          Current
                        </span>
                      )}
                      {exhibition.isUpcoming && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{exhibition.dateRange}</p>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                    {exhibition.shortDescription}
                  </p>
                  <div className="mt-4">
                    <Link href={`/exhibitions/${exhibition.id}`}>
                      <Button variant="primary" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
