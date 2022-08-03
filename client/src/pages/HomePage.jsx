import React from 'react';
import { Link } from 'react-router-dom';
import BudgetCard from '../components/cards/BudgetCard';

import Footer from '../components/footer/Footer';
import DropDownInput from '../components/inputs/DropDownInput';
import Navbar from '../components/navbar/Navbar';
import Transactions from '../components/transactions/Transactions';
import { monthOptions, yearOptions } from '../data/dropDownOptions';
import { HomeContainer } from '../containers/homeContainer';

const HomePage = () => {
  const { year, month, estId, isIncome, setIsIncome, setMonth, setYear } =
    HomeContainer.useContainer();

  return (
    <>
      <div className="bg-light">
        <Navbar />
        <section className="container top mb-4 bg-light">
          <div className="row d-flex flex-row justify-content-between mb-3 ms-4 me-0">
            <div className="d-flex col justify-content-start">
              <DropDownInput
                options={yearOptions}
                className="col-2 me-4 mt-2"
                placeholder="Select Year"
                name="year"
                value={year}
                onChange={setYear}
              />
              <DropDownInput
                options={monthOptions}
                className="col-2 me-4 mt-2"
                placeholder="Select Month"
                name="month"
                value={month}
                onChange={setMonth}
              />
              <div className="d-flex col justify-content-end">
                <Link to="/summary">
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-2"
                  >
                    View Summary
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <BudgetCard isActual={false} />
            <BudgetCard isActual={true} />
          </div>
        </section>
        <section className="container body mb-4">
          <div className="row">
            <div className="col bg-light bg-white shadow p-3 mb-2 ms-5 me-3 rounded-3 ">
              <div className="d-flex row bg-light shadow-sm ms-2 me-2 mt-2 mb-4 rounded-3 p-2">
                <ul className="nav nav-pills border border-primary rounded-3">
                  <li className="nav-item col-6" role="presentation">
                    <button
                      className="nav-link col-12 ps-5 pe-5 active"
                      id="incomes-tab"
                      data-bs-toggle="tab"
                      type="button"
                      role="tab"
                      onClick={() => setIsIncome(true)}
                    >
                      INCOMES
                    </button>
                  </li>
                  <li className="nav-item col-6" role="presentation">
                    <button
                      className="nav-link ms-3 col-12 rounded-3 ps-5 pe-5 "
                      id="expenses-tab"
                      data-bs-toggle="tab"
                      type="button"
                      role="tab"
                      onClick={() => setIsIncome(false)}
                    >
                      EXPENSES
                    </button>
                  </li>
                </ul>
              </div>
              <div className="row bg-light shadow-sm d-flex mt-2 mb-2 ms-2 me-2 rounded-3">
                <Transactions isIncome={isIncome} est_id={estId} />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
