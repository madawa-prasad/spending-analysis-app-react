import React from 'react';
import ProgressBarD from '../progressbar/ProgressBarD';

const ExpensesCard = ({ expenditure, sumExpenses }) => {
  const percentage = ((sumExpenses / expenditure) * 100).toFixed(2);
  const difference = expenditure - sumExpenses;

  return (
    <>
      <div className="col bg-dark mt-2 mb-2 ms-0 me-4 rounded-3 actual">
        <span className="title text-white fw-bold">EXPENSES</span>
        <div className="d-flex flex-row justify-content-start mt-2 mb-3">
          <div className="d-flex w-100 flex-column">
            <span className="text-white fs-1 fw-bold row ms-1">
              {sumExpenses ? sumExpenses : 0} $
            </span>
            <div className="progressBar d-flex align-items-center ms-1">
              <div className="col-10">
                <ProgressBarD
                  variant={sumExpenses < expenditure ? 'warning' : 'danger'}
                  now={isNaN(percentage) ? 0 : percentage}
                />
              </div>
              <span className="est-expenditure text-white ms-2 fs-5 col-2">
                {expenditure ? expenditure : 0} $
              </span>
            </div>
            <span
              className={`col-4 me-0 fs-2 text-${
                difference > 0 ? 'warning' : 'danger'
              }`}
            >
              {difference > 0 ? `+${difference}` : difference} $
            </span>
            <span className="text-white fs-6 fw-bold row ms-1 mt-2">
              {difference > 0 || !difference
                ? 'Keep going...'
                : 'Ooops ! You exceed the value 💔'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesCard;
