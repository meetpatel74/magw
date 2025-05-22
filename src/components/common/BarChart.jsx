import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ labels, data }) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Records",
            data,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Monthly Records" },
        },
      }}
    />
  );
}
