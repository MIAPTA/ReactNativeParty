import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateComentario,
} from "../hooks/useValidations";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const proxy = "http://localhost:4000"

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    phone: "",
    commentary: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    phone: "",
    commentary: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "nombre") {
      const isValid = validateFullName(value);
      setErrors({
        ...errors,
        nombre: isValid
          ? ""
          : "Nombre inválido. Solo se permiten letras, espacios y apóstrofes.",
      });
    }

    if (name === "email") {
      const isValid = validateEmail(value);
      setErrors({
        ...errors,
        email: isValid ? "" : "Correo electrónico no válido",
      });
    }

    if (name === "phone") {
      const isValid = validatePhone(value);
      setErrors({
        ...errors,
        phone: isValid ? "" : "Número de teléfono no válido",
      });
    }

    if (name === "commentary") {
      const isValid = validateComentario(value);
      setErrors({
        ...errors,
        commentary: isValid ? "" : "¡Debes escribir algún comentario!",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNameValid = validateFullName(formData.nombre);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isComentarioValid = validateComentario(formData.commentary);

    if (isEmailValid && isNameValid && isPhoneValid && isComentarioValid) {
      try {
        const response = await axios.post(proxy+'/api/contacto/', formData);
        setModalContent("Contacto registrado correctamente.");
        setShowModal(true);
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.msg || "Error desconocido";
          setModalContent(errorMessage);
          setShowModal(true);
        }
      }
    } else {
      setErrors({
        nombre: isNameValid ? "" : "Nombre inválido. Solo se permiten letras, espacios y apóstrofes.",
        email: isEmailValid ? "" : "Correo electrónico no válido.",
        phone: isPhoneValid ? "" : "Número de teléfono no válido.",
        commentary: isComentarioValid ? "" : "¡Debes escribir algún comentario!",
      });
    }
  };

  return (
    <>
      <section className="sectiontitle">
        <div className="container-title">
          <h1 className="title is-3 has-text-white has-text-right newh1">
            Contacto
          </h1>
        </div>
      </section>
      <section className="section section-contacto">
        <div className="container container-background">
          <div className="columns">
            <div className="column is-5">
              <div className="box">
                <h2 className="title is-3 has-text-centered mb-6 newh2">
                  ¡Queremos estar en Contacto Contigo!
                </h2>
                <p className="subtitle is-6 has-text-centered mb-1 newsubtitle">
                  Por favor, complete el siguiente formulario y pronto nos
                  podremos en contacto.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Nombre Completo</label>
                    <div className="control">
                      <input
                        className="input"
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Ingrese su nombre completo"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.nombre && (
                      <p className="help is-danger">{errors.nombre}</p>
                    )}
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="correo@example.com"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && (
                      <p className="help is-danger">{errors.email}</p>
                    )}
                  </div>
                  <div className="field">
                    <label className="label">Teléfono</label>
                    <div className="control">
                      <input
                        className="input"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Ingrese su número de teléfono"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phone && (
                      <p className="help is-danger">{errors.phone}</p>
                    )}
                  </div>
                  <div className="field">
                    <label className="label">Comentario</label>
                    <div className="control">
                      <textarea
                        id="commentary"
                        name="commentary"
                        className="textarea"
                        placeholder="Escriba su comentario aquí"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    {errors.commentary && (
                      <p className="help is-danger">{errors.commentary}</p>
                    )}
                  </div>
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button className="button is-danger button-login">
                        Enviar Contacto
                      </button>
                    </div>
                  </div>
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
                <Link className="delete" aria-label="close" to="/contacto" onClick={() => setShowModal(false)}>
                </Link>
              </header>
              <section className="modal-card-body">
                <p>{modalContent}</p>
              </section>
            </div>
          </div>
      </section>
    </>
  );
};

export default Contact;
