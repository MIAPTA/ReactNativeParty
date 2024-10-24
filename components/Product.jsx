import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Pagination } from './Pagination';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/producto`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URI_BACK}/api/producto/${id}`);
      setProducts(products.filter(product => product._id !== id));
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

  const filteredProducts = filterType ? products.filter(product => product.tipo === filterType) : products;
  const searchedProducts = searchTerm
    ? filteredProducts.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <Link to="/administracion/productos/register" className="button is-info">Crear Producto</Link>
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
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
            {currentProducts.map(product => (
                <tr key={product._id}>
                <td>{product.nombre}</td>
                {/* <td>{product.nombre+".jpg"}</td> */}
                <td className='td-imagen'><img src={product.imagen} alt={product.nombre} /></td>
                <td>{product.descripcion}</td>
                <td>{product.cantidad}</td>
                <td>{product.precio}</td>
                <td className="td-opcion">
                    <Link to={"../productos/"+product._id} className="button is-success btn-opcion" target="_blank">
                        Ver
                    </Link>
                    <Link to={"/administracion/productos/edit/"+product._id} className="button is-warning btn-opcion">Editar</Link>
                    <button onClick={() => handleDelete(product._id)} className="button is-danger btn-opcion">Eliminar</button>
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

export default Product;
