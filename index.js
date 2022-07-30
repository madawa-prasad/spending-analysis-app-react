const express = require('express');
const app = express();
const cors = require('cors');
var pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//Adding from routes
const budgetRouter = require('./routes/budget');
const incomesRouter = require('./routes/incomes');
const expensesRouter = require('./routes/expenses');
const transactionsRouter = require('./routes/transactions');
const categoriesRouter = require('./routes/categories');
const summationsRouter = require('./routes/summations');

app.use('/budget', budgetRouter);
app.use('/incomes', incomesRouter);
app.use('/expenses', expensesRouter);
app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);
app.use('/', summationsRouter);

//SERVER
app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log('Spending Analysis App Server has started on port 5000');
});
