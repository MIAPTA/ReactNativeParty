import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { REACT_NATIVE_URI_BACK } from '@env';

const Confirmar = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { token } = route.params;

  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmarUsuario = async () => {
      try {
        await axios.get(`${REACT_NATIVE_URI_BACK}/api/usuario/confirmar/${token}`);
        setConfirmado(true);
      } catch (error) {
        setError("Error al confirmar usuario");
      }
    };

    confirmarUsuario();
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {confirmado ? (
          <>
            <Text style={styles.title}>Usuario Confirmado</Text>
            <Text style={styles.subtitle}>
              El Usuario ha sido confirmado correctamente, ya puedes volver a loguearte.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
          </>
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <>
            <Text style={styles.confirmingText}>Confirmando el usuario...</Text>
            <ActivityIndicator size="large" color="#FF5733" />
          </>
        )}
      </View>
    </View>
  );
};

export default Confirmar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: '100%',
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmingText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
