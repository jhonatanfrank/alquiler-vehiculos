import React from "react";
import "../styles/Vehiculodetails.css";
const Vehiculodetails = (props) => {
  return (
    <>
      <div className="container contenedor-details">
        <div className="row">
          <div className="col-lg-7 d-flex justify-content-center align-items-center">
            <img
              className="vehiculo-foto-detalle"
              src={props.foto}
              alt="foto"
            />
          </div>
          <div className="col-lg-5 d-flex justify-content-center align-items-center">
            <div>
              <hr />
              <h3>Detalles</h3>
              <div className="row">
                <div className="col-6 col-*">
                  <li className="li-detalle">
                    <strong>Placa: </strong>
                    <span className="titulo-titulo">{props.placa}</span>
                  </li>
                </div>
                <div className="col-6">
                  <li className="li-detalle">
                    <strong>Marca: </strong>
                    <span className="titulo-titulo">{props.marca}</span>
                  </li>
                </div>
                <div className="col-6">
                  <li className="li-detalle">
                    <strong>Modelo: </strong>
                    <span className="titulo-titulo">{props.modelo}</span>
                  </li>
                </div>
                <div className="col-6">
                  <li className="li-detalle">
                    <strong>Año: </strong>
                    <span className="titulo-titulo">{props.anio}</span>
                  </li>
                </div>
                <div className="col-6">
                  <li className="li-detalle">
                    <strong>Combustible: </strong>
                    <span className="titulo-titulo">
                      {props.tipocombustible}
                    </span>
                  </li>
                </div>
                <div className="col-6">
                  <li className="li-detalle">
                    <strong>Asientos: </strong>
                    <span className="titulo-titulo">{props.asientos}</span>
                  </li>
                </div>
                <div className="col-6">
                  <li className="li-detalle">
                    <strong>Manejo: </strong>
                    <span className="titulo-titulo">{props.tipomanejo}</span>
                  </li>
                </div>
                <div className="col-6">
                  <li className="li-detalle">
                    <strong>Tapizado: </strong>
                    <span className="titulo-titulo">
                      {props.tapizadoasientos}
                    </span>
                  </li>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-12">
                  <h3>Descripción</h3>
                  <p className="titulo-titulo">{props.descripcion}</p>
                </div>
              </div>
              <div className="row">
              <div className="col-12">
                  <h3>Precio por día</h3>
                  <p className="titulo-titulo">${props.precio}</p>
                </div>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vehiculodetails;
