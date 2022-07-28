import React, { useState, useEffect } from 'react';

import BudgetModal from '../modals/BudgetModal';

const BudgetCard = ({ month, year, est_id, isActual, isIncome }) => {
  const [budget, setBudget] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

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
      const response = await fetch(
        `http://localhost:5000/transactions/${est_id}`
      );
      const jsonData = await response.json();
      setAllTransactions(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className="col bg-white border shadow mt-2 mb-2 ms-5 me-3 rounded-3 expected ">
      <div className="d-flex flex-row justify-content-between">
        <span className="title text-dark fs-5 fw-bold">Planned budget</span>
        {!isActual && (
          <BudgetModal budget={budget} isEdit={budget.length !== 0 && true} />
        )}
      </div>
      <div className="d-flex flex-row justify-content-around mb-3">
        <div className="d-flex flex-column text-center">
          <span className="text-dark">INCOME</span>
          {isActual ? (
            <span className="text-dark fs-1 fw-bold">
              $ {transactionsSum(incomesArr).toFixed(2)}
            </span>
          ) : (
            <span className="text-dark fs-1 fw-bold">
              $ {budget.length === 0 ? 0 : budget.est_income}
            </span>
          )}
        </div>
        <div className="border-end"></div>
        <div className="d-flex flex-column text-center">
          <span className="text-dark">EXPENDITURE</span>
          {isActual ? (
            <span className="text-dark fs-1 fw-bold">
              $ {transactionsSum(expensesArr).toFixed(2)}
            </span>
          ) : (
            <span className="text-dark fs-1 fw-bold">
              $ {budget.length === 0 ? 0 : budget.est_expenditure}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
