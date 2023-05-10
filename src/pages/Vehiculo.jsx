import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Vehiculodetails from "../components/Vehiculodetails";
import Consejos from "../components/Consejos";
import Alquileresfecha from "./Alquileresfecha";

import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import "../styles/Vehiculo.css";
import { CLIENT_ID } from "../config/config.js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
/*INICIO CALENDARIO */
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { parseISO } from "date-fns/esm";
/*FIN CALENDARIO */

const Vehiculo = () => {
  /* CALENDARIO INICIO */
  const [dates, setDates] = useState([]);
  const [diferencia1, setDiferencia1] = useState(0);
  const [finicio, setFinicio] = useState("");
  const [ffin, setFfin] = useState("");
  const [estadofechas, setEstadofechas] = useState(false);
  const [estadoalquileres, setEstadoalquileres] = useState(false);
  const [placa, setPlaca] = useState(true);

  /* calendario */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSave = () => {
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;
    const startISOString = startDate.toISOString().slice(0, 19);
    const endISOString = endDate.toISOString().slice(0, 19);
    const range = `${startISOString} - ${endISOString}`;
    const duration =
      Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    setDiferencia1(duration);
    setEstadofechas(true);
    setRangeText(`${range} (${duration} días)`);
    setFinicio(startISOString);
    setFfin(endISOString);
  };

  const [rangeText, setRangeText] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:8080/alquilervehiculos/api/alquileres/vehiculo/${placa}`
    )
      .then((response) => response.json())
      .then((data) => setDates(data))
      .then(setEstadoalquileres(true))
      .catch((error) => console.log(error));
  }, [placa]);

  const blockedDates = dates
    .map((date) => {
      const startDate = new Date(date.fechainicio);
      const endDate = new Date(date.fechafin);
      const oneDay = 24 * 60 * 60 * 1000; // milisegundos en un día
      const endDateOne = new Date(endDate.getTime() + oneDay);
      const startDateOne = new Date(startDate.getTime() - oneDay);
      const datesArray = [];
      for (
        let date = startDateOne;
        date <= endDateOne;
        date.setDate(date.getDate() + 1)
      ) {
        datesArray.push(new Date(date));
      }
      return datesArray;
    })
    .flat();

  const allBlockedDates = [...blockedDates];

  /*CALENDARIO FIN*/

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
  const [alquiler, setAlquiler] = useState({});
  const [cargando, setCargando] = useState(true);

  /* Modal de Terminos y condiciones */
  const modalTerminosCondiciones = () => {
    setTerminosycondiciones(true);
  };

  /* Modal de Paypal */
  const modalPaypal = () => {
    const form = document.getElementById("miFormulario");

    if (!form.checkValidity() || !estadofechas) {
      // si el formulario es inválido, mostrar un mensaje de error o hacer algo aquí
      alert("Por favor llena todos los campos y selecciona un rango de fechas");
    } else {
      // si el formulario es válido, hacer algo aquí
      setPaypal(true);
    }
  };

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
        setPlaca(vehiculo.placa);
        setVehiculo(vehiculo);

        setTimeout(() => {
          setCargando(false);
        }, 1000);

        setPrecioVehiculo(vehiculo.precio);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerVehiculo();
  }, [params.id]);

  /*Metodo CREAR*/
  useEffect(() => {
    const submitData = async () => {
      const alquilerUrl =
        "http://localhost:8080/alquilervehiculos/api/alquileres";
      const vehiculoUrl = `http://localhost:8080/alquilervehiculos/api/vehiculos/${vehiculo.id}`;

      const fecha1_c = new Date(finicio);
      const fecha2_c = new Date(ffin);

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

      /*
      const vehiculoResponse = await fetch(vehiculoUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehiculoData),
      });    

      const vehiculoResponseData = await vehiculoResponse.json();
      console.log(vehiculoResponseData);
      */
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
    const nuevoCodigo = Math.floor(Math.random() * 100000000).toString();
    setCodigo(nuevoCodigo);
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF();
    const texto = `
    CÓDIGO DEL ALQUILER: ${codigo}

    DATOS DEL ARRENDATARIO:
    <h2>Nombre: ${nombres}</h2>
    Apellido: ${apellidos}
    Correo electrónico: ${email}
    País: ${pais}
    Distrito: ${distrito}
    Direccion: ${direccion}
    Telefono: ${telefono1}
    Telefono alternativo: ${telefono2}

    DATOS DEL VEHICULO:
    Placa: ${vehiculo.placa}
    Asientos: ${vehiculo.asientos}
    Marca: ${vehiculo.marca.marca}
    Modelo: ${vehiculo.modelo}
    Año: ${vehiculo.anio}
    Tipo de combustible: ${vehiculo.tipocombustible.tipocombustible}
    Tipo de manejo: ${vehiculo.tipomanejo.tipomanejo}

    FECHAS DEL ALQUILER:
    Fecha inicio: ${finicio}
    Fecha fin: ${ffin}

    LUGAR DE ROCOJO Y DEVOLUCION:
    Lugar recojo: ${lugarrecojo}
    Lugar devolucion: ${lugardevolucion}
  `;
    doc.text(texto, 10, 10);
    doc.save("ALQUILER " + codigo + " " + nombres + " " + apellidos + ".pdf");
  };

  /* PAYPAL INICIO */
  useEffect(() => {
    const paypal_precioFinal = precioVehiculo * diferencia1;
    console.log(paypal_precioFinal);
    setPrecioFinal(paypal_precioFinal);
  }, [precioVehiculo, diferencia1]);

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

  /*INICIO HORA, MINUTOS, SEGUNDOS 

  const horaMinutosSegundos = () => {
    const time = new Date();
    const hours = time.getHours().toString().padStart(2, "0"); // Agrega un cero si la hora es de un solo dígito
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}${minutes}${seconds}`;
  };
*/

  /*
const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
const fechaFormateada = new Date(finicio).toLocaleDateString('es-ES', options);
*/

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

          <Vehiculodetails
            placa={vehiculo.placa}
            asientos={vehiculo.asientos}
            marca={vehiculo.marca.marca}
            modelo={vehiculo.modelo}
            anio={vehiculo.anio}
            precio={vehiculo.precio}
            foto={vehiculo.foto}
            tipocombustible={vehiculo.tipocombustible.tipocombustible}
            tipomanejo={vehiculo.tipomanejo.tipomanejo}
            descripcion={vehiculo.descripcion}
            tapizadoasientos={vehiculo.tapizadoasientos.tapizadoasientos}
            vehiculo={vehiculo}
          />

          <Consejos />

          <div className="container contenedor-fechas">
            <div className="row">
              <div className="col-12">
                <section>
                  <h3>
                    ¡Elije las fechas que deseas alquilar tu vehiculo aquí!
                  </h3>
                  <div>
                    <strong>
                      <span className="alert-aviso">
                        *Si las fechas en el calendario te salen de color plomo
                        y no las puedes seleccionar, es por que esas fechas el
                        vehículo ya está en reserva*
                      </span>
                    </strong>
                  </div>
                </section>
              </div>

              <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                <Alquileresfecha placa={vehiculo.placa} />
              </div>
              <div className="col-md-6 col-sm-12">
                <section>
                  <DateRange
                    ranges={dateRange}
                    onChange={handleSelect}
                    disabledDates={allBlockedDates}
                    showDateDisplay={true}
                  />
                  <div>
                    <button
                      onClick={handleSave}
                      className="save-button btn btn-dark col-6"
                    >
                      Guardar
                    </button>
                  </div>
                  <hr />

                  {estadofechas ? (
                    <>
                      <div className="titulo-titulo">
                        <strong>Fecha inicio seleccionada:</strong>{" "}
                        {new Date(finicio).toISOString().substring(0, 10)}
                      </div>
                      <div className="titulo-titulo">
                        <strong>Fecha fin seleccionada:</strong>{" "}
                        {new Date(ffin).toISOString().substring(0, 10)}
                      </div>
                      <div className="titulo-titulo">
                        <strong>Dias de alquiler:</strong> {diferencia1}
                      </div>
                    </>
                  ) : (
                    <div>
                      <strong>
                        <span className="alert-aviso">
                          *Selecciona mediante el calendario el rango de fechas
                          en el que deseas alquilar nuestro vehículo.*
                        </span>
                      </strong>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>

          <></>

          <div className="contenedor-formulario contenedor-box-shadow mx-auto">
            <div className="contenedor-hijo-adicional">
              <div className="container">
                <h4>Complete los datos:</h4>
                <form id="miFormulario">
                  <div className="row">
                    <div className="col-md-4">
                      <label>Nombres:</label>
                      <input
                        id="nombres"
                        type="text"
                        name="nombres"
                        className="form-control col-12"
                        value={nombres}
                        placeholder="Ingrese sus nombres"
                        onChange={obtenerNombres}
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="name">Lugar recojo:</label>
                      <input
                        type="text"
                        name="lugarrecojo"
                        className="form-control"
                        value={lugarrecojo}
                        placeholder="Ingrese en donde va recoger el carro"
                        onChange={obtenerLugarRecojo}
                        required
                      />
                    </div>
                    <div className="col-md-3">
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
                      Acepto que he leído los
                      <strong onClick={modalTerminosCondiciones}>
                        &nbsp;Términos y Condiciones
                      </strong>
                    </label>
                  </div>
                  <div>
                    <button
                      type="button"
                      disabled={!checkActivo}
                      className="btn btn-dark"
                      onClick={modalPaypal}
                    >
                      Siguiente
                    </button>
                  </div>
                </form>

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
                        El arrendador se compromete a entregar el vehículo en
                        buen estado y en condiciones de ser utilizado de manera
                        segura durante el período de alquiler.
                      </li>
                      <li>
                        El arrendatario acepta que cualquier daño causado al
                        vehículo durante el período de alquiler será su
                        responsabilidad y que se le cobrará el costo total de
                        las reparaciones necesarias. El arrendatario también se
                        compromete a cumplir con todas las leyes y regulaciones
                        de tráfico aplicables durante el período de alquiler.
                      </li>
                      <li>
                        El arrendatario acepta que el vehículo es propiedad
                        exclusiva del arrendador y que no tiene derecho a
                        vender, transferir, hipotecar o gravar el vehículo de
                        ninguna manera durante el período de alquiler.
                      </li>
                      <li>
                        El arrendador no será responsable por ningún daño o
                        pérdida de propiedad personal del arrendatario que
                        ocurra durante el período de alquiler.
                      </li>
                      <li>
                        Al aceptar estos términos y condiciones, el arrendatario
                        acepta cumplir con todas las obligaciones y
                        responsabilidades establecidas en este contrato.
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

                <Modal size="lg" show={paypal} onHide={() => setPaypal(false)}>
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
                                  <div className="row d-flex justify-content-center align-items-center">
                                    <div className="container contenedor-resumen">
                                      <div className="row">
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Nombres</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {nombres}
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Apellidos</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {apellidos}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Correo electrónico</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {email}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>País</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {pais}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Distrito</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {distrito}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Dirección</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {direccion}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Telefono</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {telefono1}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Telefono alternativo</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {telefono2}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Fecha inicio</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {finicio}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Fecha fin</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {ffin}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Días alquiler</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {diferencia1}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Placa</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {vehiculo.placa}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Asientos</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {vehiculo.asientos}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Marca</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {vehiculo.marca.marca}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Modelo</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {vehiculo.modelo}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Año</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {vehiculo.anio}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Tipo de combustible</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {
                                            vehiculo.tipocombustible
                                              .tipocombustible
                                          }
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Tipo de manejo</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {vehiculo.tipomanejo.tipomanejo}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Lugar de recojo</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {lugarrecojo}
                                        </div>{" "}
                                        <div className="col-md-4 col-sm-12">
                                          <strong>Lugar de devolución</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                          {lugardevolucion}
                                        </div>
                                        <hr />
                                        <div className="col-md-6 col-sm-6">
                                          <strong>Total a pagar:</strong>
                                        </div>
                                        <div className="titulo-titulo col-md-6 col-sm-6 d-flex justify-content-end">
                                          <div className="contenedor-padre-precio-vehiculo-resumen">
                                            <div className="contenedor-precio-vehiculo-resumen">
                                              <strong className="titulo-precio-vehiculo-resumen">
                                                ${precioFinal}
                                              </strong>
                                            </div>
                                          </div>
                                        </div>{" "}
                                      </div>
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
                                    <section className="section">
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
                                  <>
                                    <div className="container d-flex justify-content-center align-items-center">
                                      <button
                                        className="buy-btn btn btn-dark col-6"
                                        type="submit"
                                        onClick={() => setShow(true)}
                                      >
                                        ¡Cancelar ahora!
                                      </button>
                                    </div>
                                  </>
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
                      onClick={() => setPaypal(false)}
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
