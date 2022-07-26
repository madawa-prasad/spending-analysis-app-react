import React from 'react';

import generatePDF from '../../services/reportGenerator';

const Records = (transactions) => {
  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          <button
            class="btn btn-primary"
            onClick={() => generatePDF(transactions)}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Records;
