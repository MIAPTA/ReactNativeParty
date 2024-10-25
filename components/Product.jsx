import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { REACT_NATIVE_URI_BACK } from '@env';

const Product = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/producto`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${REACT_NATIVE_URI_BACK}/api/producto/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      Alert.alert('Producto eliminado');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const filteredProducts = filterType ? products.filter((product) => product.tipo === filterType) : products;
  const searchedProducts = searchTerm
    ? filteredProducts.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  const currentProducts = searchedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productText}>Nombre: {item.nombre}</Text>
      <Image source={{ uri: item.imagen }} style={styles.productImage} />
      <Text style={styles.productText}>Descripción: {item.descripcion}</Text>
      <Text style={styles.productText}>Cantidad: {item.cantidad}</Text>
      <Text style={styles.productText}>Precio: {item.precio}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('ProductEdit', { productId: item._id })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('ProductCreate')}
        >
          <Text style={styles.buttonText}>Crear Producto</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <FlatList
        data={currentProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginLeft: 10,
  },
  productItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
