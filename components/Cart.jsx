import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'; // Asegúrate de tener axios importado
import { addToCart } from './cartUtils'; // Importa la función de utilidad
import { useNavigate } from 'react-router-dom';

const Cart = ({ product, quantity }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate(); // Mover fuera de handleCheckout para usar correctamente el hook

  // Cargar carrito del localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Calcular el total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  // Eliminar un producto del carrito
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Modificar la cantidad de un producto
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item => item.id === id ? { ...item, quantity: parseInt(quantity) } : item);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Reutilizar la función de añadir al carrito
  const handleAddToCart = () => {
    addToCart(product, quantity, setModalContent, setShowModal); // Reutiliza la función de utilidad
  };

  // Hacer la compra (realiza el POST al backend para cada producto)
  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      setModalContent("Para realizar una compra, debes iniciar sesión.");
      setShowModal(true);
      return;
    }

    if (cart.length === 0) {
      setModalContent("El carrito está vacío.");
      setShowModal(true);
      return;
    }

    let errores = []; // Para capturar errores si los hay
    let totalCompra = 0; // Para calcular el total de la compra

    // Enviamos cada producto al backend uno por uno
    for (const product of cart) {
      try {
        const totalPrice = product.precio * product.quantity;
        totalCompra += totalPrice;

        // Prepara los datos de cada producto para enviarlos al backend
        const formData = {
          idProduct: product.id,
          idUser: userId,
          nameProduct: product.nombre,
          cantidad: product.quantity,
          precioTotal: totalPrice,
          estado: "Pagado"
        };

        // Enviar producto individualmente al backend
        const response = await axios.post(`${import.meta.env.VITE_URI_BACK}/api/venta`, formData);

        if (response.status !== 201) {
          errores.push(`Error al registrar el producto: ${product.nombre}`);
        }
      } catch (error) {
        console.error('Error al realizar la compra del producto:', error);
        errores.push(`Error al registrar el producto: ${product.nombre}`);
      }
    }

    // Mostrar los resultados en el modal
    if (errores.length > 0) {
      setModalContent(`Se registraron algunos errores: ${errores.join(", ")}`);
    } else {
      setModalContent("Compra registrada correctamente.");
      localStorage.setItem('totalCompra', totalCompra); // Guardar el total de la compra
      localStorage.removeItem('cart'); // Limpiar el carrito después de la compra
      setCart([]); // Limpiar el estado del carrito
      navigate(`/compra-realizada`); // Redirigir a la página de confirmación
    }

    setShowModal(true);
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <br />
        <h2 className="cart-title">Tu carrito está vacío</h2>
        <Link to="/tienda" className="button is-info">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <br />
      <h2 className="cart-title">Carrito de Compras</h2>
      {cart.map(item => (
        <div key={item.id} className="columns is-vcentered">
          <div className="column">
            <img src={item.imagen} alt={item.nombre} style={{ width: '100px' }} />
          </div>
          <div className="column">
            {item.nombre}
          </div>
          <div className="column">
            {item.quantity}
          </div>
          <div className="column">
            ${item.precio * item.quantity}
          </div>
          <div className="column">
            <button className="button is-danger" onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </div>
        </div>
      ))}
      <hr />
      <h3>Total: ${getTotalPrice()}</h3>
      <div>
        <Link to="/tienda" className="button is-warning">Seguir Comprando</Link>
        <button className="button is-success" onClick={handleCheckout}>Comprar</button>
      </div>

      {/* Modal para mostrar mensajes */}
      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background" onClick={() => setShowModal(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Mensaje</p>
            <button className="delete" aria-label="close" onClick={() => setShowModal(false)}></button>
          </header>
          <section className="modal-card-body">
            <p>{modalContent}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;
