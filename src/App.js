import { useEffect, useState } from "react";
import "./App.css";
import Novehiculos from "./components/Novehiculos";
import Navbar from "./components/Navbar";
import Vehiculos from "./components/Vehiculos";
import Spinner from "./components/Spinner";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Inicio from "./components/Inicio";
import Contactanos from "./components/Contactanos";
import Error from "./components/Error";
import Vehiculo from "./components/Vehiculo";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Registro from "./components/Registro";
import Whatsappflotante from "./components/Whatsappflotante";

//localhost:8080/alquilervehiculos/api/vehiculos

function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busquedaMarca, setBusquedaMarca] = useState("");

  useEffect(() => {
    fetch("http://192.168.1.40:8080/alquilervehiculos/api/vehiculos")
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((data) => {
        // Filtrar vehículos con estado en 1
        const vehiculosFiltrados = data.filter(
          (vehiculo) => vehiculo.estado === true
        );
        setVehiculos(vehiculosFiltrados);
        setCargando(false); // indicar que se ha terminado de cargar
      })
      .catch((error) => {
        console.error("Error al obtener los vehículos: ", error);
        //setCargando(false); // indicar que se ha terminado de cargar, aunque con error
      });
  }, []);

  const handleChangeMarca = (e) => {
    setBusquedaMarca(e.target.value);
  };

  const vehiculosFiltradosPorMarca = vehiculos.filter((vehiculo) =>
    vehiculo.marca.toLowerCase().includes(busquedaMarca.toLowerCase())
  );

  return (
    <>
      <>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Whatsappflotante />
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route
                path="/vehiculos"
                element={
                  <>
                    <div className="container-fluid p-5 bg-dark text-white text-center">
                      <h1>Nuestros vehículos</h1>
                      <p>
                        Aquí podrás ver todos nuestros vehículos a disposición.
                      </p>
                    </div>
                    <div className="contenedor-principal">
                      <div className="container">
                        <div className="row">
                          <h2 className="mt-3">Busque según su marca</h2>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleChangeMarca}
                            placeholder="Buscar por marca"
                          />
                          <h2 className="mt-3">
                            Se encontraron: {vehiculosFiltradosPorMarca.length}
                          </h2>
                        </div>
                      </div>
                      {cargando ? (
                        <Spinner />
                      ) : vehiculos.length > 0 ? (
                        <div className="contenedor-padre-vehiculos">
                          {vehiculosFiltradosPorMarca.map((vehiculo, index) => (
                            <Vehiculos
                              key={index}
                              id={vehiculo.id}
                              placa={vehiculo.placa}
                              asientos={vehiculo.asientos}
                              marca={vehiculo.marca}
                              modelo={vehiculo.modelo}
                              anio={vehiculo.anio}
                              precio={vehiculo.precio}
                              estado={vehiculo.estado}
                              foto={vehiculo.foto}
                              combustible={vehiculo.combustible}
                              manejo={vehiculo.manejo}
                            />
                          ))}
                        </div>
                      ) : (
                        <>
                          <Novehiculos />
                        </>
                      )}
                      {vehiculosFiltradosPorMarca.length > 0 ? null : (
                        <h4 className="m-5 d-flex align-items-center justify-content-center">
                          No se encontraron vehiculos del marca:
                          <strong> &nbsp;{busquedaMarca}</strong>&nbsp;☹️
                        </h4>
                      )}
                    </div>
                  </>
                }
              />
              <Route path="/contactanos" element={<Contactanos />} />
              <Route path="/vehiculos/:id" element={<Vehiculo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <>
              <Footer />
            </>
          </BrowserRouter>
        </div>
      </>
    </>
  );
}

export default App;
