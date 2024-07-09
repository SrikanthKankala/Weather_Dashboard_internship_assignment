// // C:\Users\kanka\OneDrive\Desktop\Smart-frontend-internship\weather-dashboard\src\components\TemperatureChart.js





//C:\Users\kanka\OneDrive\Desktop\Smart-frontend-internship\weather-dashboard\src\components\TemperatureChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureChart = ({ forecastData }) => {
  const chartData = {
    labels: forecastData.map((item) => item.label),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecastData.map((item) => item.temperature),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  return <Line data={chartData} />;
};

export default TemperatureChart;

