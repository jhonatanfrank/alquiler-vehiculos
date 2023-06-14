import React, { useEffect, useState } from "react";
import "../styles/Vehiculos.css";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import "../styles/Vehiculos.css";

const Vehiculos = () => {
  const [cuponesDescuentos, setCuponesDescuentos] = useState([]);
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);

  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroMarca, setFiltroMarca] = useState("");
  const [vehiculosMostrados, setVehiculosMostrados] = useState([]);
  const [rangoprecio, setRangoprecio] = useState(250);
  const [tipoManejo, setTipoManejo] = useState({
    mecanico: true,
    automatico: true,
  });
  const [tipoCombustible, setTipoCombustible] = useState({
    glp: true,
    gnv: true,
    premium: true,
    regular: true,
  });

  useEffect(() => {
    const obtenerCuponesDescuentos = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/alquilervehiculos/api/cuponesdescuentos",
          {
            headers: {
              Authorization: "Basic " + btoa("admin:123"),
            },
          }
        );
        const data = await response.json();
        setCuponesDescuentos(data);
        console.log(data); // Mostrar los datos en la consola
        console.log(typeof data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerCuponesDescuentos();

    const interval = setInterval(() => {
      obtenerCuponesDescuentos();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(() => {
      obtenerVehiculos();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const vehiculosFiltrados = vehiculos.filter(
      (vehiculo) => vehiculo.estado !== 4 && vehiculo.precio <= rangoprecio
    );
    setVehiculosMostrados(vehiculosFiltrados);
  }, [vehiculos, rangoprecio]);

  const handleFiltroMarcaChange = (event) => {
    setFiltroMarca(event.target.value);
  };

  const handleChange = (event) => {
    setRangoprecio(parseInt(event.target.value));
  };

  const handleTipoManejoChange = (event) => {
    const { name, checked } = event.target;
    setTipoManejo((prevTipoManejo) => ({
      ...prevTipoManejo,
      [name]: checked,
    }));
  };

  const filteredVehiculos = vehiculosMostrados
    .filter((vehiculo) =>
      vehiculo.marca.marca.toLowerCase().includes(filtroMarca.toLowerCase())
    )
    .filter((vehiculo) => {
      if (tipoManejo.mecanico && vehiculo.tipomanejo.id === 1) {
        return true;
      }
      if (tipoManejo.automatico && vehiculo.tipomanejo.id === 2) {
        return true;
      }
      return false;
    })
    .filter((vehiculo) => {
      if (
        (tipoCombustible.glp && vehiculo.tipocombustible.id === 1) ||
        (tipoCombustible.gnv && vehiculo.tipocombustible.id === 2) ||
        (tipoCombustible.premium && vehiculo.tipocombustible.id === 3) ||
        (tipoCombustible.regular && vehiculo.tipocombustible.id === 4)
      ) {
        return true;
      }
      return false;
    });

  const handleTipoCombustibleChange = (event) => {
    const { name, checked } = event.target;
    setTipoCombustible((prevTipoCombustible) => ({
      ...prevTipoCombustible,
      [name]: checked,
    }));
  };

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
          <>
            <div className="container">
              <div className="row">
                <div className="col-xxl-3 col-xl-3 col-lg-12 col-md-12 col-sm-12 mt-5 mb-5">
                  <h4 className="titulo-titulo">Filtros:</h4>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <div>
                            <h5>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="black"
                                className="bi bi-car-front-fill mr-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                              </svg>
                              Marca
                            </h5>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                onChange={handleFiltroMarcaChange}
                                placeholder="Buscar por marca"
                              />
                              <div className="input-group-append">
                                <span className="input-group-text">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="black"
                                    className="bi bi-binoculars-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <div>
                              <h5>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="black"
                                  className="bi bi-fuel-pump-diesel-fill mr-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4.974 9.806h.692c.306 0 .556.063.75.19.198.127.343.317.437.568.096.252.144.565.144.941 0 .284-.027.53-.083.74-.053.21-.133.386-.241.528a.986.986 0 0 1-.412.315 1.575 1.575 0 0 1-.595.103h-.692V9.806Z" />
                                  <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1c.564 0 1.034.11 1.412.336.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V2Zm2 .5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5ZM4 9v5h1.796c.496 0 .906-.099 1.23-.297.327-.197.571-.484.732-.86.161-.377.242-.828.242-1.356 0-.525-.08-.973-.242-1.344a1.775 1.775 0 0 0-.725-.85C6.71 9.098 6.296 9 5.796 9H4Z" />
                                </svg>
                                Tipo de combustible
                              </h5>
                            </div>
                            <div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="glp"
                                  checked={tipoCombustible.glp}
                                  onChange={handleTipoCombustibleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  GLP
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="gnv"
                                  checked={tipoCombustible.gnv}
                                  onChange={handleTipoCombustibleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckChecked"
                                >
                                  GNV
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="premium"
                                  checked={tipoCombustible.premium}
                                  onChange={handleTipoCombustibleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckChecked"
                                >
                                  Premium
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="regular"
                                  checked={tipoCombustible.regular}
                                  onChange={handleTipoCombustibleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckChecked"
                                >
                                  Regular
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <h5>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="black"
                                className="bi bi-currency-exchange mr-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z" />
                              </svg>
                              Precio
                            </h5>
                            <input
                              className="form-range"
                              type="range"
                              min="100"
                              max="250"
                              value={rangoprecio}
                              onChange={handleChange}
                            />
                            <p className="titulo-titulo parrafo-filtro">
                              Rango de <span className="span-span">$100</span> a{" "}
                              <span className="span-span">${rangoprecio}</span>
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <h5>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="black"
                                className="bi bi-geo-fill mr-2"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                                />
                              </svg>
                              Tipo de manejo
                            </h5>
                            <div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="mecanico"
                                  checked={tipoManejo.mecanico}
                                  onChange={handleTipoManejoChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  Mecánico
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="automatico"
                                  checked={tipoManejo.automatico}
                                  onChange={handleTipoManejoChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckChecked"
                                >
                                  Automático
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>
                            <h5>
                              Se encontraron: {filteredVehiculos.length}{" "}
                              vehículos
                            </h5>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-xxl-9 col-xl-9 col-lg-12 col-md-12 col-sm-12">
                  <div className="contenedor-padre-vehiculos">
                    {filteredVehiculos.length > 0 ? (
                      <>
                        {filteredVehiculos.map((vehiculo, index) => (
                          <div key={index}>
                            <>
                              <div className="contenedor-hijo-vehiculos contenedor-box-shadow">
                                {cuponesDescuentos.some(
                                  (cupon) => cupon.vehiculo.id === vehiculo.id
                                ) ? (
                                  <div className="container-cupon text-right">
                                    DESCUENTO DEL{" "}
                                    {cuponesDescuentos.find(
                                      (cupon) =>
                                        cupon.vehiculo.id === vehiculo.id
                                    ).porcentajedescuento * 100}
                                    % CON CUPÓN
                                  </div>
                                ) : null}

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
                                      ${vehiculo.precio} al día
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
                      <>
                        <h4 className="m-5 d-flex align-items-center justify-content-center">
                          No se encontraron vehículos según tu filtro ☹️
                        </h4>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default Vehiculos;
