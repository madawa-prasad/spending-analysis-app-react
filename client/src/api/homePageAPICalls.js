//Fetching budget data
const getBudget = async (est_id, setBudget) => {
  try {
    const response = await fetch(`http://localhost:5000/budget/${est_id}`);
    const jsonData = await response.json();
    setBudget(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

//Fetch all transactions
const getAllTransactions = async (est_id, setAllTransactions) => {
  try {
    const response = await fetch(
      `http://localhost:5000/transactions/${est_id}`
    );
    const jsonData = await response.json();
    setAllTransactions(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

//Fetching Categories
const getCategories = async (isIncome, setCategories) => {
  try {
    const response = await fetch(
      `http://localhost:5000/categories/${isIncome}`
    );
    const jsonData = await response.json();
    setCategories(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

//Fetching All Data
const getTransactions = async (est_id, isIncome, setTransactions) => {
  try {
    const response = await fetch(
      `http://localhost:5000/${isIncome ? 'incomes' : 'expenses'}/${est_id}`
    );
    const jsonData = await response.json();
    setTransactions(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

//Fetch data for pieCharts
const getPieChartData = async (est_id, isIncome, setCategorySums) => {
  try {
    const response = await fetch(
      `http://localhost:5000/sumsC/${est_id}/${isIncome}`
    );
    const jsonData = await response.json();
    setCategorySums(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

//Editing existing transaction
const handleEdit = async (
  values,
  category,
  transaction,
  setShow,
  setTransactions
) => {
  try {
    const body = {
      tr_description: values.tr_description,
      tr_category: category.value,
      tr_amount: values.tr_amount,
      tr_date: values.tr_date,
    };
    // eslint-disable-next-line
    const response = await fetch(
      `http://localhost:5000/transactions/${transaction.tr_id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    setShow(false);
    window.location.reload();
  } catch (err) {
    console.error(err.message);
    setShow(false);
  }
};

//Handle adding new Submit
const handleNewTransaction = async (
  values,
  category,
  setShow,
  setTransactions,
  isIncome
) => {
  try {
    const body = {
      tr_description: values.tr_description,
      tr_category: category.value,
      tr_amount: values.tr_amount,
      tr_date: values.tr_date,
    };
    // eslint-disable-next-line
    const response = await fetch(
      `http://localhost:5000/${isIncome ? 'incomes' : 'expenses'}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        console.log(data);
      });

    setShow(false);

    // Promise.all([response.json()]).then((object) =>
    //   console.log(object[0]['0'])
    // );
    // console.log('response:>>', response.json());
    // setTransactions();
  } catch (err) {
    console.error(err.message);
    setShow(false);
  }
};

//Delete specific record
const handleDelete = async (id, transactions, setTransactions) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const deleteTransaction = await fetch(
      `http://localhost:5000/transactions/${id}`,
      {
        method: 'DELETE',
      }
    );
    setTransactions(
      transactions.filter((transaction) => transaction.tr_id !== id)
    );
  } catch (err) {
    console.error(err.message);
  }
};

export {
  getAllTransactions,
  getBudget,
  getCategories,
  getTransactions,
  getPieChartData,
  handleEdit,
  handleNewTransaction,
  handleDelete,
};
