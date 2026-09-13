'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar' | 'doughnut';
  data: any;
  options?: any;
}

export default function ChartCard({ title, type, data, options }: ChartCardProps) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            family: 'Vazirmatn',
            size: 12,
          },
          rtl: true,
        },
      },
      title: {
        display: false,
      },
    },
    ...options,
  };

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        {type === 'line' && <Line data={data} options={chartOptions} />}
        {type === 'bar' && <Bar data={data} options={chartOptions} />}
        {type === 'doughnut' && <Doughnut data={data} options={chartOptions} />}
      </div>
    </div>
  );
}
