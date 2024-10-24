import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Confirmar = () => {
  const { token } = useParams();
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState(null);
  const proxy = "http://localhost:4000"

  useEffect(() => {
    const confirmarUsuario = async () => {
      try {
        await axios.get(proxy+"/api/usuario/confirmar/"+token);
        setConfirmado(true);
      } catch (error) {
        setError("Error al confirmar usuario");
      }
    };

    confirmarUsuario();
  }, [token]);

  return (
    <>
      <section className="section section-register">
        <div className="container container-background">
          <div className="columns is-centered">
            <div className="column is-6">
              <div className="box">
                {confirmado ? (
                  <>
                    <h2 className="title is-2 has-text-centered mb-6 newh2">
                      Usuario Confirmado
                    </h2>
                    <p className="subtitle is-6 has-text-centered mb-1 newsubtitle">
                      El Usuario ha sido confirmado correctamente, ya puedes volver a loguearte.
                    </p>
                    <div className="field is-grouped is-grouped-centered">
                      <div className="control confirmar">
                        <Link className="button is-danger button-login" to="/login">
                          Volver
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="subtitle has-text-centered newh2">Confirmando el usuario...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Confirmar;
