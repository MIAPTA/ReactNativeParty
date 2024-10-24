import { validateEmail, validatePassword } from "../hooks/useValidations";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import axios from 'axios';

var token=""
var tipoUsuario=""

const Login = ({ setId, setName, setLogin, setType }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showSendEmailForm, setShowSendEmailForm] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      const isValid = validateEmail(value);
      setErrors({
        ...errors,
        email: isValid ? "" : "Correo electrónico no válido.",
      });
    }

    if (name === "password") {
      const isValid = validatePassword(value);
      setErrors({
        ...errors,
        password: isValid ? "" : "La Contraseña no es válida.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(import.meta.env.VITE_URI_BACK+'/api/usuario/login', formData);
        tipoUsuario=response.data.tipoUsuario
        setShowModal(false);
        setId(response.data._id)
        setName(response.data.nombre)
        setLogin("true")
        setType(response.data.tipoUsuario)
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("userName", response.data.nombre);
        localStorage.setItem("userType", response.data.tipoUsuario);
        if(tipoUsuario=="Administrador")
        {
          navigate("/");
        }
        else{
          if(tipoUsuario=="Cliente"){
            navigate("/");
          }
        }
      } catch (error) {
        if (error.response) {
          token = error.response.data.token || "Error desconocido";
          if (error.response.status === 403) {
            setModalContent("Para poder iniciar sesión con este Usuario, por favor haz clic en el enlace que se enviará al correo electrónico previamente proporcionado.");
            setShowSendEmailForm(true);
          } else {
            setModalContent(error.response.data.msg);
            setShowSendEmailForm(false);
          }
          setShowModal(true);
        }
      }
    } else {
      setErrors({
        email: isEmailValid ? "" : "Correo electrónico no válido.",
        password: isPasswordValid ? "" : "Contraseña no es válida.",
      });
      setShowSendEmailForm(false);
    }
  };
  

  const sendEmail = async (e) => {
    e.preventDefault();
    const templateParams = {
      to_email: formData.email,
      message: import.meta.env.VITE_URI_FRONT+"/confirmar/"+token
    };

    emailjs.send(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID, templateParams, {
        publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
  };

  return (
    <>
      <section className="sectiontitle">
        <div className="container-title">
          <h1 className="title is-3 has-text-white has-text-right newh1">
            Inicio de Sesión
          </h1>
        </div>
      </section>
      <section className="section sectionlogin">
        <div className="container container-background">
          <div className="columns is-centered">
            <div className="column is-5 is-offset-8">
              <div className="box">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Correo</label>
                    <div className="control">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
                        placeholder="correo@example.com"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && (
                      <p className="help is-danger">{errors.email}</p>
                    )}
                  </div>
                  <div className="field">
                    <label className="label">Contraseña</label>
                    <div className="control">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="input"
                        placeholder="Ingrese su contraseña"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.password && (
                      <p className="help is-danger">{errors.password}</p>
                    )}
                  </div>
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button
                        className="button is-danger button-login"
                        type="submit"
                      >
                        Inicar Sesión
                      </button>
                    </div>
                  </div>
                  <p className="subtitle is-6 has-text-centered mb-1 newsubtitle">
                    ¿No tiene cuenta?
                    <Link className="signup" to="/registeruser">
                      Da click aquí.
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={`modal ${showModal ? "is-active" : ""}`}>
            <div className="modal-background" onClick={() => setShowModal(false)}></div>
            <div className="modal-card custom-modal">
              <header className="modal-card-head">
                <p className="modal-card-title">Mensaje</p>
                <Link className="delete" aria-label="close" to="/login" onClick={() => setShowModal(false)}>
                </Link>
              </header>
              <section className="modal-card-body">
                <p>
                 {modalContent}
                </p>
              </section>
              {showSendEmailForm && (<footer className="modal-card-foot">
                <div className="buttons">
                  <form className="form-email" onSubmit={sendEmail}>
                    <button className="button is-link"  onClick={() => setShowModal(false)}>
                      Enviar Correo
                    </button>
                  </form>
                  <Link className="button" to="/login" onClick={() => setShowModal(false)}>Cancelar</Link>
                </div>
              </footer>)}
            </div>
          </div>
      </section>
    </>
  );
};

export default Login;
