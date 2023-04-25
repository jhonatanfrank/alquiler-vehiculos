import React from "react";
import "../styles/Whatsappflotante.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Whatsappflotante = () => {
  return (
    <>      
      <a
        href="https://api.whatsapp.com/send?phone=51976407080"
        className="btn-wsp"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon className="whatsapp-icono" icon={faWhatsapp} />
      </a>
      
    </>
  );
};

export default Whatsappflotante;
