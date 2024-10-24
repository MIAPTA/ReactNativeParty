import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Pagination } from './Pagination';
import axios from 'axios';

const Compras = () => {
  const userId = localStorage.getItem("userId")
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_URI_BACK+"/api/venta/byUserId/"+userId);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los registros de ventas:', error);
      }
    };

    fetchProducts();
  }, []);

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

  const filteredProducts = filterType ? products.filter(product => product.estado === filterType) : products;
  const searchedProducts = searchTerm
    ? filteredProducts.filter(product =>
        product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
                                        placeholder="Ingrese el nombre del producto a buscar..."
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
            {currentProducts.map(product => (
                <tr key={product._id}>
                <td>{product.nameProduct}</td>
                <td>{product.cantidad}</td>
                <td>{product.precioTotal}</td>
                <td>{formatFecha(product.createdAt)}</td>
                {/* <td>{product.createdAt !== product.updatedAt ? formatFecha(product.updatedAt) : ""}</td> */}
                <td>{product.estado}</td>
                <td className="td-opcion">
                    <Link to={"/cuenta/compras/"+product._id} className="button is-success btn-opcion">
                        Ver
                    </Link>
                </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="paginator">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={searchedProducts.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  )
}

export default Compras