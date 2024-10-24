import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const OneSale = () => {
  const { id } = useParams();

  const [venta, setVenta] = useState({});
  const [usuario, setUsuario] = useState({});
  const [producto, setProducto] = useState({});

  useEffect(() => {
      const fetchVentaDetails = async () => {
          try {
              const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/venta/${id}`);
              setVenta(response.data);

              const usuarioResponse = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/usuario/${response.data.idUser}`);
              setUsuario(usuarioResponse.data);

              const productoResponse = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/producto/${response.data.idProduct}`);
              setProducto(productoResponse.data);
          } catch (error) {
              console.error("Error al obtener los detalles de la venta:", error);
          }
      };

      fetchVentaDetails();
  }, [id]);

  return (
      <>
          <section className="section section-register">
              <div className="container container-background">
                  <div className="columns is-centered">
                      <div className="column is-6">
                          <div className="box">
                              <h2 className="title is-2 has-text-centered mb-6 newh2">
                                  Detalles de la Venta
                              </h2>
                              <div className="content cont-venta">
                                  <p className="has-text-white">
                                    <strong className="info-venta">Nombre del Usuario: </strong>
                                    {usuario.nombre}</p>
                                  <p className="has-text-white">
                                    <strong className="info-venta">Nombre del Producto: </strong>
                                    {producto.nombre}</p>
                                  <p className="has-text-white">
                                    <strong className="info-venta">Cantidad: </strong>
                                    {venta.cantidad}</p>
                                  <p className="has-text-white">
                                    <strong className="info-venta">Precio Total: </strong> 
                                    {venta.precioTotal}</p>
                                  <p className="has-text-white">
                                    <strong className="info-venta">Estado Actual: </strong>
                                    {venta.estado}</p>
                              </div>
                              <div className="field is-grouped is-grouped-centered">
                                  <div className="control">
                                      <Link to="/administracion/ventas" className="button is-link btn-form">
                                          Regresar
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

export default OneSale;
