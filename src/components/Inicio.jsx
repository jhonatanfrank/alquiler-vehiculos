import React from "react";
import Carousel from "./Carousel";

const Inicio = () => {
  return (
    <div>
      <div className="container-fluid p-5 bg-dark text-white text-center">
        <h1>Inicio</h1>
        <p>¿Quiénes somos?</p>
      </div>
      <Carousel />
    </div>
  );
};

export default Inicio;
