import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { REACT_NATIVE_URI_BACK } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateComentario,
} from '../hooks/useValidations';

const PerfilEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    phone: '',
    tipoUsuario: '',
    direccion: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    phone: '',
    tipoUsuario: '',
    direccion: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/usuario/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    let isValid;
    switch (name) {
      case 'nombre':
        isValid = validateFullName(value);
        setErrors({ ...errors, nombre: isValid ? '' : 'Nombre inválido.' });
        break;
      case 'email':
        isValid = validateEmail(value);
        setErrors({ ...errors, email: isValid ? '' : 'Correo electrónico no válido.' });
        break;
      case 'phone':
        isValid = validatePhone(value);
        setErrors({ ...errors, phone: isValid ? '' : 'Número de teléfono no válido.' });
        break;
      case 'direccion':
        isValid = validateComentario(value);
        setErrors({ ...errors, direccion: isValid ? '' : 'Dirección no válida.' });
        break;
    }
  };

  const handleSubmit = async () => {
    const isNameValid = validateFullName(formData.nombre);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isDireccionValid = validateComentario(formData.direccion);

    if (isNameValid && isEmailValid && isPhoneValid && isDireccionValid) {
      try {
        await axios.put(`${REACT_NATIVE_URI_BACK}/api/usuario/${id}`, formData);
        Alert.alert('Mensaje', 'Usuario actualizado correctamente.', [
          { text: 'OK', onPress: () => navigation.navigate('Profile') },
        ]);
      } catch (error) {
        const errorMessage = error.response?.data?.msg || 'Error desconocido';
        Alert.alert('Error', errorMessage);
      }
    } else {
      Alert.alert('Error', 'Por favor, corrija los errores en el formulario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <Text style={styles.subtitle}>Por favor, completa los campos para actualizar el usuario.</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={formData.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />
      {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={formData.phone}
        onChangeText={(value) => handleChange('phone', value)}
        keyboardType="phone-pad"
      />
      {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={formData.direccion}
        onChangeText={(value) => handleChange('direccion', value)}
      />
      {errors.direccion ? <Text style={styles.errorText}>{errors.direccion}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.link}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PerfilEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});
