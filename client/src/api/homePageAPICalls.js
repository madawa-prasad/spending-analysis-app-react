import axios from 'axios';

//Fetching budget data
const getBudget = async (est_id, setBudget) => {
  try {
    const response = await axios.get(`http://localhost:5000/budget/${est_id}`);
    const { data } = response;
    setBudget(data);
  } catch (err) {
    console.error(err.message);
  }
};

//Fetch all transactions
const getAllTransactions = async (est_id, setAllTransactions) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/transactions/${est_id}`
    );
    const { data } = response;
    setAllTransactions(data);
  } catch (err) {
    console.error(err.message);
  }
};

//Fetching Categories
const getCategories = async (isIncome, setCategories) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/categories/${isIncome}`
    );
    const { data } = response;
    setCategories(data);
  } catch (err) {
    console.error(err.message);
  }
};

//Fetching incomes or expenses
const getTransactions = async (est_id, isIncome, setTransactions) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/${isIncome ? 'incomes' : 'expenses'}/${est_id}`
    );
    const { data } = response;
    setTransactions(data);
  } catch (err) {
    console.error(err.message);
  }
};

//Fetch data for pieCharts
const getPieChartData = async (est_id, isIncome, setCategorySums) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/sumsC/${est_id}/${isIncome}`
    );
    const { data } = response;
    setCategorySums(data);
  } catch (err) {
    console.error(err.message);
  }
};

//Editing existing transaction
const handleEdit = async (values, category, transaction, setShow) => {
  try {
    const body = {
      tr_description: values.tr_description,
      tr_category: category.value,
      tr_amount: values.tr_amount,
      tr_date: values.tr_date,
    };
    // eslint-disable-next-line
    await axios.put(
      `http://localhost:5000/transactions/${transaction.tr_id}`,
      body
    );
    setShow(false);
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
    await axios
      .post(`http://localhost:5000/${isIncome ? 'incomes' : 'expenses'}`, body)
      .then(({ data }) => {
        setTransactions(data);
      });
    setShow(false);
  } catch (err) {
    console.error(err.message);
    setShow(false);
  }
};

//Delete specific record
const handleDelete = async (id, transactions, setTransactions) => {
  try {
    // eslint-disable-next-line no-unused-vars
    await axios.delete(`http://localhost:5000/transactions/${id}`);
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
