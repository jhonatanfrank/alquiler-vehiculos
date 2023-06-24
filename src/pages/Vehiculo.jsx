import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Vehiculodetails from "../components/Vehiculodetails";
import { Link } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import "../styles/Vehiculo.css";
import { CLIENT_ID } from "../config/config.js";
import Swal from "sweetalert2";

/*INICIO PAYPAL*/
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
/*FIN PAYPAL*/

/*INICIO CALENDARIO */
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
/*FIN CALENDARIO */

const Vehiculo = () => {
  const [email2, setEmail2] = useState("");
  const [nuevopreciofinal, setNuevopreciofinal] = useState(0);
  const [estadoBoton, setEstadoBoton] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [estadoCodigoDescuento, setEstadoCodigoDescuento] = useState(false);
  const [cuponesDescuentos, setCuponesDescuentos] = useState([]);
  const [descuento, setDescuento] = useState([]);
  const [codigoDescuento, setCodigoDescuento] = useState("");

  /* CALENDARIO INICIO */
  const [dates, setDates] = useState([]);
  const [diferencia1, setDiferencia1] = useState(0);
  const [finicio, setFinicio] = useState("");
  const [ffin, setFfin] = useState("");
  const [estadofechas, setEstadofechas] = useState(false);
  const [estadoalquileres, setEstadoalquileres] = useState(false);
  const [placa, setPlaca] = useState(true);
  const [idVehiculo, setIdVehiculo] = useState(0);

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
    setEstadoBoton(true);
  };

  const [rangeText, setRangeText] = useState("");

  useEffect(() => {
    const fetchCuponesDescuentos = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/alquilervehiculos/api/cuponesdescuentos/",
          {
            headers: {
              Authorization:
                "Basic " + btoa("administrador@rentcars.pe:@Frank123"), // Reemplaza con las credenciales correctas
            },
          }
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener los cupones de descuento");
        }
        const data = await response.json();
        const filteredData = data.filter(
          (item) => item.vehiculo.id === idVehiculo
        ); // Filtra los datos por el campo vehiculo.id
        console.log(filteredData); // Muestra los datos filtrados en la consola

        const codigosDescuento = filteredData.map(
          (item) => item.codigodescuento
        ); // Obtiene solo los valores del campo codigodescuento
        console.log(codigosDescuento); // Muestra los códigos de descuento en la consola

        // Asigna el valor del primer elemento del arreglo codigosDescuento al estado codigoDescuento
        setCodigoDescuento(codigosDescuento[0]);
        console.log("el codigo es " + typeof codigoDescuento);

        if (codigoDescuento === "ZZZj987") {
          console.log("son iguales");
        } else {
          console.log("son diferentes");
        }

        const porcentajesDescuento = filteredData.map((item) =>
          parseFloat(item.porcentajedescuento)
        ); // Convierte los valores a tipo double utilizando parseFloat
        console.log(porcentajesDescuento); // Muestra los porcentajes de descuento en la consola

        // Asigna el arreglo completo porcentajesDescuento al estado porcentajesDescuento
        setDescuento(porcentajesDescuento);

        console.log("el % es " + typeof descuento);

        setCuponesDescuentos(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCuponesDescuentos();
  }, [idVehiculo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/alquilervehiculos/api/alquileres/vehiculo/${placa}`,
          {
            headers: {
              Authorization:
                "Basic " + btoa("administrador@rentcars.pe:@Frank123"), // Reemplaza con las credenciales correctas
            },
          }
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener el alquiler del vehículo");
        }
        const data = await response.json();
        setDates(data);
        setFinicio(data.fechainicio);
        setFfin(data.fechafin);
        setEstadoalquileres(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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

  function dayContentRenderer(day) {
    const isBlocked = blockedDates.some((blockedDate) => {
      return blockedDate.toDateString() === day.toDateString();
    });
    return (
      <div className={`rdr-Day ${isBlocked ? "is-disabled" : ""}`}>
        {day.getDate()}
      </div>
    );
  }
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
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [lugarrecojo, setLugarRecojo] = useState("");
  const [lugardevolucion, setLugarDevolucion] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [vehiculo, setVehiculo] = useState(null);
  const [precioFinal, setPrecioFinal] = useState(0);
  const [precioVehiculo, setPrecioVehiculo] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEnlace, setMostrarEnlace] = useState(false);

  /* Modal de Terminos y condiciones */
  const modalTerminosCondiciones = () => {
    setTerminosycondiciones(true);
  };

  /* Modal de Paypal */
  const modalPaypal = () => {
    const form = document.getElementById("miFormulario");

    if (!form.checkValidity() || !estadofechas) {
      // si el formulario es inválido, mostrar un mensaje de error o hacer algo aquí
      Swal.fire({
        icon: "error",
        title: "Vaya...",
        text: "Tienes que escoger un rango de fechas y completar todos los datos en el formulario",
      });
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
          `http://192.168.1.40:8080/alquilervehiculos/api/vehiculos/${params.id}`,
          {
            headers: {
              Authorization:
                "Basic " + btoa("administrador@rentcars.pe:@Frank123"), // Reemplaza con las credenciales correctas
            },
          }
        );
        if (!respuesta.ok) {
          console.log("No se pudo obtener el vehículo");
        }
        const vehiculo = await respuesta.json();
        setPlaca(vehiculo.placa);
        setVehiculo(vehiculo);
        setIdVehiculo(vehiculo.id);

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

  /*POST */
  useEffect(() => {
    const enviarCorreo = (formData) => {
      const data = {};
      formData.forEach((value, key) => (data[key] = value));

      const userEmail = data.email; // Obtiene el correo electrónico ingresado por el usuario

      const subject = "¡Tu alquiler con RENT CARS!";

      // Envía los datos del formulario al correo electrónico proporcionado y a la copia
      fetch("https://formspree.io/f/mnqkaqyd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          _replyto: userEmail,
          _cc: email2,
          _subject: subject,
        }), // Agrega el correo como "_cc", el asunto personalizado "_subject" y el mensaje personalizado "_message"
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
        });
    };

    const submitData = async () => {
      const alquilerUrl =
        "http://localhost:8080/alquilervehiculos/api/alquileres";
      const vehiculoUrl = `http://localhost:8080/alquilervehiculos/api/vehiculos/${vehiculo.id}`;
      /*const estadoAtencionUrl =
        "http://localhost:8080/alquilervehiculos/api/estadoatencion/1";*/

      const fecha1_c = new Date(finicio);
      const fecha2_c = new Date(ffin);

      const alquilerData = {
        codigoalquiler: codigo,
        nombres: nombres,
        apellidos: apellidos,
        dni: dni,
        email: email,
        pais: pais,
        departamento: departamento,
        direccion: direccion,
        distrito: distrito,
        telefono1: telefono1,
        telefono2: telefono2,
        lugarrecojo: lugarrecojo,
        lugardevolucion: lugardevolucion,
        comentarios: comentarios,
        preciofinal: nuevopreciofinal,
        fechainicio: fecha1_c,
        fechafin: fecha2_c,
        diasalquiler: diferencia1,
        vehiculo: {
          id: vehiculo.id,
        },
        estadoatencion: {
          id: 1,
        },
      };

      const vehiculoData = {
        estado: 3,
      };

      const alquilerResponse = await fetch(alquilerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("administrador@rentcars.pe:@Frank123"), // Reemplaza con las credenciales correctas
        },
        body: JSON.stringify(alquilerData),
      });

      const alquilerResponseData = await alquilerResponse.json();
      console.log(alquilerResponseData);

      const vehiculoResponse = await fetch(vehiculoUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("administrador@rentcars.pe:@Frank123"), // Reemplaza con las credenciales correctas
        },
        body: JSON.stringify(vehiculoData),
      });

      const vehiculoResponseData = await vehiculoResponse.json();
      console.log(vehiculoResponseData);

      /*
      const estadoAtencionResponse = await fetch(estadoAtencionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("administrador@rentcars.pe:@Frank123"), // Reemplaza con las credenciales correctas
        },
        body: JSON.stringify({ id: 1 }),
      });

      const estadoAtencionResponseData = await estadoAtencionResponse.json();
      console.log(estadoAtencionResponseData);
      */

      setReservaExitosa(true);
    };

    if (success) {
      const fechaInicio = finicio.split("T")[0];
      const fechaFin = ffin.split("T")[0];
      const formData = new FormData();
      formData.append("Codigo del Alquiler", codigo);

      formData.append("Nombres", nombres);
      formData.append("Apellidos", apellidos);
      formData.append("DNI o Carnet de extranjería", dni);
      formData.append("Correo electrónico", email);
      formData.append("País", pais);
      formData.append("Departamento", departamento);
      formData.append("Dirección", direccion);
      formData.append("Distrito", distrito);
      formData.append("Telefono", telefono1);
      formData.append("Telefono alternativo", telefono2);
      formData.append("Lugar de Recojo", lugarrecojo);
      formData.append("Lugar de Devoculcion", lugardevolucion);
      formData.append("Comentarios:", comentarios);

      formData.append("Placa", vehiculo.placa);
      formData.append("Asientos", vehiculo.asientos);
      formData.append("Marca", vehiculo.marca.marca);
      formData.append("Modelo", vehiculo.modelo);
      formData.append("Año", vehiculo.anio);
      formData.append(
        "Tipo de combustible",
        vehiculo.tipocombustible.tipocombustible
      );
      formData.append("Tipo de manejo", vehiculo.tipomanejo.tipomanejo);

      formData.append("Fecha inicio", fechaInicio);
      formData.append("Fecha fin", fechaFin);
      formData.append("Días de alquiler", diferencia1);

      formData.append("Lugar recojo", lugarrecojo);
      formData.append("Lugar devolucion", lugardevolucion);

      formData.append(
        estadoCodigoDescuento === true
          ? "Precio sin descuento"
          : "Precio final",
        estadoCodigoDescuento === true ? precioFinal : precioFinal
      );
      formData.append(
        estadoCodigoDescuento === true
          ? "Precio final"
          : "Precio con descuento",
        estadoCodigoDescuento === true
          ? nuevopreciofinal
          : "No se aplicó descuento"
      );

      formData.append(
        estadoCodigoDescuento === true
          ? "Porcentaje de descuento"
          : "Porcentaje de descuento",
        estadoCodigoDescuento === true
          ? `${descuento * 100}%`
          : "No se aplicó descuento"
      );
      formData.append(
        estadoCodigoDescuento === true
          ? "Codigo del descuento"
          : "Codigo del descuento",
        estadoCodigoDescuento === true
          ? codigoDescuento
          : "No se utilizó ningún cupón de descuento"
      );

      enviarCorreo(formData);
      submitData();
      exportarPDF();

      setNombres("");
      setApellidos("");
      setDni("");
      setEmail("");
      setPais("");
      setDepartamento("");
      setDistrito("");
      setDireccion("");
      setTelefono1("");
      setTelefono2("");
      setLugarRecojo("");
      setLugarDevolucion("");
      setComentarios("");
    } else {
      console.log("No se actualizó porque no fue exitoso (success).");
    }
  }, [success]);

  /*IDENTIFICADOR DE ALQUILER */
  const obtenerNombres = (event) => {
    setNombres(event.target.value);
  };

  const obtenerApellidos = (event) => {
    setApellidos(event.target.value);
  };

  const obtenerDni = (event) => {
    setDni(event.target.value);
  };

  const obtenerEmail = (event) => {
    setEmail(event.target.value);
  };

  const obtenerPais = (event) => {
    setPais(event.target.value);
  };

  const obtenerDepartamento = (event) => {
    setDepartamento(event.target.value);
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

  const obtenerComentarios = (event) => {
    setComentarios(event.target.value);
  };

  useEffect(() => {
    const nuevoCodigo = Math.floor(Math.random() * 100000000).toString();
    setCodigo(nuevoCodigo);
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF();
    const fechaInicio = finicio.split("T")[0];
    const fechaFin = ffin.split("T")[0];

    const texto = `
    CÓDIGO DEL ALQUILER: ${codigo}

    DATOS DEL ARRENDATARIO:
    Nombre: ${nombres}
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
    Fecha inicio: ${fechaInicio}
    Fecha fin: ${fechaFin}
    Dias de alquiler: ${diferencia1}

    LUGAR DE ROCOJO Y DEVOLUCION:
    Lugar recojo: ${lugarrecojo}
    Lugar devolucion: ${lugardevolucion}

    DATOS DE PAGO:
    Precio real: ${precioFinal}
    Precio con descuento: ${
      estadoCodigoDescuento === true
        ? nuevopreciofinal
        : "No se aplicó descuento"
    }    
    ${
      estadoCodigoDescuento === true
        ? `Porcentaje de descuento: ${descuento * 100}%`
        : "Porcentaje de descuento: No se aplicó descuento"
    }
    Codigo de descuento utilizado: ${
      estadoCodigoDescuento === true
        ? codigoDescuento
        : "No se utilizó ningún cupón de descuento"
    }
    ${
      estadoCodigoDescuento === true
        ? `Precio final: ${nuevopreciofinal}`
        : `Precio final: ${precioFinal}`
    }
  `;
    doc.text(texto, 10, 10);
    doc.save("ALQUILER " + codigo + " " + nombres + " " + apellidos + ".pdf");
  };

  useEffect(() => {
    console.log(email);
    setEmail2(email);
    console.log("email 2: " + email2);
  }, [email, email2]);

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
              value: nuevopreciofinal,
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
      Swal.fire(
        "¡Tu reserva a sido un éxito!",
        "¡Gracias por confiar en nosotros!",
        "success"
      );
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  /* PAYPAL FIN*/

  const handleFormulario = () => {
    setMostrarFormulario(true);
    setMostrarEnlace(false);
  };

  const handleLink = () => {
    setMostrarFormulario(false);
    setMostrarEnlace(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  /*Para cambiar el estado si es que hay caracteres en el input del codigo del descuenteo*/
  useEffect(() => {
    if (inputValue === codigoDescuento) {
      setEstadoCodigoDescuento(true);
    } else {
      setEstadoCodigoDescuento(false);
    }
  }, [inputValue, codigoDescuento, setEstadoCodigoDescuento]);

  /*Para hallar el precio finak depende del descuento*/
  useEffect(() => {
    if (inputValue === codigoDescuento) {
      setNuevopreciofinal(precioFinal - descuento * precioFinal);
    } else {
      setNuevopreciofinal(precioFinal);
    }
  }, [inputValue, codigoDescuento, descuento, precioFinal]);

  return (
    <>
      {vehiculo ? (
        <>
          <div className="container-fluid p-5 contenedor-calidadeficiencia text-white text-center">
            <h1>!Resérvalo aquí!</h1>
            <p>
              Puedes reservar el vehículo o alquilar aquí, siguiendo los pasos
            </p>
          </div>

          <div className="container">
            <div className="row">
              <div className="pt-5 d-flex justify-content-end">
                <button className="btn btn-dark">
                  <Link className="nav-link" to="/vehiculos">
                    Volver a vehículos
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <Vehiculodetails
            placa={vehiculo.placa}
            marca={vehiculo.marca.marca}
            tipocombustible={vehiculo.tipocombustible.tipocombustible}
            tipomanejo={vehiculo.tipomanejo.tipomanejo}
            tipocarro={vehiculo.tipocarro.tipocarro}
            tapizadoasientos={vehiculo.tapizadoasientos.tapizadoasientos}
            asientos={vehiculo.asientos}
            modelo={vehiculo.modelo}
            anio={vehiculo.anio}
            precio={vehiculo.precio}
            foto={vehiculo.foto}
            descripcion={vehiculo.descripcion}
          />

          {/*<Consejos />*/}

          <div className="container contenedor-fechas">
            <div className="row">
              <div className="col-12">
                <section>
                  <h3>
                    ¡Elije las fechas que deseas alquilar tu vehiculo aquí!
                    {/*      <section>
        <h1 className="titulo-titulo">¡Reserva tu vehículo ahora!</h1>
        <div>
          <strong>
            <span className="alert-aviso">
              *Si las fechas en el calendario te salen de color plomo y no las
              puedes seleccionar, es por que esas fechas el vehículo ya está en
              reserva*
            </span>
          </strong>
        </div>
      </section> */}
                  </h3>
                </section>
              </div>
              <div className="col-md-6 col-sm-12">
                <section>
                  <DateRange
                    ranges={dateRange}
                    onChange={handleSelect}
                    disabledDates={allBlockedDates}
                    showDateDisplay={true}
                    dayContentRenderer={dayContentRenderer}
                  />
                  <div>
                    <button
                      onClick={handleSave}
                      className="save-button btn btn-dark col-6"
                    >
                      Guardar
                    </button>
                  </div>{" "}
                </section>
              </div>
              {descuento <= 0 ? (
                <>
                  <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                    <section>
                      <div className="container contenedor-descuento">
                        <div className="row">
                          <div className="titulo-titulo-precio">
                            <strong>Precio actual</strong>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="conteiner-precio-vehiculo">
                              $ {precioFinal}
                            </div>
                          </div>
                          <div className="mt-2">
                            <strong>
                              Actualmente este vehiculo no tiene ningún cupón de
                              descuento
                            </strong>
                          </div>
                        </div>
                      </div>
                      {estadofechas ? (
                        <>
                          <div className="titulo-titulo mt-3">
                            <strong>Fecha inicio seleccionada:</strong>{" "}
                            {new Date(finicio).toLocaleDateString()}
                          </div>
                          <div className="titulo-titulo">
                            <strong>Fecha fin seleccionada:</strong>{" "}
                            {new Date(ffin).toLocaleDateString()}
                          </div>
                          <div className="titulo-titulo">
                            <strong>Días de alquiler:</strong> {diferencia1}
                          </div>
                        </>
                      ) : (
                        <div>{null}</div>
                      )}
                    </section>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                    <section>
                      <div className="container contenedor-descuento">
                        <div className="row">
                          <div className="titulo-titulo-precio">
                            <strong>Precio actual</strong>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="conteiner-precio-vehiculo">
                              $ {precioFinal}
                            </div>
                          </div>
                          <div className="mt-3">
                            {estadoCodigoDescuento === true ? (
                              <div className="titulo-titulo-precio">
                                <strong>Precio con descuento</strong>
                              </div>
                            ) : null}
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="conteiner-precio-vehiculo">
                              {estadoCodigoDescuento === true ? (
                                <>$ {precioFinal - descuento * precioFinal}</>
                              ) : null}
                            </div>
                          </div>
                          <div className="mt-2">
                            <strong>
                              Ingresa tu cupon para obtener el{" "}
                              {(descuento * 100).toFixed(1)}% de descuento
                            </strong>
                          </div>
                          <div className="mt-3">
                            <input
                              className="form-control texto-input text-center"
                              type="text"
                              disabled={!estadoBoton}
                              value={inputValue}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            {!estadoBoton ? (
                              <div>
                                <strong className="alert-aviso">
                                  *Tienes que seleccionar un rango de fechas
                                  para poder activar el cupón*
                                </strong>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <>
                        <div>
                          {estadofechas ? (
                            <>
                              <div className="titulo-titulo mt-3">
                                <strong>Fecha inicio seleccionada:</strong>{" "}
                                {new Date(finicio).toLocaleDateString()}
                              </div>
                              <div className="titulo-titulo">
                                <strong>Fecha fin seleccionada:</strong>{" "}
                                {new Date(ffin).toLocaleDateString()}
                              </div>
                              <div className="titulo-titulo">
                                <strong>Días de alquiler:</strong> {diferencia1}
                              </div>
                            </>
                          ) : (
                            <div>{null}</div>
                          )}
                        </div>
                      </>
                    </section>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-5 contenedor-hijo-adicional contenedor-metodos-de-pago">
            <div
              className="contenedor-adicional-adicion contenedor-box-shadow"
              onClick={handleFormulario}
            >
              <h3>Cancelar como invitado (Sin cuenta)</h3>
              <br />
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  className="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="black"
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                  />
                </svg>
              </div>
              <br />
            </div>

            <a
              className="no-underline"
              href="https://api.whatsapp.com/send?phone=51976407080"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="contenedor-adicional-adicion contenedor-box-shadow"
                onClick={handleLink}
              >
                <h3>Cancelar con Yape, Plin u otros mediante WhatsApp</h3>
                <br />
                <div className="d-flex justify-content-center">
                  <img
                    src="https://www.massimple.pe/wp-content/uploads/2020/11/Diseno-sin-titulo-2020-11-23T140417.921.jpg"
                    alt="yape-plin"
                  />
                </div>
                <br />
              </div>
            </a>
          </div>

          {mostrarFormulario && (
            <>
              <div className="contenedor-formulario contenedor-box-shadow mx-auto">
                <div className="contenedor-hijo-adicional">
                  <div className="container">
                    <h4>Complete los datos:</h4>
                    <label className="mensaje-enviado">
                      Campos obligatorios (*)
                    </label>
                    <form id="miFormulario">
                      <div className="row">
                        <div className="col-md-3">
                          <label>Nombres (*)</label>
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
                        <div className="col-md-3">
                          <label htmlFor="name">Apellidos (*)</label>
                          <input
                            type="text"
                            name="apellidos"
                            className="form-control"
                            value={apellidos}
                            placeholder="Ingrese sus apellidos"
                            onChange={obtenerApellidos}
                            required
                          />
                        </div>{" "}
                        <div className="col-md-3">
                          <label htmlFor="name">
                            DNI o Carnet de extranjería (*)
                          </label>
                          <input
                            type="number"
                            name="dni"
                            className="form-control input-number"
                            value={dni}
                            placeholder="Ingrese su DNI"
                            onChange={obtenerDni}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="name">Email (*)</label>
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
                          <label htmlFor="name">Pais (*)</label>
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
                          <label htmlFor="name">Departamento (*)</label>
                          <input
                            type="text"
                            name="departamento"
                            className="form-control"
                            value={departamento}
                            placeholder="Ingrese su departamento"
                            onChange={obtenerDepartamento}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="name">Distrito *</label>
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
                        <div className="col-md-4">
                          <label htmlFor="name">Direccion (*)</label>
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
                          <label htmlFor="name">Telefono (*)</label>
                          <input
                            type="number"
                            name="telefono"
                            className="form-control input-number"
                            value={telefono1}
                            placeholder="Ingrese su telefono"
                            onChange={obtenerTelefono1}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="name">Telefono alternativo (*)</label>
                          <input
                            type="text"
                            name="telefonoalternativo"
                            className="form-control input-number"
                            placeholder="Ingrese un número alternativo"
                            value={telefono2}
                            onChange={obtenerTelefono2}
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="name">Lugar recojo (*)</label>
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
                          <label htmlFor="name">Lugar devolucion (*)</label>
                          <input
                            type="text"
                            name="lugardevolucion"
                            className="form-control"
                            value={lugardevolucion}
                            placeholder="Ingrese en donde va devolver el carro"
                            onChange={obtenerLugarDevolucion}
                            required
                          />
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="name">Comentario (*)</label>
                          <textarea
                            name="comentarios"
                            className="form-control"
                            value={comentarios}
                            onChange={obtenerComentarios}
                            rows="6"
                            required
                          ></textarea>
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
                      size="lg"
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
                          Antes de continuar con tu pago, lee nuestras
                          condiciones:
                        </h3>
                        <ol>
                          <li>
                            El arrendador se compromete a entregar el vehículo
                            en buen estado y en condiciones de ser utilizado de
                            manera segura durante el período de alquiler.
                          </li>
                          <li>
                            El arrendatario acepta que cualquier daño causado al
                            vehículo durante el período de alquiler será su
                            responsabilidad y que se le cobrará el costo total
                            de las reparaciones necesarias. El arrendatario
                            también se compromete a cumplir con todas las leyes
                            y regulaciones de tráfico aplicables durante el
                            período de alquiler.
                          </li>
                          <li>
                            El arrendatario acepta que el vehículo es propiedad
                            exclusiva del arrendador y que no tiene derecho a
                            vender, transferir, hipotecar o gravar el vehículo
                            de ninguna manera durante el período de alquiler.
                          </li>
                          <li>
                            El arrendador no será responsable por ningún daño o
                            pérdida de propiedad personal del arrendatario que
                            ocurra durante el período de alquiler.
                          </li>
                          <li>
                            Al aceptar estos términos y condiciones, el
                            arrendatario acepta cumplir con todas las
                            obligaciones y responsabilidades establecidas en
                            este contrato.
                          </li>
                          <li>
                            El arrendatario se compromete a correr con todos los
                            gastos relacionados con el uso y mantenimiento del
                            vehículo durante el período de alquiler. Esto
                            incluye, pero no se limita a, los gastos de
                            combustible, peajes, estacionamiento, lavado del
                            vehículo y cualquier otra tarifa o costo adicional
                            que pueda surgir durante el uso del vehículo. El
                            arrendatario asume la responsabilidad de pagar todos
                            estos gastos de manera oportuna y de acuerdo con las
                            políticas y condiciones establecidas en este
                            contrato de alquiler.
                          </li>
                          <li>
                            El arrendatario declara y garantiza que la persona
                            que conducirá el vehículo durante el período de
                            alquiler posee una licencia de conducir válida y
                            vigente. El arrendatario se compromete a no permitir
                            que ninguna persona sin licencia de conducir operé
                            el vehículo alquilado. El incumplimiento de esta
                            condición constituirá una violación de los términos
                            y condiciones de este contrato, y el arrendatario
                            asume toda la responsabilidad legal y financiera
                            resultante de dicha violación.
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

                    <Modal
                      size="lg"
                      show={paypal}
                      onHide={() => setPaypal(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {!success ? (
                            <h1 className="titulo-titulo">
                              Resumen de alquiler
                            </h1>
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
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                              <strong>
                                                DNI o Carnet de extranjería
                                              </strong>
                                            </div>
                                            <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                              {dni}
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                              <strong>
                                                Correo electrónico
                                              </strong>
                                            </div>
                                            <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                              {email}
                                            </div>{" "}
                                            <div className="col-md-4 col-sm-12">
                                              <strong>País</strong>
                                            </div>
                                            <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                              {pais}
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                              <strong>Departamento</strong>
                                            </div>
                                            <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                              {departamento}
                                            </div>
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
                                              <strong>
                                                Telefono alternativo
                                              </strong>
                                            </div>
                                            <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                              {telefono2}
                                            </div>{" "}
                                            <div className="col-md-4 col-sm-12">
                                              <strong>Fecha inicio</strong>
                                            </div>
                                            <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                              {new Date(
                                                finicio
                                              ).toLocaleDateString()}
                                            </div>{" "}
                                            <div className="col-md-4 col-sm-12">
                                              <strong>Fecha fin</strong>
                                            </div>
                                            <div className="titulo-titulo col-md-8 col-sm-12 d-flex justify-content-end">
                                              {new Date(
                                                ffin
                                              ).toLocaleDateString()}
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
                                              <strong>
                                                Tipo de combustible
                                              </strong>
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
                                              <strong>
                                                Lugar de devolución
                                              </strong>
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
                                                    {estadoCodigoDescuento ===
                                                    true ? (
                                                      <>
                                                        $
                                                        {precioFinal -
                                                          descuento *
                                                            precioFinal}
                                                      </>
                                                    ) : (
                                                      <>${precioFinal}</>
                                                    )}
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
                                            Se acaba de descargar
                                            automaticamente el resumen de tu
                                            alquiler en tu computador. Si tienes
                                            bloqueado las descargas automaticas,
                                            desbloquealas. En caso contrario,
                                            puedes darle click al botón de
                                            "Exportar PDF", para que puedas
                                            tener una copia.
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
          )}
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
