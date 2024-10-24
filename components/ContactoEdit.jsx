import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateComentario,
} from "../hooks/useValidations";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const ContactoEdit = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
      nombre: "",
      email: "",
      phone: "",
      commentary:"",
  });

  const [errors, setErrors] = useState({
      nombre: "",
      email: "",
      phone: "",
      commentary:"",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
      const fetchProductDetails = async () => {
          try {
              const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/contacto/${id}`);
              const userData = response.data;
              setFormData(userData);
          } catch (error) {
              console.error("Error al obtener los detalles del contacto:", error);
          }
      };

      fetchProductDetails();
  }, [id]);

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

      if(name == "commentary"){
          const isValid = validateComentario(value);
          setErrors({
              ...errors,
              commentary: isValid ? "" : "Tipo de usuario no  válido.",
          });
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const isNameValid = validateFullName(formData.nombre);
      const isEmailValid = validateEmail(formData.email);
      const isPhoneValid = validatePhone(formData.phone);
      const isComentarioValid = validateComentario(formData.comentario);

      if (isEmailValid && isNameValid && isPhoneValid) {
          try {
              const response = await axios.put(import.meta.env.VITE_URI_BACK+ "/api/contacto/"+id,formData);
              setModalContent("Contacto actualizado correctamente.");
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
              nombre: isNameValid
                  ? ""
                  : "Nombre inválido. Solo se permiten letras, espacios y apóstrofes.",
              email: isEmailValid ? "" : "Correo electrónico no válido.",
              phone: isPhoneValid ? "" : "Número de teléfono no válido.",
              comentario: isComentarioValid ? "" : "Comentario no válido.",
          });
      }
  };


  return (
      <>
          <section className="section section-register">
              <div className="container container-background">
                  <div className="columns is-centered">
                      <div className="column is-6">
                          <div className="box">
                              <h2 className="title is-2 has-text-centered mb-6 newh2">
                                  Crear Contacto
                              </h2>
                              <p className="subtitle is-6 has-text-centered mb-1 newsubtitle">
                                Por favor, completa los campos que desea actualizar del contacto.
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
                                              value={formData.nombre}
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
                                              value={formData.email}
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
                                              value={formData.phone}
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
                                              Actualizar
                                          </button>
                                          <Link to="/administracion/contactos" className="button is-link btn-form">
                                              Regresar
                                          </Link>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <div className={`modal ${showModal ? "is-active" : ""}`}>
              <div className="modal-background" onClick={() => setShowModal(false)}></div>
              <div className="modal-card custom-modal">
                  <header className="modal-card-head">
                      <p className="modal-card-title">Mensaje</p>
                      <Link className="delete" aria-label="close" to="/administracion/contactos" onClick={() => setShowModal(false)}>
                      </Link>
                  </header>
                  <section className="modal-card-body">
                      <p>{modalContent}</p>
                  </section>
              </div>
          </div>
      </>
  );
};

export default ContactoEdit;
