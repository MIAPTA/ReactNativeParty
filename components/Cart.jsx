import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Modal, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart } from '../components/CartUtils'; // Asegúrate de tener esta función disponible

const Cart = ({ product, quantity }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigation = useNavigation();

  // Cargar carrito del AsyncStorage
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      setCart(savedCart ? JSON.parse(savedCart) : []);
    };
    loadCart();
  }, []);

  // Calcular el total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  // Eliminar un producto del carrito
  const removeFromCart = async (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Modificar la cantidad de un producto
  const updateQuantity = async (id, quantity) => {
    const updatedCart = cart.map(item => item.id === id ? { ...item, quantity: parseInt(quantity) } : item);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Reutilizar la función de añadir al carrito
  const handleAddToCart = () => {
    addToCart(product, quantity, setModalContent, setShowModal);
  };

  // Hacer la compra
  const handleCheckout = async () => {
    const userId = await AsyncStorage.getItem('userId');
    
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

    let errores = [];
    let totalCompra = 0;

    for (const product of cart) {
      try {
        const totalPrice = product.precio * product.quantity;
        totalCompra += totalPrice;

        const formData = {
          idProduct: product.id,
          idUser: userId,
          nameProduct: product.nombre,
          cantidad: product.quantity,
          precioTotal: totalPrice,
          estado: "Pagado"
        };

        const response = await axios.post(`${import.meta.env.VITE_URI_BACK}/api/venta`, formData);

        if (response.status !== 201) {
          errores.push(`Error al registrar el producto: ${product.nombre}`);
        }
      } catch (error) {
        console.error('Error al realizar la compra del producto:', error);
        errores.push(`Error al registrar el producto: ${product.nombre}`);
      }
    }

    if (errores.length > 0) {
      setModalContent(`Se registraron algunos errores: ${errores.join(", ")}`);
    } else {
      setModalContent("Compra registrada correctamente.");
      await AsyncStorage.setItem('totalCompra', totalCompra.toString());
      await AsyncStorage.removeItem('cart');
      setCart([]);
      navigation.navigate('CompraRealizada'); // Asegúrate de que la ruta esté definida
    }

    setShowModal(true);
  };

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tu carrito está vacío</Text>
        <Button title="Volver a la tienda" onPress={() => navigation.navigate('Tienda')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text>{item.nombre}</Text>
            <Text>{item.quantity}</Text>
            <Text>${item.precio * item.quantity}</Text>
            <Button title="Eliminar" onPress={() => removeFromCart(item.id)} color="red" />
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${getTotalPrice()}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Seguir Comprando" onPress={() => navigation.navigate('Tienda')} color="orange" />
        <Button title="Comprar" onPress={handleCheckout} color="green" />
      </View>

      {/* Modal para mostrar mensajes */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mensaje</Text>
            <Text>{modalContent}</Text>
            <Button title="Cerrar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Cart;
