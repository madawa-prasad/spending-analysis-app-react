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
        functionalData[3],
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
  } catch (err) {
    console.error(err.message);
  }
});

//Update income*
app.put('/incomes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { inc_description, inc_category, inc_amount, inc_date } = req.body;
    const updateIncome = await pool.query(
      'UPDATE transactions SET est_id = $1, tr_description = $2, tr_category = $3, tr_amount = $4, tr_date = $5 WHERE tr_id = $6',
      [
        calcEstId(inc_date)[0],
        inc_description,
        inc_category,
        inc_amount,
        inc_date,
        id,
      ]
    );
    res.json('Income has updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//Get all incomes*
app.get('/incomes', async (req, res) => {
  try {
    const allIncomes = await pool.query(
      'SELECT * FROM transactions WHERE tr_is_income = TRUE'
    );
    res.json(allIncomes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete Income*
app.delete('/incomes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteIncome = await pool.query(
      'DELETE FROM transactions WHERE tr_id = $1',
      [id]
    );
    res.json(`This ${id}'th income has deleted!`);
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
    const newIncome = await pool.query(
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
    res.json(newIncome.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Update expense*
app.put('/expenses/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { exp_description, exp_category, exp_amount, exp_date } = req.body;
    const updateIncome = await pool.query(
      'UPDATE transactions SET est_id = $1, tr_description = $2, tr_category = $3, tr_amount = $4, tr_date = $5 WHERE tr_id = $6',
      [
        calcEstId(exp_date)[0],
        exp_description,
        exp_category,
        exp_amount,
        exp_date,
        id,
      ]
    );
    res.json('Expense has updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//Get all expense*
app.get('/expenses', async (req, res) => {
  try {
    const allIncomes = await pool.query(
      'SELECT * FROM transactions WHERE tr_is_income = FALSE'
    );
    res.json(allIncomes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete expense*
app.delete('/expenses/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteIncome = await pool.query(
      'DELETE FROM transactions WHERE tr_id = $1',
      [id]
    );
    res.json(`This ${id}'th expense has deleted!`);
  } catch (err) {
    console.error(err.message);
  }
});

//SERVER
app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
