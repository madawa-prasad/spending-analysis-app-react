import React from 'react';
import ProgressBarD from '../progressbar/ProgressBarD';

const ExpensesCard = () => {
  return (
    <>
      <div className="col bg-dark mt-2 mb-2 ms-3 me-5 rounded-3 actual">
        <span className="title text-white fw-bold">EXPENSES</span>
        <div className="d-flex flex-row justify-content-startmt-2 mb-3">
          <div className="d-flex w-100 flex-column">
            <span className="text-white fs-1 fw-bold row ms-1">350 $</span>
            <div className="progressBar d-flex align-items-center ms-1">
              <div className="col-11">
                <ProgressBarD variant="danger" now={110} />
              </div>
              <span className="est-income text-white ms-2 col-1">750 $</span>
            </div>
            <span className="col-3 me-0 fs-2 text-danger">+350 $</span>
            <span className="text-white fs-6 fw-bold row ms-1 mt-2">
              Ooops ! You reached the goal 💔
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesCard;
