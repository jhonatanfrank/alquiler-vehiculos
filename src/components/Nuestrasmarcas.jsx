import React from "react";
import "../styles/Nuestrasmarcas.css";

const Nuestrasmarcas = () => {
  return (
    <>
      <div className="container-fluid p-5 bg-dark text-white text-center">
        <h1>Las marcas que usamos</h1>
      </div>
      <section className="container-nuestras-marcas">
        <div className="contenedor-hijo-adicional">
          <div className="marca 1">
            <img
              src="./images/mercedez.jpg"
              className="contenedor-box-shadow"
              alt="auto1"
            />
            <h3 className="sub-titulo-nuestras-marcas">Mercedez</h3>
          </div>
          <div className="marca 1">
            <img
              src="./images/toyota.jpg"
              className="contenedor-box-shadow"
              alt="auto1"
            />
            <h3 className="sub-titulo-nuestras-marcas">Toyota</h3>
          </div>
          <div className="marca 1">
            <img
              src="./images/peugeot.jpg"
              className="contenedor-box-shadow"
              alt="auto1"
            />
            <h3 className="sub-titulo-nuestras-marcas">Peugeot</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nuestrasmarcas;
