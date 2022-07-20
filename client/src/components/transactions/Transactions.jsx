import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from '../table/Table';
import PieChartD from '../charts/PieChartD';
import TransactionModal from '../modals/TransactionModal';

const Transactions = ({ isIncome }) => {
  const [transactions, setTransactions] = useState([]);

  //Fetching All Data
  const getTransactions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/${isIncome ? 'incomes' : 'expenses'}`
      );
      const jsonData = await response.json();
      setTransactions(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Delete specific record
  const handleDelete = async (id) => {
    try {
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

  useEffect(() => {
    getTransactions();
  }, [isIncome]);

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
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          <div className="col-5 p-0">
            <PieChartD />
          </div>
          <div className="col-7 p-0">
            <Table data={transactions} deleteTransaction={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
