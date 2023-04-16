import React from "react";
import "../styles/Error.css";

const Error = () => {
  return (
    <div>
      <main>
        <section>
          <div>
            <img className="imagen-error" src="./images/error404.jpg" alt="" />
          </div>
          <p className="parrafo-error">
            No hemos podido conectarnos con la página que buscabas.
          </p>
          <p className="parrafo-error">
            La URL solicitada no se encontró en este servidor. Eso es todo lo
            que sabemos.
          </p>
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
