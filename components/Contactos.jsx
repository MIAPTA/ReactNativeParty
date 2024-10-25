import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_URI_BACK } from '@env';

const Contactos = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const userPerPage = 20;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/contacto`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los contactos:', error);
      }
    };

    fetchContactos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${REACT_NATIVE_URI_BACK}/api/contacto/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      Alert.alert('Contacto eliminado', 'El contacto ha sido eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar el contacto:', error);
    }
  };

  const handleSearchChange = (value) => setSearchTerm(value);
  const handleFilterChange = (value) => setFilterType(value);

  const filteredUsers = filterType
    ? users.filter((user) => user.tipoUsuario === filterType)
    : users;

  const searchedUsers = searchTerm
    ? filteredUsers.filter((user) =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredUsers;

  const indexOfLastProduct = currentPage * userPerPage;
  const currentUsers = searchedUsers.slice(
    indexOfLastProduct - userPerPage,
    indexOfLastProduct
  );

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userText}>Nombre: {item.nombre}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <Text style={styles.userText}>Número: {item.phone}</Text>
      <Text style={styles.userText}>Comentario: {item.commentary}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('ContactoEdit', { id: item._id })}
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
          onPress={() => navigation.navigate('ContactoRegister')}
        >
          <Text style={styles.buttonText}>Crear Contacto</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>
      <FlatList
        data={currentUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>Página {currentPage}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= searchedUsers.length}
        >
          <Text style={styles.paginationText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contactos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  userContainer: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
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
