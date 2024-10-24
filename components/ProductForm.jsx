import {
    validateFullName,
    validatePhone,
    validateComentario,
  } from "../hooks/useValidations";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const ProductForm = () => {

    const [formData, setFormData] = useState({
        nombre: "",
        imagen: "",
        descripcion: "",
        cantidad: "",
        precio: "",
        estado:"on",
      });
    
      const [errors, setErrors] = useState({
        nombre: "",
        imagen: "",
        descripcion: "",
        cantidad: "",
        precio: "",
        estado:"",
      });
  
      const [showModal, setShowModal] = useState(false);
      const [modalContent, setModalContent] = useState("");
      const [selectedFile, setSelectedFile] = useState(null);
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;

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
              : "Nombre inválido. Solo se permiten letras y espacios.",
          });
        }

        if (name === "imagen") {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = function () {
            setFormData({
              ...formData,
              imagen: reader.result,
            });
          };
          reader.readAsDataURL(file);
          setSelectedFile(file);
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
    
        if (name === "descripcion") {
          const isValid = validateComentario(value);
          setErrors({
            ...errors,
            descripcion: isValid ? "" : "La descripción no es valida.",
          });
        }
    
        if (name === "cantidad") {
          const isValid = validatePhone(value);
          setErrors({
            ...errors,
            cantidad: isValid ? "" : "La cantidad en (kg) no es valida.",
          });
        }
  
        if (name === "precio") {
          const isValid = validatePhone(value);
          setErrors({
            ...errors,
            precio: isValid ? "" : "El precio no es válida.",
          });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const isNameValid = validateFullName(formData.nombre);
        const isDescripcionValid = validateComentario(formData.descripcion);
        const isCantidadValid = validatePhone(formData.cantidad);
        const isPrecioValid = validatePhone(formData.precio);

        if (isNameValid && isDescripcionValid  
            && isCantidadValid && isPrecioValid) {
          try {
            const response = await axios.post(import.meta.env.VITE_URI_BACK+ "/api/producto", formData);
            setModalContent("Producto registrado correctamente.");
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
              : "Nombre inválido. Solo se permiten letras y espacios.",
            descripcion: isDescripcionValid ? "" : "La descripción no es valida.",
            cantidad: isCantidadValid ? "" : "La cantidad en (kg) no es valida.",
            precio: isPrecioValid ? "" : "El precio no es válida.",
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
                      Crear Producto
                    </h2>
                    <p className="subtitle is-6 has-text-centered mb-1 newsubtitle">
                    Por favor, complete los siguientes campos para crear el producto.
                    </p>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="field">
                        <label className="label">Nombre</label>
                        <div className="control">
                          <input
                            className="input"
                            id="nombre"
                            name="nombre"
                            type="text"
                            placeholder="Ingrese el nombre del producto"
                            onChange={handleChange}
                          />
                        </div>
                        {errors.nombre && (
                          <p className="help is-danger">{errors.nombre}</p>
                        )}
                      </div>
                      <div className="field">
                        <label className="label">Imagen</label>
                        <div className="file has-name is-fullwidth">
                            <label className="file-label">
                                <input className="file-input" type="file" id="imagen" name="imagen" accept="image/*" onChange={handleChange}/>
                                <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label"> Subir imagen</span>
                                </span>
                                <span className="file-name">
                                  {selectedFile ? selectedFile.name : "No se ha seleccionado ningún archivo"}
                                </span>
                            </label>
                        </div>
                        {errors.imagen && (
                          <p className="help is-danger">{errors.imagen}</p>
                        )}
                      </div>
                      <div className="field">
                        <label className="label">Descripción</label>
                        <div className="control">
                          <textarea
                            id="descripcion"
                            name="descripcion"
                            className="textarea"
                            placeholder="Ingrese la descripción del producto"
                            onChange={handleChange}
                            ></textarea>
                        </div>
                        {errors.descripcion && (
                          <p className="help is-danger">{errors.descripcion}</p>
                        )}
                      </div>
                      <div className="field">
                      <label className="label">Cantidad (stock)</label>
                      <div className="control">
                        <input
                          type="number"
                          id="cantidad"
                          name="cantidad"
                          className="input"
                          placeholder="Ingrese la cantidad que hay del producto"
                          onChange={handleChange}
                        />
                      </div>
                      {errors.cantidad && (
                        <p className="help is-danger">{errors.cantidad}</p>
                      )}
                    </div>
                    <div className="field">
                      <label className="label">Precio</label>
                      <div className="control">
                        <input
                          type="number"
                          id="precio"
                          name="precio"
                          className="input"
                          placeholder="Ingrese el precio del producto"
                          onChange={handleChange}
                        />
                      </div>
                      {errors.precio && (
                        <p className="help is-danger">{errors.precio}</p>
                      )}
                    </div>
                      <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                          <button className="button is-danger button-login">
                            Crear
                          </button>
                          <Link to="/administracion/productos" className="button is-link btn-form">
                            Regresar
                          </Link>
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
                  <Link className="delete" aria-label="close" to="/administracion/productos" onClick={() => setShowModal(false)}>
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
}

export default ProductForm