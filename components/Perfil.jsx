// Perfil.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Perfil = ({ userId }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_NATIVE_BACKEND_URL}/api/usuario/${userId}`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  if (!usuario) {
    return <Text style={styles.loadingText}>Cargando perfil...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{usuario.nombre}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{usuario.email}</Text>
      <Text style={styles.label}>Teléfono:</Text>
      <Text style={styles.value}>{usuario.phone}</Text>
      <Text style={styles.label}>Dirección:</Text>
      <Text style={styles.value}>{usuario.direccion}</Text>
      <Text style={styles.label}>Tipo de Usuario:</Text>
      <Text style={styles.value}>{usuario.tipoUsuario}</Text>
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
