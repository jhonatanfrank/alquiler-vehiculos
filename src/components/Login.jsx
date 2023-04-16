import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong  container-login">
                <div className="card-body p-3 text-center">
                  <h3 className="mb-5">INGRESAR</h3>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeEmailX-2">
                      <strong>Correo electrónico</strong>
                    </label>
                    <input
                      type="email"
                      id="1"
                      className="form-control form-control-md"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typePasswordX-2">
                    <strong>Contraseña</strong>
                    </label>
                    <input
                      type="password"
                      id="2"
                      className="form-control form-control-md"
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block btn-dark btn-sm p-2"
                    type="submit"
                  >
                    Login
                  </button>

                  <hr className="my-4" />
                  <div>
                    <p className="parrafo">¿No tienes una cuenta? </p>
                    <Link to="/registro">
                      <strong>Registrarte</strong>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
