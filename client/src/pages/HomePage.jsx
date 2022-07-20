import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/footer/Footer';
import DropDownInput from '../components/inputs/DropDownInput';
import SetBudget from '../components/modals/SetBudget';
import Navbar from '../components/navbar/Navbar';
import Transactions from '../components/transactions/Transactions';
import { monthOptions, yearOptions } from '../data/dropDownOptions';

const HomePage = () => {
  let d = new Date();
  let y = d.getFullYear();
  let m = d.getMonth() + 1;
  let monthName = monthOptions[m - 1];

  const [month, setMonth] = useState(monthName);
  const [year, setYear] = useState(yearOptions[0]);
  const [isIncome, setIsIncome] = useState(true);
  const [budget, setBudget] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  let _id = year.value + '' + month.value;
  console.log(_id);

  //Fetching budget data
  const getBudget = async () => {
    try {
      const response = await fetch(`http://localhost:5000/budget/${_id}`);
      const jsonData = await response.json();
      setBudget(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Fetch all transactions
  const getAllTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/transactions/${_id}`);
      const jsonData = await response.json();
      setAllTransactions(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBudget();
    getAllTransactions();
    return () => {
      setBudget([]);
    };
  }, [isIncome, month, year]);

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

  useEffect(() => {
    console.log('month :>> ', month);
  }, [month]);
  return (
    <>
      <div className="bg-light">
        <Navbar />
        <section className="container top mb-4 bg-light">
          <div className="row d-flex flex-row justify-content-end mb-3 pe-3">
            <DropDownInput
              options={yearOptions}
              className="col-2 me-4 mt-2"
              placeholder="Select Year"
              name="year"
              value={year}
              onChange={setYear}
            />
            <DropDownInput
              options={monthOptions}
              className="col-2 me-4 mt-2"
              placeholder="Select Month"
              name="month"
              value={month}
              onChange={setMonth}
            />
          </div>
          <div className="row">
            <div className="col bg-dark mt-2 mb-2 ms-5 me-3 rounded-3 expected ">
              <div className="d-flex flex-row justify-content-between">
                <span className="title text-white fw-bold">Planned budget</span>
                {/* <i className="bi bi-pencil-square text-white"></i> */}
                <SetBudget />
              </div>
              <div className="d-flex flex-row justify-content-around mb-3">
                <div className="d-flex flex-column text-center">
                  <span className="text-white">INCOME</span>
                  <span className="text-white fs-1 fw-bold">
                    {budget.length === 0 ? 0 : budget.est_income} $
                  </span>
                </div>
                <div className="border-end"></div>
                <div className="d-flex flex-column text-center">
                  <span className="text-white">EXPENDITURE</span>
                  <span className="text-white fs-1 fw-bold">
                    {budget.length === 0 ? 0 : budget.est_expenditure} $
                  </span>
                </div>
              </div>
            </div>

            <div className="col bg-dark mt-2 mb-2 ms-3 me-5 rounded-3 actual">
              <Link to="/summary" className="text-decoration-none">
                <span className="title text-white fw-bold">Actual budget</span>
                <div className="d-flex flex-row justify-content-around mt-2 mb-3">
                  <div className="d-flex flex-column text-center">
                    <span className="text-white">INCOME</span>
                    <span className="text-white fs-1 fw-bold">
                      {transactionsSum(incomesArr)} $
                    </span>
                  </div>
                  <div className="border-end"></div>
                  <div className="d-flex flex-column text-center">
                    <span className="text-white">EXPENDITURE</span>
                    <span className="text-white fs-1 fw-bold">
                      {transactionsSum(expensesArr)} $
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className="container body mb-4 bg-light">
          <div className="row">
            <div className="col bg-dark p-3 mb-2 ms-5 me-5 rounded-3 ">
              <div className="d-flex row bg-light ms-2 me-2 mt-2 mb-4 rounded-3 p-2">
                <ul className="nav nav-pills d-flex justify-content-between">
                  <li className="nav-item col-6" role="presentation">
                    <button
                      className="nav-link col-12 rounded-3 ps-5 pe-5 active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setIsIncome(true)}
                    >
                      INCOMES
                    </button>
                  </li>
                  <li className="nav-item col-6" role="presentation">
                    <button
                      className="nav-link ms-2 col-12 rounded-3 ps-5 pe-5 "
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                      onClick={() => setIsIncome(false)}
                    >
                      EXPENSES
                    </button>
                  </li>
                </ul>
              </div>
              <div className="row bg-light d-flex mt-2 mb-2 ms-2 me-2 rounded-3">
                <Transactions isIncome={isIncome} est_id={_id} />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
