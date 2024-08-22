import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

interface LineChartProps {
  type: boolean
}

const LineChart: React.FC<LineChartProps> = ({type}) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: type ? [0, 10, 7, 5, 1, 12, 15]: [15, 10, 9, 12, 11, 8, 7],
        fill: false,
        borderColor: type ? 'rgba(11, 186, 116, 1)': 'rgba(252, 20, 20, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false, 
      },
    },
    scales: {
      x: {
        display: false, 
        grid: {
          display: false, 
        },
      },
      y: {
        display: false, 
        grid: {
          display: false, 
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
