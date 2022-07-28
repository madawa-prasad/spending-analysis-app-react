import React, { useState, useEffect } from 'react';
import PieChartD from '../charts/PieChartD';

import ProgressBarD from '../progressbar/ProgressBarD';

const SummaryCard = ({ value, sum, isIncome, est_id }) => {
  const percentage = ((sum / value) * 100).toFixed(2);
  const difference = sum - value;

  const [incomeCategorySums, setIncomeCategorySums] = useState([]);
  const [expenseCategorySums, setExpenseCategorySums] = useState([]);

  //Fetch data for pieCharts
  //Incomes
  const getIncomePieChartData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/sumsC/${est_id}/true`
      );
      const jsonData = await response.json();
      setIncomeCategorySums(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Expenses
  const getExpensePieChartData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/sumsC/${est_id}/false`
      );
      const jsonData = await response.json();
      setExpenseCategorySums(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  //Modify pieChart data
  const pieChartData = (array) => {
    let categorySum = array?.map((item) => ({
      name: item.cat_title,
      value: parseFloat(item.cat_sum),
    }));
    return categorySum;
  };

  useEffect(() => {
    getIncomePieChartData();
    getExpensePieChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [est_id]);

  const color = isIncome ? '#6B89FF' : '#FF7878';

  return (
    <>
      <div className="col bg-white border shadow mt-2 mb-2 ms-0 me-4 rounded-3 actual">
        <div className="d-flex justify-content-between">
          <span className="title fs-4 text-Dark fw-bold">
            {isIncome ? 'INCOMES' : 'EXPENSES'}
          </span>
          {isIncome ? (
            <span className="text-Dark fs-6 fw-bold ms-1 mt-2">
              {difference > 0
                ? 'Great ! You reached the target 😇'
                : 'Keep going...'}
            </span>
          ) : (
            <span className="text-dark fs-6 fw-bold ms-1 mt-2">
              {difference > 0
                ? 'Ooops ! You exceed the limit 💔'
                : 'Reaching the limit...'}
            </span>
          )}
        </div>
        <div className="d-flex flex-row justify-content-start mt-2 mb-3">
          <div className="d-flex w-100 flex-column">
            <span className="text-secondary mt-2 fs-6 fw-bold ms-1 position-absolute">
              Actual Value
            </span>

            <span className="text-Dark fs-1 fw-bold ms-1 mt-4">
              $ {sum ? sum : 0}
            </span>
            <div className="progressBar d-flex align-items-center ms-1">
              <div className="col-10 mt-0">
                {isIncome ? (
                  <ProgressBarD
                    variant={sum < value ? 'danger' : 'success'}
                    now={isNaN(percentage) ? 0 : percentage}
                  />
                ) : (
                  <ProgressBarD
                    variant={sum < value ? 'success' : 'danger'}
                    now={isNaN(percentage) ? 0 : percentage}
                  />
                )}
              </div>
              <div className="col mb-0">
                <span className="est-value text-Dark ms-3 row">
                  {isIncome ? 'Target' : 'Limit'}
                </span>
                <span className="est-value text-Dark ms-3 mb-4 fs-5 row">
                  $ {value ? value : 0}
                </span>
              </div>
            </div>
            {isIncome ? (
              <div>
                <span
                  className={`col fs-5 text-${
                    difference > 0 ? 'success' : 'danger'
                  } text-start`}
                >
                  {difference > 0 ? '$ +' + difference + '' : '$ ' + difference}
                </span>

                <span className="text-secondary col p-1">
                  {difference > 0
                    ? ' greater than the target amount'
                    : ' less than the target amount'}
                </span>
              </div>
            ) : (
              <div>
                <span
                  className={`col-4 me-0 fs-5 text-${
                    difference < 0 ? 'success' : 'danger'
                  }`}
                >
                  {difference < 0 ? '$ ' + difference : '$ +' + difference}
                </span>
                <span className="text-secondary col p-1">
                  {difference > 0
                    ? ' greater than the limit'
                    : ' less than the limit'}
                </span>
              </div>
            )}
            <hr className="text-secondary" />
            <div className="container rounded-3 border">
              {isIncome ? (
                <PieChartD
                  data={pieChartData(incomeCategorySums)}
                  color={color}
                  title="Incomes based on categories."
                />
              ) : (
                <PieChartD
                  data={pieChartData(expenseCategorySums)}
                  color={color}
                  title="Expenses based on categories."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
