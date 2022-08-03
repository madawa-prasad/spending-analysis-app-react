import React, { useState, useEffect } from 'react';

import BudgetModal from '../modals/BudgetModal';
import { getBudget, getAllTransactions } from '../../api/homePageAPICalls';
import { HomeContainer } from '../../containers/homeContainer';

const BudgetCard = ({ isActual }) => {
  const { year, month, estId, isIncome } = HomeContainer.useContainer();

  const [budget, setBudget] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  //Fetch budget
  useEffect(() => {
    getBudget(estId, setBudget);
    return () => {
      setBudget([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  //Fetch all transactions
  useEffect(() => {
    getAllTransactions(estId, setAllTransactions);
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
          <BudgetModal
            budget={budget}
            isEdit={budget.length !== 0 && true}
            setBudget={setBudget}
          />
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
