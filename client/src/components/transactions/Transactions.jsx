import React, { useState, useEffect } from 'react';

import Table from '../table/Table';
import PieChartD from '../charts/PieChartD';
import TransactionModal from '../modals/TransactionModal';
import DropDownInput from '../inputs/DropDownInput';
import {
  getCategories,
  getTransactions,
  getPieChartData,
} from '../../api/homePageAPICalls';

const Transactions = ({ isIncome, est_id }) => {
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

  //Fetching All Data
  useEffect(() => {
    getTransactions(est_id, isIncome, setTransactions);
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

  //Fetch data for pieCharts
  //Modify pieChart data
  const chartData = (array) => {
    let categorySum = array?.map((item) => ({
      name: item.cat_title,
      value: parseFloat(item.cat_sum),
    }));
    return categorySum;
  };

  useEffect(() => {
    getPieChartData(est_id, isIncome, setCategorySums);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [est_id, isIncome]);

  //Update table data on adding and editing
  const addUpdateHandle = () => {
    getTransactions(est_id, isIncome, setTransactions);
  };

  return (
    <>
      <div className="row ms-3 d-flex flex-row">
        <div className="row mt-2 d-flex align-items-center p-0">
          <div className="col p-0">
            <div className="d-flex align-items-center justify-content-start">
              <label htmlFor="filter" className="label text-start col-1">
                Filter
              </label>
              <DropDownInput
                options={filterOptions(categories)}
                className="col-5 ms-0"
                placeholder="Select Category"
                name="filter"
                value={filter}
                onChange={setFilter}
              />
              <span
                className="label col-3 btn text-decoration-underline text-primary text-center"
                onClick={() => setFilter('')}
              >
                Clear Filter
              </span>
            </div>
          </div>
          <div className="col text-white text-end p-0">
            <TransactionModal
              categories={filterOptions(categories)}
              isIncome={isIncome}
              setTransactions={addUpdateHandle}
            />
          </div>
        </div>
        <div className="row p-0">
          <div className="col-7 p-0">
            <Table
              data={filter ? filteredData(transactions) : transactions}
              // deleteTransaction={handleDelete()}
              options={filterOptions(categories)}
              isIncome={isIncome}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </div>
          <div className="col-5 mt-2 mb-3 p-0 border bg-white shadow-sm rounded-3">
            <div className="mt-5">
              <PieChartD data={chartData(categorySums)} color={color} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
