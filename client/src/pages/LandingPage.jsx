import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5 rounded-3">
        <br />
        <form className="w-25 mt-5 mb-5 mx-auto bg-light p-3 rounded-3 shadow">
          <p className="h4 text-center mt-3 mb-5">Set Initial Budget</p>
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
          <div className="text-center mb-4 mt-4">
            <Link to="/home">
              <button type="button" className="btn btn-primary">
                Get Stated
              </button>
            </Link>
          </div>
        </form>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
