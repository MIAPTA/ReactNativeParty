// cartUtils.js
export const addToCart = (product, quantity, setModalContent, setShowModal) => {
    // Verificar si la cantidad solicitada es mayor que la cantidad disponible en el producto
    if (quantity > product.cantidad) {
      setModalContent("No hay suficiente producto en el inventario para realizar esta compra.");
      setShowModal(true);
      return;
    }
  
    const productToAdd = {
      id: product._id,
      nombre: product.nombre,
      imagen: product.imagen,
      precio: product.precio,
      quantity: quantity,
    };
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);
  
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push(productToAdd);
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    setModalContent("Producto añadido al carrito."); // Mostrar mensaje de éxito en el modal
    setShowModal(true);
  };
  