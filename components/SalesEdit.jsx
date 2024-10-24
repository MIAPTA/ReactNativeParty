import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const SalesEdit = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
      estado: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
      const fetchProductDetails = async () => {
          try {
              const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/venta/${id}`);
              const ventaData = response.data;
              setFormData(ventaData);
          } catch (error) {
              console.error("Error al obtener los detalles de la venta:", error);
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
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.put(`${import.meta.env.VITE_URI_BACK}/api/venta/${id}`, formData);
          setModalContent("Estado de la venta actualizado correctamente.");
          setShowModal(true);
      } catch (error) {
          console.error("Error al actualizar el estado de la venta:", error);
          if (error.response) {
              const errorMessage = error.response.data.msg || "Error desconocido";
              setModalContent(errorMessage);
              setShowModal(true);
          }
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
                                  Editar Estado de Venta
                              </h2>
                              <p className="subtitle is-6 has-text-centered mb-1 newsubtitle">
                                  Por favor, selecciona el nuevo estado de la venta.
                              </p>
                              <form onSubmit={handleSubmit}>
                                  <div className="field">
                                      <label className="label">Estado de la Venta</label>
                                      <div className="control select is-fullwidth">
                                          <select
                                              id="estado"
                                              name="estado"
                                              value={formData.estado}
                                              onChange={handleChange}
                                          >
                                              <option value="Pagado">Pagado</option>
                                              <option value="Despachado">Despachado</option>
                                              <option value="Finalizado">Finalizado</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div className="field is-grouped is-grouped-centered">
                                      <div className="control">
                                          <button className="button is-danger button-login">
                                              Actualizar
                                          </button>
                                          <Link to="/administracion/ventas" className="button is-link btn-form">
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
                      <Link className="delete" aria-label="close" to="/administracion/ventas" onClick={() => setShowModal(false)}>
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

export default SalesEdit;
