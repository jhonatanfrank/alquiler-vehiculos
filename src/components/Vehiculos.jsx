import React from "react";
import { Link } from "react-router-dom";
import "../styles/Vehiculos.css";

const Vehiculos = (props) => {
  return (
    <>
      <div>
        <div className="contenedor-hijo-vehiculos contenedor-box-shadow">
          <div className="precio">
            <span className="precio-titulo">
              <strong>Desde: S/{props.precio}.00</strong>
            </span>
            <span className="sub-precio-titulo">/día</span>
          </div>
          <div className="imagen-caja">
            <img src={props.foto} alt={props.marca} />
          </div>
          <h5 className="text-center">
            <strong>{props.marca}</strong>
          </h5>
          <h3 className="text-center">
            <strong>{props.placa}</strong>
          </h3>
          {/*
          <br />
          <div className="contenedor-padre-detalles">
            <div
              className="contenedor-hijo-detalles"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img className="iconos" src={cajacambios} alt={cajacambios} />
              <p>{props.manejo}</p>
            </div>
            <div
              className="contenedor-hijo-detalles"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img className="iconos" src={combustible} alt={combustible} />
              <p>{props.combustible}</p>
            </div>
            <div
              className="contenedor-hijo-detalles"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img className="iconos" src={asientos} alt={asientos} />
              <p>{props.asientos}</p>
            </div>
            <div
              className="contenedor-hijo-detalles"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img className="iconos" src={vehiculo} alt={vehiculo} />
              <p>{props.modelo}</p>
            </div>
          </div>
          */}
          <br />
          <div>
            <Link to={`/vehiculos/${props.id}`}>
              <button className="btn btn-dark col-12 btn-sm p-2">
                Más detalles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vehiculos;
