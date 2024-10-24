import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Pagination } from './Pagination';
import axios from 'axios';

const Usuario = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const userPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/usuario`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URI_BACK}/api/usuario/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = filterType ? users.filter(user => user.tipoUsuario === filterType) : users;
  const searchedUsers = searchTerm
    ? filteredUsers.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredUsers;

  const indexOfLastProduct = currentPage * userPerPage;
  const indexOfFirstProduct = indexOfLastProduct - userPerPage;
  const currentUsers = searchedUsers.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="container">
        <div className="columns">
            <div className="column is-fullheight">
                <div className="section">
                    <div className="columns">
                        <div className="column">
                            <Link to="/administracion/usuarios/register" className="button is-info">Crear Usuario</Link>
                        </div>
                        <div className="column">
                            <div className="field">
                                <div className="control container-filtro">
                                    <label className="label-text">Filtrar por tipo de Usuario:</label>
                                    <div className="select">
                                        <select onChange={handleFilterChange}>
                                          <option value="">Todos</option>
                                          <option value="Administrador">Administrador</option>
                                          <option value="Cliente">Cliente</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="field container-search">
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input is-info"
                                        placeholder="Ingrese el nombre del usuario a buscar..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Número de Contacto</th>
                <th>Dirección</th>
                <th>Tipo de Usuario</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
            {currentUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.direccion}</td>
                  <td>{user.tipoUsuario}</td>
                  {console.log(user.confirmado)}
                  <td>
                    {user.token === "" ? "Confirmado" : "No Confirmado"}
                  </td>
                  <td className="td-opcion">
                      <Link to={"/administracion/usuarios/edit/"+user._id} className="button is-warning btn-opcion">Editar</Link>
                      <button onClick={() => handleDelete(user._id)} className="button is-danger btn-opcion">Eliminar</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="paginator">
          <Pagination
            productsPerPage={userPerPage}
            totalProducts={searchedUsers.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  )
}

export default Usuario