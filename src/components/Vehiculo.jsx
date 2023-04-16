import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Fecha from "../components/Fecha";
import Consejos from "./Consejos";

const Vehiculo = () => {
  // Example starter JavaScript htmlFor disabling form submissions if there are invalid fields
  (() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
  const params = useParams();

  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    const obtenerVehiculo = async () => {
      try {
        const respuesta = await fetch(
          `http://192.168.1.40:8080/alquilervehiculos/api/vehiculos/${params.id}`
        );
        if (!respuesta.ok) {
          console.log("No se pudo obtener el vehículo");
        }
        const vehiculo = await respuesta.json();
        setVehiculo(vehiculo);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerVehiculo();
  }, [params.id]);

  return (
    <>
      {vehiculo ? (
        <>
          <div className="container-fluid p-5 bg-dark text-white text-center">
            <h1>Reserva el vehículo "{vehiculo.placa}" aquí!!!</h1>
            <p>
              Puedes reservar el vehículo o alquilar aquí, siguiendo los pasos
            </p>
          </div>
          <div className="mt-5 contenedor-hijo-adicional">
            <div className="columna-1">
              <div className="contenedor-vehiculo-foto d-flex justify-content-center align-items-center">
                <img
                  className="vehiculo-foto-detalle"
                  src={vehiculo.foto}
                  alt="foto"
                />
              </div>
            </div>
            <div className="columna-2">
              <div className="">
                <div className="contenedor-detalle">
                  <h3>
                    Detalles
                  </h3>
                  <ul>
                    <li className="li-detalle">
                      <strong>Placa: </strong>
                      <span className="titulo-titulo">{vehiculo.placa}</span>
                    </li>
                    <li className="li-detalle">
                      <strong>Marca: </strong>
                      <span className="titulo-titulo">{vehiculo.marca}</span>
                    </li>
                    <li className="li-detalle">
                      <strong>Modelo: </strong>
                      <span className="titulo-titulo">{vehiculo.modelo}</span>
                    </li>
                    <li className="li-detalle">
                      <strong>Año: </strong>
                      <span className="titulo-titulo">{vehiculo.anio}</span>
                    </li>
                    <li className="li-detalle">
                      <strong>Combustible: </strong>
                      <span className="titulo-titulo">
                        {vehiculo.combustible}
                      </span>
                    </li>
                    <li className="li-detalle">
                      <strong>Asientos: </strong>
                      <span className="titulo-titulo">{vehiculo.asientos}</span>
                    </li>
                    <li className="li-detalle">
                      <strong>Manejo: </strong>
                      <span className="titulo-titulo">{vehiculo.manejo}</span>
                    </li>
                  </ul>
                  <h4>
                    Precio: <strong>S/.{vehiculo.precio}</strong> x día
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="contenedor-padre-adicional">
            <Consejos />
          </div>

          <div className="contenedor-formulario mx-auto">
            <div className="contenedor-hijo-adicional">
              <div className="container">
                <h4>Complete los datos:</h4>
                <form className="needs-validation" noValidate>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Nombres completos"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="ejemplo@hotmail.com"
                          required
                        />
                        <label htmlFor="name">Dirección:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Av. Cesar Ramirez, Lote 151"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Teléfono:</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="+51 976205154"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Apellidos:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Apellidos completos"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">País:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Perú"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Distrito:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Lima"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Telefono alternativo:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="+51 986521023"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <Fecha />
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <label className="form-check-label" id="mi-checkbox">
                      Acepto los terminos y condiciones
                    </label>
 
                  </div>

                  <button className="btn btn-dark">Enviar</button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
};

export default Vehiculo;
