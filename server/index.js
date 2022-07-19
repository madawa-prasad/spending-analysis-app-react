const express = require('express');
const app = express();
const cors = require('cors');
var pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES BUDGET//
//Create a budget
app.post('/budget', async (req, res) => {
  try {
    const { exp_income, exp_expenditure } = req.body;
    const newBudget = await pool.query(
      'INSERT INTO estimated_budget (est_income, est_expenditure,created_on) VALUES($1,$2,$3) RETURNING *',
      [exp_income, exp_expenditure, new Date()]
    );
    res.json(newBudget.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Update budget
app.put('/budget/:id', async (req, res) => {
  try {
    const { id } = parseInt(req.params);
    const { est_income, est_expenditure } = req.body;
    const updateBudget = await pool.query(
      'UPDATE estimated_budget SET est_income = $1, est_expenditure = $2, created_on = $3 WHERE est_id = $4',
      [est_income, est_expenditure, new Date(), id]
    );
    res.json('Todo has updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//INCOMES
//Create Income
app.post('/incomes', async (req, res) => {
  try {
    const { est_id, inc_description, inc_category, inc_amount } = req.body;
    const newIncome = await pool.query(
      'INSERT INTO incomes (est_id, inc_description, inc_category, inc_amount, inc_date) VALUES($1,$2,$3,$4,$5) RETURNING *',
      [est_id, inc_description, inc_category, inc_amount, new Date()]
    );
    res.json(newIncome.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Update income
app.put('/incomes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { est_id, inc_description, inc_category, inc_amount } = req.body;
    const updateIncome = await pool.query(
      'UPDATE incomes SET est_id = $1, inc_description = $2, inc_category = $3, inc_amount = $4, inc_date = $5 WHERE inc_id = $6',
      [est_id, inc_description, inc_category, inc_amount, new Date(), id]
    );
    res.json('Income has updated!');
  } catch (err) {
    console.error(err.message);
  }
});

//Get all incomes
app.get('/incomes', async (req, res) => {
  try {
    const allIncomes = await pool.query('SELECT * FROM incomes');
    res.json(allIncomes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Delete Income
app.delete('/incomes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteIncome = await pool.query(
      'DELETE FROM incomes WHERE inc_id = $1',
      [id]
    );
    res.json('This income has deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

//SERVER
app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
