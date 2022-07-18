import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import Transactions from '../components/transactions/Transactions';

const HomePage = () => {
  return (
    <>
      <div className="bg-light">
        <Navbar />
        <section className="container top mb-4 bg-light">
          <div className="row">
            <div className="col bg-dark mt-2 mb-2 ms-5 me-3 rounded-3 expected ">
              <div className="d-flex flex-row justify-content-between">
                <span className="title text-white fw-bold">Planned budget</span>
                <i className="bi bi-pencil-square text-white"></i>
              </div>
              <div className="d-flex flex-row justify-content-around mb-3">
                <div className="d-flex flex-column text-center">
                  <span className="text-white">INCOME</span>
                  <span className="text-white fs-1 fw-bold">350 $</span>
                </div>
                <div className="border-end"></div>
                <div className="d-flex flex-column text-center">
                  <span className="text-white">EXPENDITURE</span>
                  <span className="text-white fs-1 fw-bold">350 $</span>
                </div>
              </div>
            </div>

            <div className="col bg-dark mt-2 mb-2 ms-3 me-5 rounded-3 actual">
              <Link to="/summary" className="text-decoration-none">
                <span className="title text-white fw-bold">Actual budget</span>
                <div className="d-flex flex-row justify-content-around mt-2 mb-3">
                  <div className="d-flex flex-column text-center">
                    <span className="text-white">INCOME</span>
                    <span className="text-white fs-1 fw-bold">350 $</span>
                  </div>
                  <div className="border-end"></div>
                  <div className="d-flex flex-column text-center">
                    <span className="text-white">EXPENDITURE</span>
                    <span className="text-white fs-1 fw-bold">350 $</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className="container body mb-4 bg-light">
          <div className="row">
            <div className="col bg-dark p-3 mb-2 ms-5 me-5 rounded-3 ">
              <div className="d-flex row bg-light ms-2 me-2 mt-2 mb-4 rounded-pill p-2">
                <ul className="nav nav-pills d-flex justify-content-between">
                  <li className="nav-item col-6" role="presentation">
                    <button
                      className="nav-link col-12 rounded-pill ps-5 pe-5 active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      INCOMES
                    </button>
                  </li>
                  <li className="nav-item col-6" role="presentation">
                    <button
                      className="nav-link ms-2 col-12 rounded-pill ps-5 pe-5 "
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      EXPENSES
                    </button>
                  </li>
                </ul>
              </div>
              <div className="row bg-light d-flex mt-2 mb-2 ms-2 me-2 rounded-3">
                <Transactions />
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
