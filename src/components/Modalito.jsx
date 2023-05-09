import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  content: {
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
  },
};
const Modalito = () => {
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ejemplo Modal"
        style={customStyles}
      >
        <h2>Ejemplo Modal</h2>
        <div>Contenido del modal...</div>
        <button className="btn btn-dark" onClick={closeModal}>
          Cerrar Modal
        </button>
      </Modal>
    </div>
  );
};

export default Modalito;
