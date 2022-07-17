import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light shadow p-3 mb-5">
      <div className="container-fluid">
        <span className="navbar-brand">
          <img
            src="https://www.seekpng.com/png/full/75-755344_png-file-high-cost-icon-png.png"
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          <span className="ms-3 font-weight-bold">Spending Analysis App</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
