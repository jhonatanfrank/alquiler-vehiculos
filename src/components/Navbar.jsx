import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="nav-link" to="/">
            <img
              src="./images/logo-rent-cars.png"
              alt="logo-rent-cars"
              className="img-navbar"          
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item p-2">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link className="nav-link" to="/vehiculos">
                  Vehiculos
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link className="nav-link" to="/contactanos">
                  Contactanos
                </Link>
              </li>
            </ul>

            {/*<form className="d-flex">
              <Link className="nav-link" to="/login">
                <span className="navbar-text me-2">Iniciar sesión</span>
              </Link>
            </form>
            <form className="d-flex" role="search">
              <button className="btn btn-sm btn-outline-danger">Salir</button>
            </form>*/}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
