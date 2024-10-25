// cartUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToCart = async (product, quantity, setModalContent, setShowModal) => {
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

  // Cargar el carrito existente del AsyncStorage
  const savedCart = await AsyncStorage.getItem('cart');
  const cart = savedCart ? JSON.parse(savedCart) : [];
  const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);

  if (existingProductIndex !== -1) {
    // Si el producto ya existe, aumentar la cantidad
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Si no existe, agregar el nuevo producto
    cart.push(productToAdd);
  }

  // Guardar el carrito actualizado en AsyncStorage
  await AsyncStorage.setItem('cart', JSON.stringify(cart));
  setModalContent("Producto añadido al carrito."); // Mostrar mensaje de éxito en el modal
  setShowModal(true);
};
