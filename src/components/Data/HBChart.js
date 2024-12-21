import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title } from 'chart.js';

// Chart.js 등록
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

function HeartbeatChart() {
  const heartbeatData = {
    labels: Array.from({ length: 50 }, (_, i) => i + 1), // X축: 시간
    datasets: [
      {
        label: '심박수',
        data: [0, 10, 15, 5, 20, 30, 10, 5, 15, 0, 10, 15, 5, 20, 30, 10, 5, 15, 0],
        borderColor: 'red',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 숨김
      },
    },
    scales: {
      x: {
        display: false, // X축 숨김
      },
      y: {
        min: 0,
        max: 50, // Y축 값 범위
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return <Line data={heartbeatData} options={options} />;
}

export default HeartbeatChart;
