import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Perfil = () => {
  const [usuario, setUsuario] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/usuario/${id}`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          <p className="title">{usuario.nombre}</p>
          <p className="subtitle">{usuario.email}</p>
          <p>{usuario.phone}</p>
          <p>{usuario.direccion}</p>
          <Link to={"/cuenta/perfil/edit/"+usuario._id} className="button is-warning">Editar</Link>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
