const express = require('express');
const app = express();
const cors = require('cors');
var pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES BUDGET//

//This function calculates est_id*
function calcEstId(d) {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const est_id = year + '' + month;
  return [est_id, year, month];
}
//Create a budget*
app.post('/budget', async (req, res) => {
  try {
    const { est_income, est_expenditure } = req.body;
    const date = new Date();
    const dateData = calcEstId(date);
    const newBudget = await pool.query(
      'INSERT INTO estimated_budget (est_id,est_income, est_expenditure,est_year,est_month, created_on) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [dateData[0], est_income, est_expenditure, dateData[1], dateData[2], date]
    );
    res.json(newBudget.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Update budget*
app.put('/budget/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { est_income, est_expenditure } = req.body;
    const updateBudget = await pool.query(
      'UPDATE estimated_budget SET est_income = $1, est_expenditure = $2 WHERE est_id = $3',
      [est_income, est_expenditure, id]
    );
    res.json('Budget has updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//Get a certain budget
app.get('/budget/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const budget = await pool.query(
      'SELECT * FROM estimated_budget WHERE est_id = $1',
      [id]
    );
    res.json(budget.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//INCOMES RELATED
//Create Income*
app.post('/incomes', async (req, res) => {
  try {
    const { tr_description, tr_category, tr_amount, tr_date } = req.body;
    const tr_is_income = true;
    const est_id = calcEstId(tr_date);
    const newIncome = await pool.query(
      'INSERT INTO transactions (est_id, tr_is_income, tr_description, tr_category, tr_amount, tr_date) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [est_id[0], tr_is_income, tr_description, tr_category, tr_amount, tr_date]
    );
    res.json(newIncome.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all incomes*
app.get('/incomes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const allIncomes = await pool.query(
      'SELECT * FROM transactions INNER JOIN categories ON transactions.tr_category = categories.cat_id WHERE est_id = $1 AND tr_is_income = TRUE  ORDER BY tr_date ASC',
      [id]
    );
    res.json(allIncomes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//EXPENSES
//Create Expense*
app.post('/expenses', async (req, res) => {
  try {
    const { tr_description, tr_category, tr_amount, tr_date } = req.body;
    const tr_is_income = false;
    const newExpense = await pool.query(
      'INSERT INTO transactions (est_id, tr_is_income, tr_description, tr_category, tr_amount, tr_date) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        calcEstId(tr_date)[0],
        tr_is_income,
        tr_description,
        tr_category,
        tr_amount,
        tr_date,
      ]
    );
    res.json(newExpense.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all expenses*
app.get('/expenses/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const allExpenses = await pool.query(
      'SELECT * FROM transactions INNER JOIN categories ON transactions.tr_category = categories.cat_id WHERE tr_is_income = FALSE AND est_id = $1 ORDER BY tr_date ASC',
      [id]
    );
    res.json(allExpenses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//MONTHLY ALL TRANSACTIONS
//Get all transactions of a month*
app.get('/transactions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const allTransactions = await pool.query(
      'SELECT * FROM transactions INNER JOIN categories ON transactions.tr_category = categories.cat_id WHERE est_id = $1 ORDER BY tr_date ASC',
      [id]
    );
    res.json(allTransactions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Update transaction*
app.put('/transactions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { tr_description, tr_category, tr_amount, tr_date } = req.body;
    const updateTransaction = await pool.query(
      'UPDATE transactions SET est_id = $1, tr_description = $2, tr_category = $3, tr_amount = $4, tr_date = $5 WHERE tr_id = $6',
      [
        calcEstId(tr_date)[0],
        tr_description,
        tr_category,
        tr_amount,
        tr_date,
        id,
      ]
    );
    res.json('Transaction has updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//Delete transaction*
app.delete('/transactions/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteTransaction = await pool.query(
      'DELETE FROM transactions WHERE tr_id = $1',
      [id]
    );
    res.json(`This ${id}'th transaction has deleted!`);
  } catch (err) {
    console.error(err.message);
  }
});

//CATEGORIES
//Get income categories
app.get('/categories/:is_income', async (req, res) => {
  try {
    const is_income = req.params.is_income;
    const categories = await pool.query(
      'SELECT * FROM categories WHERE cat_is_income = $1',
      [is_income]
    );
    res.json(categories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get sums based on date
app.get('/sumsD/:est_id', async (req, res) => {
  try {
    const est_id = req.params.est_id;
    const categories = await pool.query(
      'SELECT COALESCE(sum_i.tr_date,sum_e.tr_date) AS tr_date, COALESCE(sum_i.incomes_sum,0) AS incomes, COALESCE(sum_e.expenses_sum,0) AS expenses FROM (SELECT tr_date, SUM(tr_amount) AS incomes_sum FROM transactions WHERE tr_is_income=TRUE AND est_id=$1 GROUP BY tr_date) sum_i FULL OUTER JOIN (SELECT tr_date, SUM(tr_amount) AS expenses_sum FROM transactions WHERE tr_is_income=FALSE AND est_id=$2 GROUP BY tr_date) sum_e ON (sum_i.tr_date = sum_e.tr_date)',
      [est_id, est_id]
    );
    res.json(categories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//SERVER
app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
