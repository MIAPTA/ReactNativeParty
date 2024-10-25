import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { addToCart } from '../components/CartUtils'; // Importa la función de utilidad
import { REACT_NATIVE_URI_BACK } from '@env';

const OneProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Por defecto, 1 producto seleccionado
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; // Usamos `useRoute` para obtener los parámetros de navegación

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/producto/${id}`);
        setShowModal(false);
        setProduct(response.data);
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.msg || "Error desconocido";
          setModalContent(errorMessage);
          setShowModal(true);
        }
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return null; // Puedes mostrar un indicador de carga aquí si lo prefieres
  }

  const handleQuantityChange = (newQuantity) => {
    // Si el campo de texto está vacío, setear la cantidad a 0
    if (newQuantity === '') {
      setQuantity(0);
    } else {
      // Validar si el valor ingresado es un número válido
      const quantityNumber = parseInt(newQuantity);

      // Si es un número válido, actualizar la cantidad
      if (!isNaN(quantityNumber) && quantityNumber >= 0) {
        setQuantity(quantityNumber);
      }
    }
  };

  const handleAddToCart = () => {
    // Asegurarse de que la cantidad sea al menos 1 antes de añadir al carrito
    if (quantity <= 0) {
      setModalContent("Debes añadir al menos 1 producto.");
      setShowModal(true);
      return;
    }
    addToCart(product, quantity, setModalContent, setShowModal); // Reutiliza la función de utilidad
  };

  const handleGoBack = () => {
    navigation.goBack(); // Volver a la página anterior
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imagen }} style={styles.productImage} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.productTitle}>{product.nombre}</Text>
        <Text style={styles.productDescription}>{product.descripcion}</Text>

        {product.cantidad > 0 ? (
          <View style={styles.quantityContainer}>
            <Text style={styles.label}>Cantidad:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={quantity.toString()}
              onChangeText={handleQuantityChange}
            />
            <Text style={styles.price}>${(product.precio) * quantity} COP</Text>

            <View style={styles.buttonContainer}>
              <Button title="Añadir al carro" onPress={handleAddToCart} />
              <Button title="Seguir comprando" onPress={handleGoBack} />
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Text style={styles.cartButton}>Ir al carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.outOfStock}>Agotado</Text>
        )}
      </View>

      {/* Modal para mensajes */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Mensaje</Text>
            <Text>{modalContent}</Text>
            <Button title="Cerrar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos para React Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  descriptionContainer: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  productDescription: {
    color: '#fff',
    marginBottom: 16,
  },
  quantityContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  price: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  cartButton: {
    color: '#007BFF',
    marginTop: 10,
  },
  outOfStock: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default OneProduct;
