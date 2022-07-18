import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SetBudget = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <i className="bi bi-pencil-square text-white" onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Initial Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="w-750 mt-5 mb-5 mx-auto bg-light p-3 rounded-3 shadow">
            <label htmlFor="expIncome" className="grey-text">
              Expected Income
            </label>
            <input
              type="number"
              id="ExpIncome"
              className="form-control"
              placeholder="Enter amount"
            />
            <br />
            <label htmlFor="expExpenditure" className="grey-text">
              Expected Expenditure
            </label>
            <input
              type="number"
              id="ExpExpenditure"
              className="form-control"
              placeholder="Enter amount"
            />
            <br />
            <div className="text-center mb-4 mt-4"></div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SetBudget;
