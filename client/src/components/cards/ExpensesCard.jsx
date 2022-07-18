import React from 'react';

const ExpensesCard = () => {
  return (
    <>
      <div className="col bg-dark mt-2 mb-2 ms-3 me-5 rounded-3 expenses">
        <span className="title text-white fw-bold">EXPENSES</span>
        <div className="d-flex flex-row justify-content-around mt-2 mb-3">
          <div className="d-flex flex-column text-center">
            <span className="text-white">INCOME</span>
            <span className="text-white fs-1 fw-bold">350 $</span>
          </div>
          <div className="border-end"></div>
          <div className="d-flex flex-column text-center">
            <span className="text-white">EXPENDITURE</span>
            <span className="text-white fs-1 fw-bold">350 $</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesCard;
