import React, { useEffect, useState } from "react";
import "../styles/Alquileresfecha.css";
const Alquileresfecha = (props) => {
  return (
    <>
      <section>
        <h1 className="titulo-titulo">¡Reserva tu vehículo ahora!</h1>

        <div>
          <strong>
            <span className="alert-aviso">
              *Si las fechas en el calendario te salen de color plomo y no las
              puedes seleccionar, es por que esas fechas el vehículo ya está en
              reserva*
            </span>
          </strong>
        </div>
      </section>
    </>
  );
};

export default Alquileresfecha;
