import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

import { monthOptions, yearOptions } from '../data/dropDownOptions';
import {
  getBudget,
  getSums,
  getAllTransactions,
} from '../api/summaryPageAPICalls';

const useSummary = () => {
  let d = new Date();
  let m = monthOptions[d.getMonth()];

  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(yearOptions[0]);
  const [budget, setBudget] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [sums, setSums] = useState([]);

  let estId = year.value + '' + month.value;

  useEffect(() => {
    getBudget(estId, setBudget);
    getSums(estId, setSums);
    return () => {
      setBudget([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  //Fetch all transactions
  useEffect(() => {
    getAllTransactions(estId, setAllTransactions);
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

  //Getting summations
  const incomesArr = filteredTransactions(allTransactions, true);
  const expensesArr = filteredTransactions(allTransactions, false);

  const transactionsSum = (transactionsArray) => {
    const sum = transactionsArray.reduce((a, b) => {
      return a + Number(b.tr_amount);
    }, 0);
    return sum;
  };

  const incomesSum = transactionsSum(incomesArr);
  const expensesSum = transactionsSum(expensesArr);

  return {
    d,
    m,
    month,
    year,
    budget,
    allTransactions,
    sums,
    estId,
    incomesArr,
    expensesArr,
    incomesSum,
    expensesSum,
    setMonth,
    setYear,
  };
};
export const SummaryContainer = createContainer(useSummary);
