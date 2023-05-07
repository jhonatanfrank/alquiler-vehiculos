import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Consejos from "./Consejos";
import "../styles/Vehiculo.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment/moment";
import jsPDF from "jspdf";
/* PAYPAL */
import { CLIENT_ID } from "../config/config.js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Vehiculo = () => {
  /* PAYPAL INICIO */
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  /* PAYPAL FIN */

  const [checkActivo, setCheckActivo] = useState(false);
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [terminosycondiciones, setTerminosycondiciones] = useState(false);
  const [resumenpago, setResumenpago] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("");
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [lugarrecojo, setLugarRecojo] = useState("");
  const [lugardevolucion, setLugarDevolucion] = useState("");
  const [vehiculo, setVehiculo] = useState(null);
  const [precioFinal, setPrecioFinal] = useState(0);
  const [precioVehiculo, setPrecioVehiculo] = useState(0);
  const [fecha1, setFecha1] = useState("");
  const [fecha2, setFecha2] = useState("");
  const [diferencia, setDiferencia] = useState(0);
  const [codigo, setCodigo] = useState("");

  /*
  const handleInputChange = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value });
    setFecha(event.target.value);
    console.log(fecha);
  };
  */

  /* Modal de Terminos y condiciones */
  const modalTerminosCondiciones = () => {
    setTerminosycondiciones(true);
  };

  /* Modal de Paypal */
  const modalPaypal = () => {
    setPaypal(true);
  };

  /* Modal de Resumen */
  const modalResumenPago = (event) => {};

  /*Check */
  const manejarCambioCheck = (evento) => {
    setCheckActivo(evento.target.checked);
  };

  /* Encontrando vehiculo x id */
  const params = useParams();
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
        setPrecioVehiculo(vehiculo.precio);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerVehiculo();
  }, [params.id]);

  /*Metodo CREAR*/
  useEffect(() => {
    const exportarPDF = () => {
      const doc = new jsPDF();
      const texto = `
    Código: ${codigo}
    Nombre: ${nombres}    
    Apellido: ${apellidos}
    Correo electrónico: ${email}
    País: ${pais}
    Distrito: ${distrito}
    Direccion: ${direccion}
    Telefono: ${telefono1}
    Telefono alternativo: ${telefono2}
    Fecha inicio: ${fecha1}
    Fecha fin: ${fecha2}
    Lugar recojo: ${lugarrecojo}
    Lugar devolucion: ${lugardevolucion}
  `;
      doc.text(texto, 10, 10);
      doc.save("ALQUILER " + codigo + " " + nombres + " " + apellidos + ".pdf");
    };

    const submitData = async () => {
      const alquilerUrl =
        "http://localhost:8080/alquilervehiculos/api/alquileres";
      const vehiculoUrl = `http://localhost:8080/alquilervehiculos/api/vehiculos/${vehiculo.id}`;

      const fecha1_c = new Date(fecha1);
      const fecha2_c = new Date(fecha2);

      const alquilerData = {
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        pais: pais,
        direccion: direccion,
        distrito: distrito,
        telefono1: telefono1,
        telefono2: telefono2,
        lugarrecojo: lugarrecojo,
        lugardevolucion: lugardevolucion,
        preciofinal: precioFinal,
        fechainicio: fecha1_c,
        fechafin: fecha2_c,
        vehiculo: {
          id: vehiculo.id,
        },
      };

      const vehiculoData = {
        estado: false,
      };

      const alquilerResponse = await fetch(alquilerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alquilerData),
      });

      const alquilerResponseData = await alquilerResponse.json();
      console.log(alquilerResponseData);

      const vehiculoResponse = await fetch(vehiculoUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehiculoData),
      });

      const vehiculoResponseData = await vehiculoResponse.json();
      console.log(vehiculoResponseData);
      setReservaExitosa(true);
    };

    if (success) {
      submitData();
      exportarPDF();
      console.log("Se guardó en la base de datos y se exportó PDF");
    }
  }, [success]);

  /*IDENTIFICADOR DE ALQUILER */
  const obtenerNombres = (event) => {
    setNombres(event.target.value);
  };

  const obtenerApellidos = (event) => {
    setApellidos(event.target.value);
  };

  const obtenerEmail = (event) => {
    setEmail(event.target.value);
  };

  const obtenerPais = (event) => {
    setPais(event.target.value);
  };

  const obtenerDistrito = (event) => {
    setDistrito(event.target.value);
  };

  const obtenerDireccion = (event) => {
    setDireccion(event.target.value);
  };

  const obtenerTelefono1 = (event) => {
    setTelefono1(event.target.value);
  };

  const obtenerTelefono2 = (event) => {
    setTelefono2(event.target.value);
  };

  const obtenerLugarRecojo = (event) => {
    setLugarRecojo(event.target.value);
  };

  const obtenerLugarDevolucion = (event) => {
    setLugarDevolucion(event.target.value);
  };

  useEffect(() => {
    if (fecha1 && fecha2) {
      const diff = moment(fecha2).diff(moment(fecha1), "days");
      setDiferencia(diff);
    }
  }, [fecha1, fecha2]);

  useEffect(() => {
    const nuevoCodigo = Math.floor(Math.random() * 100000000).toString();
    setCodigo(nuevoCodigo);
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF();
    const texto = `
    Código: ${codigo}
    Nombre: ${nombres}    
    Apellido: ${apellidos}
    Correo electrónico: ${email}
    País: ${pais}
    Distrito: ${distrito}
    Direccion: ${direccion}
    Telefono: ${telefono1}
    Telefono alternativo: ${telefono2}
    Fecha inicio: ${fecha1}
    Fecha fin: ${fecha2}
    Lugar recojo: ${lugarrecojo}
    Lugar devolucion: ${lugardevolucion}
  `;
    doc.text(texto, 10, 10);
    doc.save("ALQUILER " + codigo + " " + nombres + " " + apellidos + ".pdf");
  };

  /* PAYPAL INICIO */

  useEffect(() => {
    const paypal_precioFinal = precioVehiculo * diferencia;
    console.log(paypal_precioFinal);
    setPrecioFinal(paypal_precioFinal);
  }, [precioVehiculo, diferencia]);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: precioFinal,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      })
      .catch((error) => {
        console.log("Error al crear orden: ", error);
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      setShow(false);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("¡Tu pago con Paypal ha sido un éxito!");
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  /* PAYPAL FIN*/

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
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <label>Nombre:</label>
                      <input
                        type="text"
                        name="nombre"
                        className="form-control col-12"
                        value={nombres}
                        placeholder="Ingrese sus nombres"
                        onChange={obtenerNombres}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="name">Apellidos:</label>
                      <input
                        type="text"
                        name="apellidos"
                        className="form-control"
                        value={apellidos}
                        placeholder="Ingrese sus apellidos"
                        onChange={obtenerApellidos}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="name">Email:</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={email}
                        placeholder="Ingrese su Correo Electrónico"
                        onChange={obtenerEmail}
                      />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="name">Pais:</label>
                      <input
                        type="text"
                        name="pais"
                        className="form-control"
                        value={pais}
                        placeholder="Ingrese su país"
                        onChange={obtenerPais}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="name">Distrito:</label>
                      <input
                        type="text"
                        name="distrito"
                        className="form-control"
                        value={distrito}
                        placeholder="Ingrese su distrito"
                        onChange={obtenerDistrito}
                      />
                    </div>
                    <div className="col-md-7">
                      <label htmlFor="name">Direccion:</label>
                      <input
                        type="text"
                        name="direccion"
                        className="form-control"
                        value={direccion}
                        placeholder="Ingrese su dirección"
                        onChange={obtenerDireccion}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="name">Telefono:</label>
                      <input
                        type="text"
                        name="telefono"
                        className="form-control"
                        value={telefono1}
                        placeholder="Ingrese su telefono"
                        onChange={obtenerTelefono1}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="name">Telefono alternativo:</label>
                      <input
                        type="text"
                        name="telefonoalternativo"
                        className="form-control"
                        placeholder="Ingrese un número alternativo"
                        value={telefono2}
                        onChange={obtenerTelefono2}
                      />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="name">Fecha inicio:</label>
                      <input
                        id="fecha1"
                        type="date"
                        name="fechainicio"
                        className="form-control"
                        value={fecha1}
                        onChange={(e) => setFecha1(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="name">Fecha fin:</label>
                      <input
                        id="fecha2"
                        type="date"
                        name="fechafin"
                        className="form-control"
                        value={fecha2}
                        onChange={(e) => setFecha2(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="name">Lugar recojo:</label>
                      <input
                        type="text"
                        name="lugarrecojo"
                        className="form-control"
                        value={lugarrecojo}
                        placeholder="Ingrese en donde va recoger el carro"
                        onChange={obtenerLugarRecojo}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="name">Lugar devolucion:</label>
                      <input
                        type="text"
                        name="lugardevolucion"
                        className="form-control"
                        value={lugardevolucion}
                        placeholder="Ingrese en donde va devolver el carro"
                        onChange={obtenerLugarDevolucion}
                      />
                    </div>
                  </div>

                  <div className="form-check mt-3">
                    <input
                      type="checkbox"
                      id="mi-checkbox"
                      className="form-check-input"
                      checked={checkActivo}
                      onChange={manejarCambioCheck}
                    />
                    <label>
                      Acepto los
                      <strong onClick={modalTerminosCondiciones}>
                        &nbsp;Términos y Condiciones
                      </strong>
                    </label>
                  </div>
                </form>

                <button
                  disabled={!checkActivo}
                  className="btn btn-dark"
                  onClick={modalPaypal}
                >
                  Siguiente
                </button>

                <Modal
                  size="xl"
                  show={terminosycondiciones}
                  onHide={() => setTerminosycondiciones(false)}
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
                      onClick={() => setTerminosycondiciones(false)}
                    >
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal size="xl" show={paypal} onHide={() => setPaypal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {!success ? (
                        <h1 className="titulo-titulo">Resumen de alquiler</h1>
                      ) : (
                        <h1 className="titulo-titulo">
                          ¡Gracias por confiar en nosotros!
                        </h1>
                      )}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <>
                      <PayPalScriptProvider
                        options={{ "client-id": CLIENT_ID }}
                      >
                        <div>
                          <>
                            <div>
                              {!success ? (
                                <>
                                  <div className="row">
                                    <div className="col">
                                      <ul>
                                        <li>
                                          <strong>Nombres: </strong>
                                          <span className="titulo-titulo">
                                            {nombres}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Apellidos: </strong>
                                          <span className="titulo-titulo">
                                            {apellidos}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Pais: </strong>
                                          <span className="titulo-titulo">
                                            {pais}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Distrito: </strong>
                                          <span className="titulo-titulo">
                                            {distrito}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Correo electronico: </strong>
                                          <span className="titulo-titulo">
                                            {email}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Direccion: </strong>
                                          <span className="titulo-titulo">
                                            {direccion}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Telefono: </strong>
                                          <span className="titulo-titulo">
                                            {telefono1}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>
                                            Telefono alternativo:{" "}
                                          </strong>
                                          <span className="titulo-titulo">
                                            {telefono2}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Fecha inicio: </strong>
                                          <span className="titulo-titulo">
                                            {fecha1}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Fecha fin: </strong>
                                          <span className="titulo-titulo">
                                            {fecha2}
                                          </span>
                                        </li>
                                        <li>
                                          <strong>Dias de alquiler: </strong>
                                          <span className="titulo-titulo">
                                            {diferencia}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col">
                                      <li>
                                        <strong>Placa: </strong>
                                        <span className="titulo-titulo">
                                          {vehiculo.placa}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Asientos: </strong>
                                        <span className="titulo-titulo">
                                          {vehiculo.asientos}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Marca: </strong>
                                        <span className="titulo-titulo">
                                          {vehiculo.marca}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Modelo: </strong>
                                        <span className="titulo-titulo">
                                          {vehiculo.modelo}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Año: </strong>
                                        <span className="titulo-titulo">
                                          {vehiculo.anio}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Combustible: </strong>
                                        <span className="titulo-titulo">
                                          {vehiculo.combustible}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Manejo: </strong>

                                        <span className="titulo-titulo">
                                          {vehiculo.manejo}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Lugar de devolucion: </strong>

                                        <span className="titulo-titulo">
                                          {lugarrecojo}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Lugar de devolucion: </strong>
                                        <span className="titulo-titulo">
                                          {lugardevolucion}
                                        </span>
                                      </li>
                                      <br />
                                      <h1>
                                        <strong>
                                          PRECIO FINAL: S/.
                                          {precioFinal}
                                        </strong>
                                      </h1>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </>
                          <div className="wrapper">
                            <div className="product-info">
                              <div className="product-price-btn">
                                <p className="titulo-titulo"></p>
                                <br></br>
                                {success ? (
                                  <>
                                    <section>
                                      <h1 className="titulo-titulo">
                                        ¡Pago exitoso!
                                      </h1>
                                      <p className="titulo-titulo">
                                        Se acaba de descargar automaticamente el
                                        resumen de tu alquiler en tu computador.
                                        Si tienes bloqueado las descargas
                                        automaticas, desbloquealas. En caso
                                        contrario, puedes darle click al botón
                                        de "Exportar PDF", para que puedas tener
                                        una copia.
                                      </p>
                                      <p className="titulo-titulo">
                                        Recuerda traer el PDF al momento de
                                        recoger tu vehículo.
                                      </p>
                                      <button
                                        className="btn btn-dark"
                                        onClick={exportarPDF}
                                      >
                                        Exportar PDF
                                      </button>
                                    </section>
                                  </>
                                ) : (
                                  <button
                                    className="buy-btn btn btn-dark"
                                    type="submit"
                                    onClick={() => setShow(true)}
                                  >
                                    ¡Cancelar ahora!
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <br></br>

                          {show ? (
                            <section>
                              <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={createOrder}
                                onApprove={onApprove}
                              />
                            </section>
                          ) : null}
                        </div>
                      </PayPalScriptProvider>
                    </>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setTerminosycondiciones(false)}
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
