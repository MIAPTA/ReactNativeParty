import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Picker,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { REACT_NATIVE_URI_BACK } from '@env';

const Compras = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 5;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      const userId = await AsyncStorage.getItem('userId');
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/venta/byUserId/${userId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los registros de ventas:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (value) => setFilterType(value);
  const handleSearchChange = (value) => setSearchTerm(value);

  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredProducts = filterType
    ? products.filter((product) => product.estado === filterType)
    : products;

  const searchedProducts = searchTerm
    ? filteredProducts.filter((product) =>
        product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  const indexOfLastProduct = currentPage * productsPerPage;
  const currentProducts = searchedProducts.slice(
    indexOfLastProduct - productsPerPage,
    indexOfLastProduct
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productText}>Producto: {item.nameProduct}</Text>
      <Text style={styles.productText}>Cantidad: {item.cantidad}</Text>
      <Text style={styles.productText}>Precio Total: {item.precioTotal}</Text>
      <Text style={styles.productText}>Fecha: {formatFecha(item.createdAt)}</Text>
      <Text style={styles.productText}>Estado: {item.estado}</Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate('OneCompra', { id: item._id })}
      >
        <Text style={styles.buttonText}>Ver</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Filtrar por Estado:</Text>
        <Picker selectedValue={filterType} onValueChange={handleFilterChange} style={styles.picker}>
          <Picker.Item label="Todos" value="" />
          <Picker.Item label="Pagado" value="Pagado" />
          <Picker.Item label="Despachado" value="Despachado" />
          <Picker.Item label="Finalizado" value="Finalizado" />
        </Picker>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre del producto"
        value={searchTerm}
        onChangeText={handleSearchChange}
      />
      <FlatList
        data={currentProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          <Text style={styles.paginationText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>Página {currentPage}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= searchedProducts.length}
        >
          <Text style={styles.paginationText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Compras;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  filterContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  list: {
    flex: 1,
  },
  productContainer: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
  },
  viewButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  paginationText: {
    fontSize: 16,
    color: '#007BFF',
  },
});
