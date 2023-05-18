import React, { useEffect, useState } from "react";
import "../styles/Vehiculos.css";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import "../styles/Vehiculos.css";

export const userContext = React.createContext();

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroMarca, setFiltroMarca] = useState("");

  useEffect(() => {
    const obtenerVehiculos = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.40:8080/alquilervehiculos/api/vehiculos",
          {
            headers: {
              Authorization: "Basic " + btoa("admin:123"),
            },
          }
        );
        const data = await response.json();
        setVehiculos(data);
        setTimeout(() => {
          setCargando(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerVehiculos();
  }, []);

  const handleFiltroMarcaChange = (event) => {
    setFiltroMarca(event.target.value);
  };

  const filteredVehiculos = vehiculos.filter((vehiculo) =>
    vehiculo.marca.marca.toLowerCase().includes(filtroMarca.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid p-5 contenedor-calidadeficiencia text-white text-center">
        <h1>Nuestros vehículos</h1>
        <p>Aquí podrás ver todos nuestros vehículos a disposición.</p>
      </div>

      <>
        {cargando ? (
          <Spinner />
        ) : (
          <div className="container">
            <div className="row">
              <h2 className="mt-3">Busque según su marca</h2>
              <input
                type="text"
                className="form-control"
                onChange={handleFiltroMarcaChange}
                placeholder="Buscar por marca"
              />
              <h2 className="mt-3">
                Se encontraron: {filteredVehiculos.length}
              </h2>
            </div>
            <div className="contenedor-padre-vehiculos">
              {filteredVehiculos.length > 0 ? (
                <>
                  {filteredVehiculos.map((vehiculo, index) => (
                    <div key={index}>
                      <>
                        <div className="contenedor-hijo-vehiculos contenedor-box-shadow">
                          <div className="imagen-caja">
                            <img
                              className="foto-vehiculos"
                              src={vehiculo.foto}
                              alt={vehiculo.marca.marca}
                            />
                          </div>
                          <div className="contenedor-padre-precio">
                            <div className="contenedor-precio">
                              <strong className="titulo-precio">
                                ${vehiculo.precio}
                              </strong>
                            </div>
                          </div>
                          <h5 className="text-center marca-text">
                            <strong className="titulo-titulo">
                              {vehiculo.marca.marca}
                            </strong>
                          </h5>
                          <h3 className="text-center">
                            <strong>{vehiculo.placa}</strong>
                          </h3>
                          <div className="boton-mas-detalles">
                            <Link to={`/vehiculos/${vehiculo.id}`}>
                              <button className="btn btn-dark col-12 btn-sm p-2">
                                Más detalles
                              </button>
                            </Link>
                          </div>
                        </div>
                      </>
                    </div>
                  ))}
                </>
              ) : (
                <h4 className="m-5 d-flex align-items-center justify-content-center">
                  No se encontraron vehiculos del marca:
                  <strong> &nbsp;{filtroMarca}</strong>&nbsp;☹️
                </h4>
              )}
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Vehiculos;
