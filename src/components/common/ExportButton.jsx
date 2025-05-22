import React from "react";

function convertToCSV(labels, data, labelName) {
  let csv = `${labelName},Value\n`;
  labels.forEach((label, i) => {
    csv += `${label},${data[i]}\n`;
  });
  return csv;
}

export default function ExportButton({ barData, pieData }) {
  const handleExport = () => {
    const barCSV = convertToCSV(barData.labels, barData.data, "Month");
    const pieCSV = convertToCSV(pieData.labels, pieData.data, "User Type");
    const blob = new Blob(
      ["Bar Chart Data\n", barCSV, "\nPie Chart Data\n", pieCSV],
      { type: "text/csv" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Download CSV
    </button>
  );
}
