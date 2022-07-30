const express = require('express');
var pool = require('../db');
const router = express.Router();

//This function calculates est_id*
function calcEstId(d) {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const est_id = year + '' + month;
  return [est_id, year, month];
}

//Create a budget*
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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

module.exports = router;
