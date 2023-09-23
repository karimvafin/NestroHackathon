import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import './DoughnutChart.css';

const DoughnutChart = ({ value, color }) => {
  const data = [{ value: value, color: color }];

  return (
    <div className="doughnut-container">
      <PieChart
        data={data}
        lineWidth={25} 
        radius={40} 
        rounded
        startAngle={-90}
        totalValue={10}
        segmentsShift={(index) => (index === 0 ? 4 : 0)}
      />
      <div className="chart-label">
        <span>{value}/10</span>
      </div>
    </div>
  );
};

export default DoughnutChart;
