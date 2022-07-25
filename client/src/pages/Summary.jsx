import React from 'react';
import { useState, useEffect } from 'react';

import ExpensesCard from '../components/cards/ExpensesCard';
import IncomeCard from '../components/cards/IncomesCard';
import LineChartD from '../components/charts/LineChartD';
import Footer from '../components/footer/Footer';
import DropDownInput from '../components/inputs/DropDownInput';
import { monthOptions, yearOptions } from '../data/dropDownOptions';
import Navbar from '../components/navbar/Navbar';
import PieChartD from '../components/charts/PieChartD';
import { Link } from 'react-router-dom';
import Records from '../components/records/Records';

const Summary = () => {
  let d = new Date();
  let m = monthOptions[d.getMonth()];

  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(yearOptions[0]);
  const [budget, setBudget] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [sums, setSums] = useState([]);
  const [incomeCategorySums, setIncomeCategorySums] = useState([]);
  const [expenseCategorySums, setExpenseCategorySums] = useState([]);

  let est_id = year.value + '' + month.value;
  // console.log(est_id);

  //Fetching budget data
  const getBudget = async () => {
    try {
      const response = await fetch(`http://localhost:5000/budget/${est_id}`);
      const jsonData = await response.json();
      setBudget(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Fetching sums data
  const getSums = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sumsD/${est_id}`);
      const jsonData = await response.json();
      setSums(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBudget();
    getSums();
    return () => {
      setBudget([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  console.log('sums:>>', sums);

  //Fetch all transactions
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/transactions/${est_id}`
        );
        const jsonData = await response.json();
        setAllTransactions(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getAllTransactions();
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

  //Fetch data for piecharts
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
  //Modify piechart data
  const pieChartData = (array) => {
    let categorySum = array?.map((item) => ({
      name: item.cat_title,
      value: parseFloat(item.cat_sum),
    }));
    return categorySum;
  };

  // console.log('categorySums:>>', chartData(categorySums));

  useEffect(() => {
    getIncomePieChartData();
    getExpensePieChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [est_id]);

  // console.log(transactionsSum(incomesArr));
  // console.log(budget);
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
        <div className="container top bg-light">
          <div className="row d-flex justify-content-between me-4 mb-3">
            <div className="d-flex col justify-content-start mt-2">
              <h5 className="row">Budget Summary</h5>
            </div>
            <div className="d-flex col justify-content-end align-items-center mt-2">
              <i
                className="bi bi-arrow-clockwise fs-4 col-1 me-2 btn text-center"
                onClick={() => window.location.reload()}
              ></i>
              <Records
                transactions={allTransactions}
                sumExpenses={transactionsSum(expensesArr)}
                sumIncomes={transactionsSum(incomesArr)}
              />
              {/* <span
             className="label col-1 ms-2 btn text-decoration-underline text-center"
             onClick={() => window.location.reload()}>Reload</span> */}
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
            </div>
          </div>
          <div className="row d-flex">
            <IncomeCard
              income={budget.est_income}
              sumIncomes={transactionsSum(incomesArr)}
            />
            <ExpensesCard
              expenditure={budget.est_expenditure}
              sumExpenses={transactionsSum(expensesArr)}
            />
            {/* <div className="container body d-flex row mt-3 mb-4 bg-light"> */}
            <div className="row mt-3">
              <div className="col bg-dark p-3 mb-2 rounded-3 ">
                <div className="d-flex row bg-light m-2 rounded-3 p-2">
                  <p className="text-dark">{month.label} Incomes & Expences</p>
                  <LineChartD className="col-12 d-flex " data={sums} />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-between mt-3">
              <div className="col bg-dark me-1 mb-4 rounded-3 ">
                <PieChartD
                  title={`${month.label} Incomes`}
                  data={pieChartData(incomeCategorySums)}
                />
              </div>
              <div className="col bg-dark mb-4 ms-1 rounded-3 ">
                <PieChartD
                  title={`${month.label} Expenses`}
                  data={pieChartData(expenseCategorySums)}
                />
              </div>
              {/* </div>  */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Summary;
