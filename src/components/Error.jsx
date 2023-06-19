import React from "react";
import "../styles/Error.css";
import error from "../images/error404.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <main>
        <section>
          <div>
            <img className="imagen-error" src={error} alt="" />
          </div>
          <p className="parrafo-error">
            No hemos podido conectarnos con la página que buscabas.
          </p>
          <p className="parrafo-error">
            La URL solicitada no se encontró en este servidor. Eso es todo lo
            que sabemos.
          </p>
          <div>
            <button className="btn btn-dark">
              <Link className="nav-link" to="/vehiculos">
                Ver vehículos
              </Link>
            </button>
          </div>
        </section>
      </main>
      <footer>
        <p className="parrafo-error">
          &copy; 2023 - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};

export default Error;
