import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from '../table/Table';
import PieChartD from '../charts/PieChartD';
import TransactionModal from '../modals/TransactionModal';

const Transactions = () => {
  return (
    <>
      <div className="row ms-3 d-flex flex-row">
        <div className="col-5 m-4 ms-0 d-flex justify-content-center">
          <TransactionModal />
        </div>
        <div className="col-6  d-flex justify-content-end">
          <div className="row d-flex align-items-center">
            <label htmlFor="a" className="label m-1 col">
              Filter Category
            </label>
            <Dropdown className="col">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/action-1">Foods</Dropdown.Item>
                <Dropdown.Item href="/action-2">Bills</Dropdown.Item>
                <Dropdown.Item href="/action-3">Fuel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          <div className="col-5 p-0">
            <PieChartD />
          </div>
          <div className="col-7 p-0">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
