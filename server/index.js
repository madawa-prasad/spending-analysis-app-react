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
    const functionalData = calcEstId(date);
    // const month = date.getMonth() + 1;
    // const est_id = year + '' + month;
    const newBudget = await pool.query(
      'INSERT INTO estimated_budget (est_id,est_income, est_expenditure,est_year,est_month, created_on) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        functionalData[0],
        est_income,
        est_expenditure,
        functionalData[1],
        functionalData[2],
        date,
      ]
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
    const { inc_description, inc_category, inc_amount, inc_date } = req.body;
    const tr_is_income = true;
    const newIncome = await pool.query(
      'INSERT INTO transactions (est_id, tr_is_income, tr_description, tr_category, tr_amount, tr_date) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        calcEstId(inc_date)[0],
        tr_is_income,
        inc_description,
        inc_category,
        inc_amount,
        inc_date,
      ]
    );
    res.json(newIncome.rows[0]);
    console.log(calcEstId(inc_date)[0]);
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
    const { exp_description, exp_category, exp_amount, exp_date } = req.body;
    const tr_is_income = false;
    const newExpense = await pool.query(
      'INSERT INTO transactions (est_id, tr_is_income, tr_description, tr_category, tr_amount, tr_date) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        calcEstId(exp_date)[0],
        tr_is_income,
        exp_description,
        exp_category,
        exp_amount,
        exp_date,
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

//Get expense categories

//SERVER
app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
