import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { chartData } from '../../data/mockChart';

const LineChartD = () => {
  return (
    <LineChart
      width={1200}
      height={400}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />

      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="INCOME"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="EXPENSE" stroke="#82ca9d" />
    </LineChart>
  );
};

export default LineChartD;
