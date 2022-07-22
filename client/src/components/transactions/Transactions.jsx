import React, { useState, useEffect } from 'react';

import Table from '../table/Table';
import PieChartD from '../charts/PieChartD';
import TransactionModal from '../modals/TransactionModal';
import DropDownInput from '../inputs/DropDownInput';

const Transactions = ({ isIncome, est_id }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [categorySums, setCategorySums] = useState([]);

  //Fetching Categories
  const getCategories = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/categories/${isIncome}`
      );
      const jsonData = await response.json();
      setCategories(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  // console.log(categories);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIncome]);

  const filterOptions = (array) => {
    let options = array?.map((value) => ({
      value: value.cat_id,
      label: value.cat_title,
    }));
    return options;
  };

  //Fetching All Data
  const getTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/${isIncome ? 'incomes' : 'expenses'}/${est_id}`
      );
      const jsonData = await response.json();
      setTransactions(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTransactions();
    setFilter(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIncome, est_id]);

  //Filtered data based on category
  const filteredData = (transactionsData) => {
    let tableData;
    if (filter) {
      tableData = transactionsData.filter(
        (transaction) => transaction.tr_category === filter.value
      );
      return tableData;
    }
  };

  //Delete specific record
  const handleDelete = async (id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const deleteTransaction = await fetch(
        `http://localhost:5000/transactions/${id}`,
        {
          method: 'DELETE',
        }
      );
      setTransactions(
        transactions.filter((transaction) => transaction.tr_id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  //Fetch data for piecharts
  const getPieChartData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/sumsC/${est_id}/${isIncome}`
      );
      const jsonData = await response.json();
      setCategorySums(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Modify piechart data
  const chartData = (array) => {
    let categorySum = array?.map((item) => ({
      name: item.cat_title,
      value: parseFloat(item.cat_sum),
    }));
    return categorySum;
  };

  // console.log('categorySums:>>', chartData(categorySums));

  useEffect(() => {
    getPieChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [est_id, isIncome]);

  return (
    <>
      <div className="row ms-3 d-flex flex-row">
        <div className="col-5 m-4 ms-0 d-flex justify-content-center">
          <TransactionModal
            categories={filterOptions(categories)}
            isIncome={isIncome}
          />
        </div>
        <div className="col-6  d-flex justify-content-end">
          <div className="col d-flex align-items-center justify-content-end">
            <label htmlFor="filter" className="label col-3">
              Category
            </label>
            <DropDownInput
              options={filterOptions(categories)}
              className="col-6"
              placeholder="Select Category"
              name="filter"
              value={filter}
              onChange={setFilter}
            />
            <span
              className="label col-1 ms-2 btn text-decoration-underline text-center"
              onClick={() => setFilter('')}
            >
              Clear Filter
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-5 p-0">
            <PieChartD data={chartData(categorySums)} />
          </div>
          <div className="col-7 p-0">
            <Table
              data={filter ? filteredData(transactions) : transactions}
              deleteTransaction={handleDelete}
              options={filterOptions(categories)}
              isIncome={isIncome}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
