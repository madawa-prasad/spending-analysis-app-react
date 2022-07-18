import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartData } from '../../data/mockChart';

const LineChartD = () => {
  return (
    <ResponsiveContainer width="98%" height={400}>
      <LineChart
        width={1000}
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
          stroke="#6B89FF"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="EXPENSE" stroke="#FF7878" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartD;
