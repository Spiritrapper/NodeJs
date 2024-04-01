import React from 'react';

interface BarChartProps {
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div>
      <h2>Bar Chart</h2>
      {data.map((value, index) => (
        <div key={index} style={{ height: `${value}px`, backgroundColor: 'blue', marginBottom: '5px' }}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default BarChart;