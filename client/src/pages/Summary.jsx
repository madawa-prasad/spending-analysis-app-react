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

const Summary = () => {
  let d = new Date();
  let m = monthOptions[d.getMonth()];

  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(yearOptions[0]);
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

  useEffect(() => {
    getBudget();
    return () => {
      setBudget([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

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

  console.log(transactionsSum(incomesArr));
  console.log(budget);
  return (
    <>
      <div className="bg-light">
        <Navbar />
        <div className="container top mb-4 bg-light">
          <div className="row d-flex justify-content-between mb-3 pe-3">
            <h5 className="col mt-2">Budget Summary</h5>
            <i
              class="bi bi-arrow-clockwise label col-1 ms-2 btn text-decoration-underline text-center"
              onClick={() => window.location.reload()}
            ></i>
            {/* <span
            className="label col-1 ms-2 btn text-decoration-underline text-center"
            onClick={() => window.location.reload()}
          >
            Reload
          </span> */}
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
              defaultValue={m}
              onChange={setMonth}
            />
          </div>
          <div className="row">
            <IncomeCard
              income={budget.est_income}
              sumIncomes={transactionsSum(incomesArr)}
            />
            <ExpensesCard
              expenditure={budget.est_expenditure}
              sumExpenses={transactionsSum(expensesArr)}
            />
            <div className="container body mt-3 mb-4 bg-light">
              <div className="row">
                <div className="col bg-dark p-3 mb-2 ms-3 me-5 rounded-3 ">
                  <div className="d-flex row bg-light ms-2 me-2 mt-2 mb-4 rounded-3 p-2">
                    <p className="text-dark">
                      {month.label} Incomes & Expences
                    </p>
                    <LineChartD
                      className="col-12 d-flex "
                      data={allTransactions}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row w-100 mt-3 p-0">
                  <div className="col bg-dark p-3 mb-2 ms-3 me-4 rounded-3 ">
                    <PieChartD title={`${month.label} Incomes`} />
                  </div>
                  <div className="col bg-dark p-3 mb-2 ms-1 me-5 rounded-3 ">
                    <PieChartD title={`${month.label} Expenses`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Summary;
