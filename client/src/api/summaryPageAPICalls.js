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

//Fetching sums data
const getSums = async (est_id, setSums) => {
  try {
    const response = await fetch(`http://localhost:5000/sumsD/${est_id}`);
    const jsonData = await response.json();
    setSums(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

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

//Fetch data for pieCharts
//Incomes
const getIncomePieChartData = async (est_id, setIncomeCategorySums) => {
  try {
    const response = await fetch(`http://localhost:5000/sumsC/${est_id}/true`);
    const jsonData = await response.json();
    setIncomeCategorySums(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

//Expenses
const getExpensePieChartData = async (est_id, setExpenseCategorySums) => {
  try {
    const response = await fetch(`http://localhost:5000/sumsC/${est_id}/false`);
    const jsonData = await response.json();
    setExpenseCategorySums(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

export {
  getBudget,
  getSums,
  getAllTransactions,
  getExpensePieChartData,
  getIncomePieChartData,
};
