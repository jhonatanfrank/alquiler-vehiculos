import React, { useState } from "react";
import Modals from "react-modal";

const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div>
      <button onClick={openModal}>Abrir Modal</button>
      <Modals
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ejemplo Modal"
      >
        <h2>Ejemplo Modal</h2>
        <div>Contenido del modal...</div>
        <button onClick={closeModal}>Cerrar Modal</button>
      </Modals>
    </div>
  );
};

export default Modal;
