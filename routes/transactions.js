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

//Get all transactions of a month*
router
  .route('/:id')
  .get(async (req, res) => {
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
  })
  .put(async (req, res) => {
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
  })
  .delete(async (req, res) => {
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

module.exports = router;
