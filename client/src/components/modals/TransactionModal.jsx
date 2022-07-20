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
  const edit = props.edit;

  console.log(values.tr_id);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    if (edit === true) {
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

  //Handle change
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  //Editting existing todos
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        tr_description: 'Test expense modified twise',
        tr_category: 9,
        tr_amount: 100,
        tr_date: '2022-07-12 12:40:57.185059',
      };
      const response = await fetch(
        `http://localhost:5000/transactions/${transaction.tr_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      setShow(false);
      window.location = '/';
    } catch (err) {
      console.error(err.message);
      setShow(false);
    }
  };

  //Handle Submit
  const handleSubmit = () => {};

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

  return (
    <>
      {edit ? (
        <i className="bi bi-pencil-square text-dark" onClick={handleShow}></i>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          Add Transaction
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit' : 'Add'} Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form
            onSubmit={handleEdit}
            className="w-750 mt-5 mb-5 mx-auto bg-light p-3 rounded-3"
          > */}
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
            <Button variant="primary" onClick={(e) => handleEdit(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
          {/* </form> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TransactionModal;
