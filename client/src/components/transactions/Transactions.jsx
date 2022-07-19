import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from '../table/Table';
import PieChartD from '../charts/PieChartD';
import TransactionModal from '../modals/TransactionModal';

const Transactions = ({ trType }) => {
  const [incomes, setIncomes] = useState([]);

  console.log(trType);

  //Fetching All Data
  const getIncomes = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/${trType ? 'incomes' : 'expenses'}`
      );
      const jsonData = await response.json();
      setIncomes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Delete specific record
  const handleDelete = async (id) => {
    try {
      const delIncome = await fetch(`http://localhost:5000/incomes/${id}`, {
        method: 'DELETE',
      });
      setIncomes(incomes.filter((income) => income.inc_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getIncomes();
  }, []);

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
            <Table data={incomes} deleteRec={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
