import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DropDownInput from '../inputs/DropDownInput';

const TransactionModal = (props) => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState([]);
  const [category, setCategory] = useState('');

  //PROPS
  const transaction = props.transaction;
  const categories = props.categories;
  const isEdit = props.isEdit;
  const isIncome = props.isIncome;
  const setTransactions = props.setTransactions;

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    if (isEdit === true) {
      setShow(true);
      setValues(transaction);
      setCategory(
        categories.find((element) => element.value === transaction.tr_category)
      );
    } else {
      setShow(true);
      setValues([]);
      setCategory('');
    }
  };

  //Generate date string
  const generateDateString = (dateObject) => {
    let date = new Date(dateObject);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateString =
      year +
      `${month > 9 ? '-' : '-0'}` +
      month +
      `${day > 9 ? '-' : '-0'}` +
      day;
    return dateString;
  };

  //Handle change
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Editing existing transaction
  const handleEdit = async (values, category) => {
    try {
      const body = {
        tr_description: values.tr_description,
        tr_category: category.value,
        tr_amount: values.tr_amount,
        tr_date: values.tr_date,
      };
      // eslint-disable-next-line
      const response = await fetch(
        `http://localhost:5000/transactions/${transaction.tr_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      setShow(false);
      setTransactions();
    } catch (err) {
      console.error(err.message);
      setShow(false);
    }
  };

  //Handle adding new Submit
  const handleNewTransaction = async (values, category) => {
    try {
      const body = {
        tr_description: values.tr_description,
        tr_category: category.value,
        tr_amount: values.tr_amount,
        tr_date: values.tr_date,
      };
      // eslint-disable-next-line
      const response = await fetch(
        `http://localhost:5000/${isIncome ? 'incomes' : 'expenses'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      setShow(false);
      setTransactions();
    } catch (err) {
      console.error(err.message);
      setShow(false);
    }
  };

  return (
    <>
      {isEdit ? (
        <i className="bi bi-pencil-square text-dark" onClick={handleShow}></i>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          Add {isIncome ? 'Income' : 'Expense'}
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? 'Edit' : 'Add'} {isIncome ? 'Income' : 'Expense'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="description" className="grey-text">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="tr_description"
            className="form-control"
            value={values.tr_description}
            onChange={changeHandler}
            placeholder="Enter description"
            required
          />
          <br />
          <label htmlFor="category" className="grey-text">
            Category
          </label>
          <DropDownInput
            options={categories}
            placeholder="Select category"
            name="tr_category"
            value={category}
            defaultValue={''}
            onChange={setCategory}
            required
          />
          <br />
          <label htmlFor="date" className="grey-text">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="form-control"
            name="tr_date"
            value={generateDateString(values.tr_date)}
            onChange={changeHandler}
            placeholder="Select date"
            required
          />
          <br />
          <label htmlFor="amount" className="grey-text">
            Enter amount
          </label>
          <input
            type="number"
            id="amount"
            name="tr_amount"
            className="form-control"
            onChange={changeHandler}
            value={values.tr_amount}
            placeholder="Enter amount"
            required
          />
          <br />

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                isEdit
                  ? handleEdit(values, category)
                  : handleNewTransaction(values, category);
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TransactionModal;
