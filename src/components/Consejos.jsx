import React from "react";

const Adicional = () => {
  return (
    <>
      <div className="mt-5 contenedor-hijo-adicional">
        <div className="contenedor-adicional-adicion">
          <h3>Respeta las señalizaciones</h3>
          <br />
          <p>
            <span className="titulo-titulo">
              Las reglas están hechas para cumplirse. Cuando manejes, observa
              todas las señalizaciones de tránsito, guíate de los semáforos, no
              te pases la luz roja, y recuerda siempre darle la preferencia a
              los peatones.
            </span>
          </p>
          <br />
        </div>
        <div className="contenedor-adicional-adicion">
          <h3>Usa el cinturón de seguridad</h3>
          <br />
          <p>
            <span className="titulo-titulo">
              El cinturón de seguridad es tu mejor aliado para un manejo seguro,
              ya que en caso ocurra un accidente de tránsito te sujetará a tu
              asiento. Además, su uso es obligatorio y, si no lo llevas puesto,
              recibirás una multa por poner en riesgo tu vida.
            </span>
          </p>
          <br />
        </div>
        <div className="contenedor-adicional-adicion">
          <h3>Utiliza las luces</h3>
          <br />
          <p>
            <span className="titulo-titulo">
              Una buena iluminación no solo reducirá tu fatiga visual, sino que
              también te hará visible para los demás conductores y peatones, y
              así podrás evitar accidentes. Antes de salir, no olvides revisar
              que todas las luces de tu auto estén en buen estado.
            </span>
          </p>
          <br />
        </div>
      </div>
    </>
  );
};

export default Adicional;
