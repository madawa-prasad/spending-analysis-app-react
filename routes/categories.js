const express = require('express');
var pool = require('../db');
const router = express.Router();

//Get income categories
router.get('/:is_income', async (req, res) => {
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

module.exports = router;
