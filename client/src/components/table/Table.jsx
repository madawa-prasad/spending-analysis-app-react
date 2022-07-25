import React from 'react';
import TransactionModal from '../modals/TransactionModal';

import './table.css';

const Table = ({ data, deleteTransaction, options, isIncome }) => {
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
                <th scope="col" className="text-stat">
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
              {data.map((transaction, index) => (
                <tr key={index}>
                  <td className="">
                    {transaction.tr_description.length > 25
                      ? transaction.tr_description.slice(0, 25) + '...'
                      : transaction.tr_description}
                  </td>
                  <td className="text-start">{transaction.cat_title}</td>
                  <td className="text-start">
                    {getMonthDate(transaction.tr_date)}
                  </td>
                  <td className="text-end">{transaction.tr_amount}</td>
                  <td className="text-center">
                    <TransactionModal
                      isEdit={true}
                      transaction={transaction}
                      categories={options}
                      isIncome={isIncome}
                    />
                  </td>
                  <td className="text-center">
                    <i
                      className="bi bi-trash"
                      onClick={() => deleteTransaction(transaction.tr_id)}
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
