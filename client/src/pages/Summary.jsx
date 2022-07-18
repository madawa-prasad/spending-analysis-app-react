import React from 'react';
import ExpensesCard from '../components/cards/ExpensesCard';
import IncomeCard from '../components/cards/IncomesCard';
import LineChartD from '../components/charts/LineChartD';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

const Summary = () => {
  return (
    <>
      <Navbar />
      <div className="container top mb-4 bg-light">
        <div className="row">
          <IncomeCard />
          <ExpensesCard />
          <div className="container body mt-3 mb-4 bg-light">
            <div className="row">
              <div className="col bg-dark p-3 mb-2 ms-3 me-5 rounded-3 ">
                <div className="d-flex row bg-light ms-2 me-2 mt-2 mb-4 rounded-3 p-2">
                  <p className="text-dark">July Incomes & Expences</p>
                  <LineChartD />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Summary;
