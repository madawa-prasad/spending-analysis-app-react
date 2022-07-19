import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DropDownInput from '../inputs/DropDownInput';

const initialValues = {
  description: '',
  category: '',
  date: '',
  amount: '',
};

const TransactionModal = (props) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState(initialValues);

  const categories = [
    { value: 'Salary', label: 'Salary' },
    { value: 'Rentals', label: 'Rentals' },
    { value: 'Interest', label: 'Interest' },
  ];

  const handleClose = () => {
    setShow(false);
    setCategory('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    setShow(false);
  };
  return (
    <>
      {props.edit ? (
        <i className="bi bi-pencil-square text-dark" onClick={handleShow}></i>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          Add Transaction
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.edit ? 'Edit' : 'Add'} Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="w-750 mt-5 mb-5 mx-auto bg-light p-3 rounded-3"
          >
            <label htmlFor="description" className="grey-text">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control"
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
              name="category"
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
              className="form-control"
              placeholder="Enter amount"
              required
            />
            <br />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TransactionModal;
