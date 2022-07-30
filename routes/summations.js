const express = require('express');
var pool = require('../db');
const router = express.Router();

//Get sums based on date
router.get('/sumsD/:est_id', async (req, res) => {
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

//Get sums based category
router.get('/sumsC/:est_id/:is_income', async (req, res) => {
  try {
    const est_id = req.params.est_id;
    const is_income = req.params.is_income;
    const categories = await pool.query(
      'SELECT cat_title, SUM(tr_amount) AS cat_sum FROM transactions INNER JOIN categories ON transactions.tr_category=categories.cat_id WHERE tr_is_income=$1 AND est_id = $2 GROUP BY cat_title',
      [is_income, est_id]
    );
    res.json(categories.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
