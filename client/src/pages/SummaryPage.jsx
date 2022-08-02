import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LineChartD from '../components/charts/LineChartD';
import Footer from '../components/footer/Footer';
import DropDownInput from '../components/inputs/DropDownInput';
import { monthOptions, yearOptions } from '../data/dropDownOptions';
import Navbar from '../components/navbar/Navbar';
import Records from '../components/records/Records';
import SummaryCard from '../components/cards/SummaryCard';
import {
  getBudget,
  getSums,
  getAllTransactions,
} from '../api/summaryPageAPICalls';

const SummaryPage = () => {
  let d = new Date();
  let m = monthOptions[d.getMonth()];

  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(yearOptions[0]);
  const [budget, setBudget] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [sums, setSums] = useState([]);

  let est_id = year.value + '' + month.value;

  useEffect(() => {
    getBudget(est_id, setBudget);
    getSums(est_id, setSums);
    return () => {
      setBudget([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  //Fetch all transactions
  useEffect(() => {
    getAllTransactions(est_id, setAllTransactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  //Getting SUM incomes//
  //Filtering incomes and expenses
  const filteredTransactions = (arr, isIncome) => {
    const filteredTransactions = arr.filter((transaction) => {
      return transaction.tr_is_income === isIncome;
    });
    return filteredTransactions;
  };

  const incomesArr = filteredTransactions(allTransactions, true);
  const expensesArr = filteredTransactions(allTransactions, false);

  const transactionsSum = (transactionsArray) => {
    const sum = transactionsArray.reduce((a, b) => {
      return a + Number(b.tr_amount);
    }, 0);
    return sum;
  };

  return (
    <>
      <div className="bg-light">
        <Navbar />
        <Link
          to="/"
          className="row d-inline-flex align-items-center text-decoration-none"
        >
          <i className="bi bi-arrow-left-circle col-1 ms-5 text-dark"></i>
          <span className="col m-0">Back to home</span>
        </Link>
        <div className="container bg-light">
          <div className="d-flex col ms-3 justify-content-start mt-2">
            <h5 className="row fs-4">Budget Summary{` of ${month.label}`}</h5>
          </div>
          <div className="row d-flex justify-content-between mb-0">
            <div className="d-flex col-6 ms-1 justify-content-start align-items-center">
              <DropDownInput
                options={yearOptions}
                className="col-4 mt-2"
                placeholder="Select Year"
                name="year"
                value={year}
                onChange={setYear}
              />
              <DropDownInput
                options={monthOptions}
                className="col-4 ms-3 mt-2"
                placeholder="Select Month"
                name="month"
                value={month}
                defaultValue={m}
                onChange={setMonth}
              />
              <i
                className="bi bi-arrow-clockwise fs-4 col-1 btn text-center"
                onClick={() => window.location.reload()}
              ></i>
            </div>
            <div className="col-2 d-flex me-2 justify-content-end">
              <Records
                transactions={allTransactions}
                sumExpenses={transactionsSum(expensesArr)}
                sumIncomes={transactionsSum(incomesArr)}
              />
            </div>
          </div>
          <div className="row ms-1 d-flex">
            <SummaryCard
              value={budget.est_income}
              sum={transactionsSum(incomesArr)}
              isIncome={true}
              est_id={est_id}
            />
            <SummaryCard
              value={budget.est_expenditure}
              sum={transactionsSum(expensesArr)}
              isIncome={false}
              est_id={est_id}
            />
            <div className="row mt-3">
              <div className="col bg-white shadow border p-3 mb-2 rounded-3 ">
                <div className="d-flex row bg-white rounded-3 p-2">
                  <p className="text-dark">{month.label} Incomes & Expenses</p>
                  <LineChartD className="col-12 d-flex " data={sums} />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-between mt-3"></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SummaryPage;
