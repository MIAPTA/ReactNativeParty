import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const CompraRealizada = () => {
  const [usuario, setUsuario] = useState({});
  const [totalCompra, setTotalCompra] = useState(0); // Añadimos un estado para el total de la compra

  // Aquí podrías obtener el ID del usuario actual desde el localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Obtener los detalles del usuario
        const usuarioResponse = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/usuario/${userId}`);
        setUsuario(usuarioResponse.data);
        
        // Obtener el total de la compra desde localStorage
        const totalCompraLocal = localStorage.getItem('totalCompra');
        setTotalCompra(totalCompraLocal || 0);
      } catch (error) {
        console.error("Error al obtener los detalles del usuario:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <section className="section section-register">
      <div className="container container-background">
        <div className="columns is-centered">
          <div className="column is-6">
            <div className="box">
              <h2 className="title is-2 has-text-centered mb-6 newh2">
                Compra realizada
              </h2>
              <div className="content cont-venta">
                <p className="has-text-white">
                  <strong className="info-venta">Nombre del Usuario: </strong>
                  {usuario.nombre}
                </p>
                <p className="has-text-white">
                  <strong className="info-venta">Gracias por tu compra.</strong>
                </p>
                <p className="has-text-white">
                  <strong className="info-venta">Precio Total de la compra: </strong>
                  ${totalCompra} COP
                </p>
              </div>
              <div className="field is-grouped is-grouped-centered">
                <div className="control">
                  <Link to="/tienda" className="button is-link btn-form">
                    Volver a la tienda
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompraRealizada;
