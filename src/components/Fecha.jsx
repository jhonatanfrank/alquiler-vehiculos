import React, { useEffect, useState } from "react";
import moment from "moment";

const Fecha = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [diasTranscurridos, setDiasTranscurridos] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setDiasTranscurridos("");

    if (fechaInicio && fechaFin) {
      const fechaInicioMoment = moment(fechaInicio);
      const fechaFinMoment = moment(fechaFin);

      if (fechaInicio >= fechaFin) {
        setError("Por favor, elija fechas diferentes");
      } else {
        const diasTranscurridos = fechaFinMoment.diff(
          fechaInicioMoment,
          "days"
        );
        setDiasTranscurridos(diasTranscurridos);
      }
    }
  }, [fechaInicio, fechaFin]);

  return (
    <>
      <div className="">
        <div className="form-group">
          <label htmlFor="name">Fecha de inicio:</label>
          <input
            className="form-control"
            type="date"
            id="fechaInicio"            
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Fecha de fin:</label>
          <input
            className="form-control"
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Lugar de recojo:</label>
          <input className="form-control" type="text" placeholder="Av. Rivaguero 788" required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Lugar de devolución:</label>
          <input className="form-control" type="text" placeholder="Av. Micaela Bastidas 202" required />
        </div>
        <h6 className="subtitulo text-center">
          {fechaInicio && fechaFin && error && <p className="error">{error}</p>}
          {diasTranscurridos !== "" && !error && (
            <p className="fecha-ok text-center">
              Usted está alquilando el vehículo por {diasTranscurridos} días.
            </p>
          )}
        </h6>
      </div>
    </>
  );
};

export default Fecha;
