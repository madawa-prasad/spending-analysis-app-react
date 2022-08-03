import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

import { monthOptions, yearOptions } from '../data/dropDownOptions';
import {
  getTransactions,
  getCategories,
  getPieChartData,
} from '../api/homePageAPICalls';

const useHome = () => {
  ////For home page
  let d = new Date();
  let m = d.getMonth() + 1;
  let monthName = monthOptions[m - 1];

  const [month, setMonth] = useState(monthName);
  const [year, setYear] = useState(yearOptions[0]);
  const [isIncome, setIsIncome] = useState(true);

  let estId = year.value + '' + month.value;

  ////For transactions component
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [categorySums, setCategorySums] = useState([]);

  const color = isIncome ? '#6B89FF' : '#6B89FF';

  useEffect(() => {
    getCategories(isIncome, setCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIncome]);

  const filterOptions = (array) => {
    let options = array?.map((value) => ({
      value: value.cat_id,
      label: value.cat_title,
    }));
    return options;
  };

  const categoryOptions = filterOptions(categories);

  //Fetching All Data
  useEffect(() => {
    getTransactions(estId, isIncome, setTransactions);
    setFilter(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIncome, estId]);

  ///Data for Table
  //Sorting function
  const sortByDate = (arr) =>
    arr.sort(function (a, b) {
      return new Date(a.tr_date) - new Date(b.tr_date);
    });

  //Filtering function for records table
  const filteredData = (transactionsData) => {
    if (filter) {
      let filteredData = transactionsData.filter(
        (transaction) => transaction.tr_category === filter.value
      );
      return sortByDate(filteredData);
    } else {
      return sortByDate(transactionsData);
    }
  };

  const tableData = filteredData(transactions);

  ///Fetch data for pieCharts
  useEffect(() => {
    getPieChartData(estId, isIncome, setCategorySums);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estId, isIncome]);

  //Modify pieChart data
  const chartData = (array) => {
    let categorySum = array?.map((item) => ({
      name: item.cat_title,
      value: parseFloat(item.cat_sum),
    }));
    return categorySum;
  };
  const pieChartData = chartData(categorySums);

  //Update table data on adding and editing
  const addUpdateHandle = (newData) => {
    setTransactions((prevState) => [...prevState, newData]);
  };

  return {
    year,
    month,
    estId,
    isIncome,
    setIsIncome,
    setMonth,
    setYear,
    //transactions component
    transactions,
    categories,
    categoryOptions,
    filter,
    color,
    tableData,
    pieChartData,
    addUpdateHandle,
    setTransactions,
    setFilter,
  };
};
export const HomeContainer = createContainer(useHome);
