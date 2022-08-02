import React from 'react';

import generatePDF from '../../services/reportGenerator';
import { SummaryContainer } from '../../containers/summaryStore';

const Records = () => {
  let pdf = SummaryContainer.useContainer();
  const transactions = pdf.allTransactions;
  const sumIncomes = pdf.transactionsSum(pdf.incomesArr);
  const sumExpenses = pdf.transactionsSum(pdf.expensesArr);

  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          <button
            class="btn btn-primary"
            onClick={() =>
              generatePDF({ transactions, sumIncomes, sumExpenses })
            }
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Records;
