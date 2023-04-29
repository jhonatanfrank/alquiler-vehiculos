import React, { useState } from "react";
import "../styles/Contactanos.css";

const Contactanos = () => {
  const [sent, setSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    const response = await fetch(
      "http://localhost:8080/alquilervehiculos/api/contactanos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log(result);

    setSent(true);
    event.target.reset();
  }

  return (
    <>
      <div className="container-fluid p-5 bg-dark text-white text-center">
        <h1>Contáctanos</h1>
        <p>Puedes contactarte con nosotros por aquí.</p>
      </div>
      <div className="container mt-5 ">
        <div className="contenedor-padre-contactanos">
          <div className="contenedor-cards-contactanos col-lg-3 col-md-6 col-sm-6">
            <div className="d-flex align-items-center justify-content-center">
              <img src="./images/geo-alt.svg" alt="" width="60" height="60" />
            </div>
            <br />
            <strong className="d-flex align-items-center justify-content-center">
              Direccion
            </strong>
            <span className="d-flex align-items-center justify-content-center">
              Jr. San Luis 328
            </span>
          </div>
          <div className="contenedor-cards-contactanos col-lg-3 col-md-6 col-sm-6">
            <div className="d-flex align-items-center justify-content-center">
              <img src="./images/telephone.svg" alt="" width="55" height="57" />
            </div>
            <br />
            <strong className="d-flex align-items-center justify-content-center">
              Teléfonos
            </strong>
            <span className="d-flex align-items-center justify-content-center">
              987657876
            </span>
          </div>
          <div className="contenedor-cards-contactanos col-lg-3 col-md-6 col-sm-6">
            <div className="d-flex align-items-center justify-content-center">
              <img src="./images/envelope.svg" alt="" width="50" height="55" />
            </div>
            <strong className="d-flex align-items-center justify-content-center">
              Correo
            </strong>
            <span className="d-flex align-items-center justify-content-center">
              carsforall@gmail.com
            </span>
          </div>
          <div className="contenedor-cards-contactanos col-lg-3 col-md-6 col-sm-6">
            <div className="d-flex align-items-center justify-content-center">
              <img src="./images/envelope.svg" alt="" width="60" height="55" />
            </div>
            <strong className="d-flex align-items-center justify-content-center">
              whatsapp
            </strong>
            <span className="d-flex align-items-center justify-content-center">
              +51 969872817
            </span>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h4>Contáctanos</h4>
        <p>
          Si desea solicitar información, complete y envíe el formulario a
          continuación.
        </p>
        <form className="needs-validation row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombres"
              name="nombres"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellidos"
              name="apellidos"
              required
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">Correo electronico</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
              name="email"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Celular</label>
            <input
              type="text"
              className="form-control"
              placeholder="+51 976 407 806"
              name="celular"
              required
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Añade algo mas a tu solicitud:</label>
            <textarea
              name="comentarios"
              className="form-control"
              rows="6"
              required
            ></textarea>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-dark btn-sm p-2">
              Enviar Solicitud
            </button>
          </div>
        </form>
        {sent ? (
          <div className="mensaje-enviado">¡Fomulario enviado con éxito!</div>
        ) : null}
      </div>
      <br />
      <div className="container">
        <h4>Visítanos:</h4>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124840.73341890177!2d-77.11453025061665!3d-12.093459330024887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cbebaea404bb%3A0xfcd04aac9d90c283!2sHospital%20Essalud%20Alberto%20Sabogal%20Sologuren!5e0!3m2!1ses!2spe!4v1644345120722!5m2!1ses!2spe"
            width="100%"
            height="500"
            loading="lazy"
            title="Mapa de ubicación de nuestro local"
          />
        </div>
      </div>
      <br />
    </>
  );
};

export default Contactanos;
