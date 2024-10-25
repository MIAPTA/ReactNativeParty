import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { REACT_NATIVE_URI_BACK } from '@env';

const Sales = () => {
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const ventasPorPagina = 5;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/venta`);
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
        const ventasConUsuarios = ventas.filter((venta) => venta.idUser);
        for (const venta of ventasConUsuarios) {
          if (!usuariosMap[venta.idUser]) {
            const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/usuario/${venta.idUser}`);
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

  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredVentas = filterType ? ventas.filter((venta) => venta.estado === filterType) : ventas;
  const searchedVentas = searchTerm
    ? filteredVentas.filter((venta) =>
        venta.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (usuarios[venta.idUser] && usuarios[venta.idUser].toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredVentas;

  const currentVentas = searchedVentas.slice(
    (currentPage - 1) * ventasPorPagina,
    currentPage * ventasPorPagina
  );

  const renderVenta = ({ item }) => (
    <View style={styles.ventaItem}>
      <Text style={styles.ventaText}>Usuario: {usuarios[item.idUser]}</Text>
      <Text style={styles.ventaText}>Producto: {item.nameProduct}</Text>
      <Text style={styles.ventaText}>Cantidad: {item.cantidad}</Text>
      <Text style={styles.ventaText}>Precio Total: {item.precioTotal}</Text>
      <Text style={styles.ventaText}>Fecha del Tramite: {formatFecha(item.createdAt)}</Text>
      <Text style={styles.ventaText}>Estado: {item.estado}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate('SaleDetails', { saleId: item._id })}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('SaleEdit', { saleId: item._id })}
        >
          <Text style={styles.buttonText}>Editar Estado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filterType}
          style={styles.picker}
          onValueChange={(itemValue) => setFilterType(itemValue)}
        >
          <Picker.Item label="Todos" value="" />
          <Picker.Item label="Pagado" value="Pagado" />
          <Picker.Item label="Despachado" value="Despachado" />
          <Picker.Item label="Finalizado" value="Finalizado" />
        </Picker>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto o usuario..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <FlatList
        data={currentVentas}
        renderItem={renderVenta}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <Text style={styles.paginationText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>Página {currentPage}</Text>
        <TouchableOpacity
          disabled={currentPage >= Math.ceil(searchedVentas.length / ventasPorPagina)}
          onPress={() => setCurrentPage((prev) => prev + 1)}
        >
          <Text style={styles.paginationText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sales;

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
  picker: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  ventaItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  ventaText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationText: {
    fontSize: 16,
  },
});
