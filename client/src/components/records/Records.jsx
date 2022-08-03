import React from 'react';

import generatePDF from '../../services/reportGenerator';
import { SummaryContainer } from '../../containers/summaryContainer';

const Records = () => {
  let { allTransactions, incomesSum, expensesSum } =
    SummaryContainer.useContainer();

  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          <button
            class="btn btn-primary"
            onClick={() =>
              generatePDF({ allTransactions, incomesSum, expensesSum })
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
