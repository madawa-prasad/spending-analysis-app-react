import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { daysData } from '../../data/mockDays';

//Generating chart data array
const LineChartD = ({ data }) => {
  //Refactoring data for line chart
  let dailySum = data?.map((value) => ({
    day: parseInt(value.tr_date.slice(8, 10)) + 1,
    income: value.incomes,
    expense: value.expenses,
  }));

  // console.log('DD:>>', dailySum);

  //Finalizing data for line chart
  const dayByDayArray = daysData.map((d) => {
    const y = dailySum.find((s) => s.day === parseInt(d.day));
    return y;
  });

  let dailySums = dayByDayArray.map((d, i) => ({
    day: d ? d.day : i + 1,
    income: d ? d.income : 0,
    expense: d ? d.expense : 0,
  }));

  // console.log('RFD:>>', dailySums);

  // const joined = messages.map((m, ix) => {
  //   return [m[0], users[ix]];
  // });

  // console.log('ChartDataE:>>', chartData(data)[2]);
  // console.log('gdata:>>', dailySums);

  return (
    <ResponsiveContainer width="98%" height={400}>
      <LineChart
        width={1000}
        height={400}
        data={dailySums}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />

        <YAxis type="number" domain={[0, 'dataMax + 100']} />

        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#6B89FF"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="expense" stroke="#FF7878" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartD;
