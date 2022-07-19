import React from 'react';
import TransactionModal from '../modals/TransactionModal';

import './table.css';

const Table = ({ data, deleteRec }) => {
  //Recording month and date in table
  const getMonthDate = (d) => {
    var date = new Date(d);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return month + '/' + day;
  };

  return (
    <div className="container">
      <div className="bg-white d-flex shadow mt-2 mb-2 p-1 rounded-3">
        <div className="table table-wrapper overflow-auto ">
          <table className="table table-responsive">
            <thead className="sticky">
              <tr>
                <th scope="col" className="">
                  Description
                </th>
                <th scope="col" className="text-center">
                  Category
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Edit
                </th>
                <th scope="col" className="text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((income, index) => (
                <tr key={index}>
                  <td className="">{income.inc_description}</td>
                  <td className="text-center">{income.inc_category}</td>
                  <td className="text-center">
                    {getMonthDate(income.inc_date)}
                  </td>
                  <td className="text-center">{income.inc_amount}</td>
                  <td className="text-center">
                    <TransactionModal edit={true} />
                  </td>
                  <td className="text-center">
                    <i
                      className="bi bi-trash"
                      onClick={() => deleteRec(income.inc_id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
