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

//Create Expense*
router.post('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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

module.exports = router;
