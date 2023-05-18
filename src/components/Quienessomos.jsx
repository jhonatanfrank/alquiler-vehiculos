import React from "react";
import "../styles/Quienessomos.css";
import { Link } from "react-router-dom";

const Quienessomos = () => {
  return (
    <>
      <div className="container-quienes-somos">
        <div className="container-contenido">
          <div>
            <h2>¿Quienes Somos?</h2>
            <p className="parrafo-quienes-somos">              
              En Alquiler de Vehículos, nos enorgullece ofrecer un servicio de
              alquiler de vehículos confiable y conveniente para satisfacer
              todas tus necesidades de movilidad. Con una amplia flota de
              vehículos modernos y bien mantenidos, nos esforzamos por brindarte
              la mejor experiencia de alquiler posible.
            </p>
            <div>
              <button className="btn btn-dark">           
                <Link className="nav-link" to="/vehiculos">
                  Ver vehículos
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="container-contenido">
          <div className="contenedor-imagen">
            <img
              className="imagen-quienes-somos"
              src="https://www.turiweb.pe/wp-content/uploads/2020/02/autos1-280220.jpg"
              alt="imagen"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Quienessomos;
