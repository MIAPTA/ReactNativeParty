import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Pagination } from './Pagination';
import axios from 'axios';

const Sales = () => {
  const [ventas, setVentas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState({});

  const ventasPorPagina = 5;

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/venta`);
        setVentas(response.data);
      } catch (error) {
        console.error('Error al obtener los registros de ventas:', error);
      }
    };

    fetchVentas();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuariosMap = {};
      try {
        const ventasConUsuarios = ventas.filter(venta => venta.idUser);
        for (const venta of ventasConUsuarios) {
          if (!usuariosMap[venta.idUser]) {
            const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/usuario/${venta.idUser}`);
            usuariosMap[venta.idUser] = response.data.nombre;
          }
        }
        setUsuarios(usuariosMap);
      } catch (error) {
        console.error('Error al obtener los nombres de usuario:', error);
      }
    };

    fetchUsuarios();
  }, [ventas]);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return fecha.toLocaleDateString('es-ES', options);
  };

  const filteredVentas = filterType ? ventas.filter(venta => venta.estado === filterType) : ventas;
  const searchedVentas = searchTerm
  ? filteredVentas.filter(venta =>
      venta.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (usuarios[venta.idUser] && usuarios[venta.idUser].toLowerCase().includes(searchTerm.toLowerCase()))
    )
  : filteredVentas;

  const indexOfLastVenta = currentPage * ventasPorPagina;
  const indexOfFirstVenta = indexOfLastVenta - ventasPorPagina;
  const ventasActuales = searchedVentas.slice(indexOfFirstVenta, indexOfLastVenta);

  return (
    <>
      <div className="container">
        <div className="columns">
            <div className="column is-fullheight">
                <div className="section">
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <div className="control container-filtro">
                                    <label className="label-text">Filtrar por el estado de Venta:</label>
                                    <div className="select">
                                        <select onChange={handleFilterChange}>
                                          <option value="">Todos</option>
                                          <option value="Pagado">Pagado</option>
                                          <option value="Despachado">Despachado</option>
                                          <option value="Finalizado">Finalizado</option>
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
                                        placeholder="Ingrese el nombre del producto o del usuario a buscar..."
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
                <th>Nombre del Usuario</th>
                <th>Nombre del Producto</th>
                <th>Cantidad</th>
                <th>Precio Total</th>
                <th>Fecha del Tramite</th>
                {/* <th>Fecha de Fin</th> */}
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
            {ventasActuales.map(venta => (
                <tr key={venta._id}>
                <td>{usuarios[venta.idUser]}</td>
                <td>{venta.nameProduct}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.precioTotal}</td>
                <td>{formatFecha(venta.createdAt)}</td>
                {/* <td>{venta.createdAt !== venta.updatedAt ? formatFecha(venta.updatedAt) : ""}</td> */}
                <td>{venta.estado}</td>
                <td className="td-opcion">
                    <Link to={"/administracion/ventas/"+venta._id} className="button is-success btn-opcion">
                        Ver
                    </Link>
                    <Link to={"/administracion/ventas/edit/"+venta._id} className="button is-warning btn-opcion">Editar Estado</Link>
                </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="paginator">
          <Pagination
            productsPerPage={ventasPorPagina}
            totalProducts={searchedVentas.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  )
}

export default Sales;
