import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  validateFullName,
  validateEmail,
  validatePhone,
} from '../hooks/useValidations';
import axios from 'axios';
import { REACT_NATIVE_URI_BACK } from '@env';
import { useNavigation } from '@react-navigation/native';

const ContactoRegister = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    phone: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'nombre') {
      const isValid = validateFullName(value);
      setErrors({
        ...errors,
        nombre: isValid ? '' : 'Nombre inválido. Solo se permiten letras, espacios y apóstrofes.',
      });
    }

    if (name === 'email') {
      const isValid = validateEmail(value);
      setErrors({
        ...errors,
        email: isValid ? '' : 'Correo electrónico no válido',
      });
    }

    if (name === 'phone') {
      const isValid = validatePhone(value);
      setErrors({
        ...errors,
        phone: isValid ? '' : 'Número de teléfono no válido',
      });
    }
  };

  const handleSubmit = async () => {
    const isNameValid = validateFullName(formData.nombre);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);

    if (isNameValid && isEmailValid && isPhoneValid) {
      try {
        await axios.post(`${REACT_NATIVE_URI_BACK}/api/contacto`, formData);
        Alert.alert('Mensaje', 'Contacto registrado correctamente.', [
          { text: 'OK', onPress: () => navigation.navigate('ContactsList') },
        ]);
      } catch (error) {
        const errorMessage = error.response?.data?.msg || 'Error desconocido';
        Alert.alert('Error', errorMessage);
      }
    } else {
      setErrors({
        nombre: isNameValid
          ? ''
          : 'Nombre inválido. Solo se permiten letras, espacios y apóstrofes.',
        email: isEmailValid ? '' : 'Correo electrónico no válido.',
        phone: isPhoneValid ? '' : 'Número de teléfono no válido.',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Contacto</Text>
      <Text style={styles.subtitle}>
        Por favor, complete los siguientes campos para crear el contacto.
      </Text>

      <TextInput
        style={[styles.input, errors.nombre && styles.inputError]}
        placeholder="Nombre Completo"
        value={formData.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Correo Electrónico"
        value={formData.email}
        keyboardType="email-address"
        onChangeText={(value) => handleChange('email', value)}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder="Teléfono"
        value={formData.phone}
        keyboardType="phone-pad"
        onChangeText={(value) => handleChange('phone', value)}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Contacto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ContactsList')}>
        <Text style={styles.link}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ContactoRegister;

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
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
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
