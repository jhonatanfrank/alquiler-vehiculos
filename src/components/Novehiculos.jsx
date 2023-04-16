import React from "react";
import "../styles/Novehiculo.css";

const Novehiculos = () => {
  return (
    <div>
      <main>
        <section className="Novehiculos-section">
          <h1 className="Novehiculos-h1">
            Actualmente no tenemos ningún vehiculo disponible, vuelva en unas horas.
          </h1>
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

export default Novehiculos;
