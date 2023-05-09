import React from "react";

const Prueba = (props) => {
  const { vehiculo } = props;

  return <div>{vehiculo.precio}</div>;
};

export default Prueba;
