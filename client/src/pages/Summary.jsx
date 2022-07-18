import React from 'react';
import { useState } from 'react';
import ExpensesCard from '../components/cards/ExpensesCard';
import IncomeCard from '../components/cards/IncomesCard';
import LineChartD from '../components/charts/LineChartD';
import Footer from '../components/footer/Footer';
import DropDownInput from '../components/inputs/DropDownInput';
import { monthOptions } from '../data/monthOptions';
import Navbar from '../components/navbar/Navbar';

const Summary = () => {
  let d = new Date();
  let m = monthOptions[d.getMonth()];

  const [month, setMonth] = useState(m);

  console.log(month.value, m.value);
  return (
    <>
      <Navbar />
      <div className="container top mb-4 bg-light">
        <div className="row d-flex flex-row justify-content-between mb-3 pe-3">
          <h5 className="col mt-2">Budget Summary</h5>
          <DropDownInput
            options={monthOptions}
            className="col-2 me-4 mt-2"
            placeholder="Select Month"
            name="month"
            value={month}
            defaultValue={m}
            onChange={setMonth}
          />
        </div>
        <div className="row">
          <IncomeCard />
          <ExpensesCard />
          <div className="container body mt-3 mb-4 bg-light">
            <div className="row">
              <div className="col bg-dark p-3 mb-2 ms-3 me-5 rounded-3 ">
                <div className="d-flex row bg-light ms-2 me-2 mt-2 mb-4 rounded-3 p-2">
                  <p className="text-dark">July Incomes & Expences</p>
                  <LineChartD className="col-12 d-flex " />
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
