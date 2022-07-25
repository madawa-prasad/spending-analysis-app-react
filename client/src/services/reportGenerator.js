import jsPDF from 'jspdf';
import 'jspdf-autotable';

// define a generatePDF function that accepts a records argument
const generatePDF = ({ transactions, sumExpenses, sumIncomes }) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumnI = ['Date', 'Description', 'Category', '$ Amount'];
  const tableColumnE = ['DateE', 'DescriptionE', 'CategoryE', '$ AmountE'];
  // define an empty array of rows
  const tableRowsI = [];
  const tableRowsE = [];

  // for each record pass all its data into an array
  transactions.forEach((transaction) => {
    const date = transaction.tr_date.split('-');
    const transactionData = [
      date[0] + '-' + date[1] + '-' + date[2].slice(0, 2),
      transaction.tr_description.length > 40
        ? transaction.tr_description.slice(0, 40) + '...'
        : transaction.tr_description,
      transaction.cat_title,
      transaction.tr_amount,
      // called date-fns to format the date on the transaction
    ];
    // push each transaction's info into a row
    if (transaction.tr_is_income) {
      tableRowsI.push(transactionData);
    } else tableRowsE.push(transactionData);
  });

  // table title.
  doc.text(
    110,
    15,
    `SPENDING ANALYSIS APP - ${
      transactions[0].tr_date.split('-')[1]
    }'th month incomes.`,
    'center'
  );
  // Table one
  doc.autoTable(tableColumnI, tableRowsI, {
    startY: 20,
    columnStyles: {
      3: { halign: 'right' },
    },
    headStyles: {
      valign: 'middle',
      halign: 'center',
    },
    theme: 'grid',
    showHead: 'firstPage',
  });
  doc.text(
    `Total incomes : $ ${sumIncomes}`,
    195,
    doc.lastAutoTable.finalY + 5,
    null,
    null,
    'right'
  );
  // table title.
  doc.text(
    110,
    doc.autoTable.previous.finalY + 25,
    `SPENDING ANALYSIS APP - ${
      transactions[0].tr_date.split('-')[1]
    }'th month expenses.`,
    'center'
  );
  //Table Two
  doc.autoTable(tableColumnE, tableRowsE, {
    startY: doc.lastAutoTable.finalY + 30,
    columnStyles: {
      3: { halign: 'right' },
    },
    headStyles: {
      valign: 'middle',
      halign: 'center',
    },
    theme: 'grid',
    showHead: 'firstPage',
  });
  doc.text(
    `Total expenses : $ ${sumExpenses}`,
    195,
    doc.lastAutoTable.finalY + 5,
    null,
    null,
    'right'
  );

  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
