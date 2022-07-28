import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BudgetModal = (props) => {
  const [show, setShow] = useState(false);
  const [budget, setBudget] = useState([]);

  let isEdit = props.isEdit;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setBudget(props.budget);
    setShow(true);
  };

  useEffect(() => {
    setBudget(budget);
  }, [budget]);

  //Handle change
  const changeHandler = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  //Editing existing budget
  const handleEdit = async () => {
    try {
      const body = {
        est_income: budget.est_income,
        est_expenditure: budget.est_expenditure,
      };
      // eslint-disable-next-line
      const response = await fetch(
        `http://localhost:5000/budget/${budget.est_id}`,
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

  //Setting New budget
  const handleNewBudget = async () => {
    try {
      const body = {
        est_income: budget.est_income,
        est_expenditure: budget.est_expenditure,
      };
      // eslint-disable-next-line
      const response = await fetch('http://localhost:5000/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setShow(false);
      window.location = '/';
    } catch (err) {
      console.error(err.message);
      setShow(false);
    }
  };

  return (
    <>
      <i className="bi bi-pencil-square text-dark" onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit' : 'Set'} Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="expIncome" className="grey-text">
            Expected Income
          </label>
          <input
            type="number"
            id="estIncome"
            name="est_income"
            className="form-control"
            onChange={changeHandler}
            value={budget.est_income}
            placeholder="Enter amount"
            required
          />
          <br />
          <label htmlFor="estExpenditure" className="grey-text">
            Expected Expenditure
          </label>
          <input
            type="number"
            id="estExpenditure"
            name="est_expenditure"
            className="form-control"
            onChange={changeHandler}
            value={budget.est_expenditure}
            placeholder="Enter amount"
            required
          />
          <br />
          <div className="text-center mb-4 mt-4"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!isEdit && (
            <Button variant="primary" onClick={handleNewBudget}>
              Set Budget
            </Button>
          )}
          {isEdit && (
            <Button variant="primary" onClick={handleEdit}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BudgetModal;
