import React from 'react';

import Table from '../table/Table';
import PieChartD from '../charts/PieChartD';
import TransactionModal from '../modals/TransactionModal';
import DropDownInput from '../inputs/DropDownInput';
import { HomeContainer } from '../../containers/homeContainer';

const Transactions = () => {
  const {
    categoryOptions,
    filter,
    color,
    pieChartData,
    isIncome,
    setFilter,
    addUpdateHandle,
  } = HomeContainer.useContainer();

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
                options={categoryOptions}
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
              categories={categoryOptions}
              isIncome={isIncome}
              addUpdateHandle={addUpdateHandle}
            />
          </div>
        </div>
        <div className="row d-flex p-0">
          <Table />
          <PieChartD data={pieChartData} color={color} />
        </div>
      </div>
    </>
  );
};

export default Transactions;
