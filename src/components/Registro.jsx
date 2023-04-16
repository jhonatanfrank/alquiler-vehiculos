import React from "react";

const Registro = () => {
  return (
    <div>
      <>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong  container-login">
                  <div className="card-body p-3 text-center">
                    <h3 className="mb-5">REGISTRATE</h3>
                    <div className="container">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="typeEmailX-2"
                            >
                              <strong>Nombres</strong>
                            </label>
                            <input
                              type="email"
                              id="1"
                              className="form-control form-control-md"
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="typeEmailX-2"
                            >
                              <strong>Correo electrónico</strong>
                            </label>
                            <input
                              type="email"
                              id="2"
                              className="form-control form-control-md"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="typeEmailX-2"
                            >
                              <strong>Apellidos</strong>
                            </label>
                            <input
                              type="email"
                              id="typeEmailX-2"
                              className="form-control form-control-md"
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="typePasswordX-2"
                            >
                              <strong>Contraseña</strong>
                            </label>
                            <input
                              type="password"
                              id="typePasswordX-2"
                              className="form-control form-control-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block btn-dark btn-sm p-2"
                      type="submit"
                    >
                      Registrarse
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      ;
    </div>
  );
};

export default Registro;
