import React, { useEffect, useState } from "react";
import "../styles/Alquileresfecha.css";
const Alquileresfecha = (props) => {
  const [alquileres, setAlquileres] = useState([]);
  useEffect(() => {
    const fetchAlquileres = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/alquilervehiculos/api/alquileres/vehiculo/${props.placa}`
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de alquileres");
        }
        const alquileres = await response.json();
        setAlquileres(alquileres);
        console.log(alquileres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlquileres();
  }, []);

  return (
    <>
      {!alquileres.length > 0 ? (
        <>
          <section>
            <h1 className="titulo-titulo">
              El vehículo actualmente no tiene ninguna reserva programada.
            </h1>
            <h1 className="titulo-titulo">
              <strong>¡Reserva tu vehículo ahora!</strong>
            </h1>
          </section>
        </>
      ) : (
        <>
          <div className="container d-flex justify-content-center align-items-center">
            <div className="row">
              <div className="contenedor-alquileres-fecha ">
                <section>
                  <h3>
                    Lista de alquileres del vehículo con placa {props.placa}
                  </h3>
                  <p className="titulo-titulo">
                    Estas son las fechas en las que este vehiculo con placa{" "}
                    <strong>{props.placa}</strong>, está ocupada.
                    <br />
                    Revisa y no alquiles el vehiculo en esas fechas para no
                    cruzarte con otros alquileres.
                  </p>
                </section>
              </div>
              <div className="container d-flex justify-content-center">
                <table className="table table-hover" style={{ width: "310px" }}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Fecha de inicio</th>
                      <th scope="col">Fecha de fin</th>
                      {/* Agrega aquí cualquier otro encabezado que quieras mostrar */}
                    </tr>
                  </thead>
                  <tbody>
                    {alquileres.map((alquiler, index) => (
                      <tr key={alquiler.id}>
                        <td>{index + 1}</td>
                        <td>{alquiler.fechainicio.substring(0, 10)}</td>
                        <td>{alquiler.fechafin.substring(0, 10)}</td>
                        {/* Agrega aquí cualquier otro atributo que quieras mostrar */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Alquileresfecha;
