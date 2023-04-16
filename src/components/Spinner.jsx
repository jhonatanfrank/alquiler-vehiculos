import React from "react";

const Spinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border custom-size" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
