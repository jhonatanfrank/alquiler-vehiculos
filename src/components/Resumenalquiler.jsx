import React from "react";

const Resumenalquiler = ({ location }) => {
  const { datos } = location.state;

  return (
    <div>
      <h2>Resumen</h2>
      <p>Nombre: {datos.nombre}</p>
      <p>Apellido: {datos.apellido}</p>
      <p>Edad: {datos.edad}</p>
    </div>
  );
};

export default Resumenalquiler;
