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
import { daysData } from '../../data/mockDays';

//Generating chart data array
const LineChartD = ({ data }) => {
  // console.log('data:>>', data);
  // console.log('day:>>', data[0].tr_date);
  const chartData = (array) => {
    let dailySum = array?.map((value) => ({
      day: parseInt(value.tr_date.slice(8, 10)) + 1,
      Income: value.incomes,
      Expense: value.expenses,
    }));
    return dailySum;
  };

  console.log('ChartData:>>', chartData(data));

  return (
    <ResponsiveContainer width="98%" height={400}>
      <LineChart
        width={1000}
        height={400}
        data={chartData(data)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />

        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Income"
          stroke="#6B89FF"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Expense" stroke="#FF7878" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartD;
