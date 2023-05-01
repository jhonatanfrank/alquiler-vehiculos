import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Consejos from "./Consejos";
import "../styles/Vehiculo.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const Vehiculo = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [datos, setDatos] = useState({});
  const [showModal2, setShowModal2] = useState(false);

  const [fecha, setFecha] = useState("");

  const handleInputChange = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value });
    setFecha(event.target.value);
    console.log(fecha)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal2(true);
  };

  /**Terminos y condiciones */
  const handleLabelClick = () => {
    setShowModal(true);
  };

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
            <h1>!Resérvalo aquí!</h1>
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
                  <h3>Detalles</h3>
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

          <Consejos />

          <div className="contenedor-formulario contenedor-box-shadow mx-auto">
            <div className="contenedor-hijo-adicional">
              <div className="container">
                <h4>Complete los datos:</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                          type="text"
                          name="nombre"
                          className="form-control"
                          placeholder="Nombres completos"
                          value={datos.nombre || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Email:</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="Correo Electronico"
                          value={datos.email || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Direccion:</label>
                        <input
                          type="text"
                          name="direccion"
                          className="form-control"
                          placeholder="Dirección"
                          value={datos.direccion || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Telefono:</label>
                        <input
                          type="text"
                          name="telefono"
                          className="form-control"
                          placeholder="Telefono"
                          value={datos.telefono || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Apellidos:</label>
                        <input
                          type="text"
                          name="apellidos"
                          className="form-control"
                          placeholder="Apellidos"
                          value={datos.apellidos || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Pais:</label>
                        <input
                          type="text"
                          name="pais"
                          className="form-control"
                          placeholder="pais"
                          value={datos.pais || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Distrito:</label>
                        <input
                          type="text"
                          name="distrito"
                          className="form-control"
                          placeholder="Distrito"
                          value={datos.distrito || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Telefono alternativo:</label>
                        <input
                          type="text"
                          name="telefonoalternativo"
                          className="form-control"
                          placeholder="Telefono Alternativo"
                          value={datos.telefonoalternativo || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Fecha inicio:</label>
                        <input
                          type="date"
                          name="fechainicio"
                          className="form-control"
                          value={datos.fechainicio || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Fecha fin:</label>
                        <input
                          type="date"
                          name="fechafin"
                          className="form-control"
                          value={datos.fechafin || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Lugar recojo:</label>
                        <input
                          type="text"
                          name="lugarrecojo"
                          className="form-control"
                          placeholder="Lugar recojo"
                          value={datos.lugarrecojo || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Lugar devolucion:</label>
                        <input
                          type="text"
                          name="lugardevolucion"
                          className="form-control"
                          placeholder="Lugar devolucion"
                          value={datos.lugardevolucion || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <label>
                      Acepto los
                      <strong onClick={handleLabelClick}>
                        &nbsp;Términos y Condiciones
                      </strong>
                    </label>
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Siguiente
                  </button>
                </form>
                <Modal
                  size="xl"
                  show={showModal2}
                  onHide={() => setShowModal2(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Resumen de datos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <ul>
                            <li>Nombres: {datos.nombre}</li>
                            <li>Apellidos: {datos.apellidos}</li>
                            <li>Pais: {datos.pais}</li>
                            <li>Distrito: {datos.distrito}</li>
                            <li>Correo electronico: {datos.email}</li>
                            <li>Direccion: {datos.direccion}</li>
                            <li>Telefono: {datos.telefono}</li>
                            <li>
                              Telefono alternativo: {datos.telefonoalternativo}
                            </li>
                            <li>Fecha inicio: {datos.fechainicio}</li>
                            <li>Fecha fin: {datos.fechafin}</li>
                            <li>Dias de alquiler: {}</li>
                          </ul>
                        </div>
                        <div className="col">
                          <li>Placa: {vehiculo.placa}</li>
                          <li>Asientos: {vehiculo.asientos}</li>
                          <li>Marca: {vehiculo.marca}</li>
                          <li>Modelo: {vehiculo.modelo}</li>
                          <li>Año: {vehiculo.anio}</li>
                          <li>Combustible: {vehiculo.combustible}</li>
                          <li>Manejo: {vehiculo.manejo}</li>
                          <li>Lugar de recojo: {datos.lugarrecojo}</li>
                          <li>Lugar de devolucion: {datos.lugardevolucion}</li>
                          <br />
                          <h5>
                            <strong>PRECIO:</strong> S/. {}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal2(false)}
                    >
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  size="xl"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <strong>Terminos y Condiciones</strong>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h3>
                      Antes de continuar con tu pago, lee nuestras condiciones:
                    </h3>
                    <ol>
                      <li>
                        Si desea realizar alguna cancelación, cambio de horario,
                        vehiculo u otro, debe acercarse personalmente a las
                        oficinas de Rent Car´s ubicada en Av. Cesar Vallejo
                        cruce con Av. Jorge Chavez, cuadra 50.
                      </li>
                      <li>
                        Al momento de usted recibir el vehiculo solicitado, debe
                        de firmar las hojas que le entregará nuestro personal de
                        flota, en el cual está detallada como se le está dejando
                        el vehiculo, tanto al interior, como al exterior,
                        herramientas, accesorios, funcionalidades, etc.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis maxime dolore labore, earum nisi nesciunt corporis
                        minima illo nam dolores, impedit molestias culpa
                        eveniet, inventore quas repudiandae necessitatibus!
                        Unde, ipsam. Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Explicabo possimus labore esse quas
                        recusandae quaerat itaque a, repellendus inventore
                        soluta cumque numquam id commodi, minima praesentium
                        corporis debitis ipsam dolor. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Doloremque ducimus aliquam
                        laudantium totam laborum ut saepe, asperiores, nesciunt
                        quasi consectetur non repudiandae accusamus. Dolorem,
                        omnis quisquam! Itaque asperiores nesciunt libero.
                      </li>
                      <li>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Tempora ab hic error cupiditate sit in sequi at
                        unde a dolorem aut, perferendis ut non molestiae nemo
                        inventore asperiores. Voluptatum, sit! Lorem ipsum dolor
                        sit amet consectetur adipisicing elit. Non, quam
                        pariatur possimus architecto hic tempora nam eaque
                        veritatis, earum quas commodi dolores illum ratione
                        exercitationem nesciunt unde quia ducimus iure! Lorem
                        ipsum dolor sit amet consectetur, adipisicing elit.
                        Molestiae soluta similique, iure temporibus excepturi
                        dicta aliquam voluptatum explicabo voluptas provident
                        adipisci ex quasi eaque inventore! Eius nemo beatae
                        necessitatibus explicabo!
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dicta quisquam, fugit, architecto non quasi
                        reprehenderit pariatur ab, ipsa sunt numquam cumque.
                        Fuga in animi facilis officiis inventore. Explicabo,
                        consectetur exercitationem. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Commodi hic soluta itaque
                        magni id, architecto quam blanditiis in labore
                        excepturi, doloremque inventore laborum! Commodi, cumque
                        animi? Dolorem, assumenda fugiat? Nobis! Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Blanditiis
                        illum dolorum, aliquam quam possimus amet at qui odit a
                        quia sapiente sunt maxime mollitia quos delectus sed,
                        eligendi quod autem.
                      </li>
                    </ol>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
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
