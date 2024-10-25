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
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateComentario,
} from '../hooks/useValidations';
import axios from 'axios';
import { REACT_NATIVE_URI_BACK } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';

const ContactoEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    phone: '',
    commentary: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    phone: '',
    commentary: '',
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/contacto/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del contacto:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'nombre') {
      setErrors({
        ...errors,
        nombre: validateFullName(value) ? '' : 'Nombre inválido. Solo se permiten letras, espacios y apóstrofes.',
      });
    }

    if (name === 'email') {
      setErrors({
        ...errors,
        email: validateEmail(value) ? '' : 'Correo electrónico no válido',
      });
    }

    if (name === 'phone') {
      setErrors({
        ...errors,
        phone: validatePhone(value) ? '' : 'Número de teléfono no válido',
      });
    }

    if (name === 'commentary') {
      setErrors({
        ...errors,
        commentary: validateComentario(value) ? '' : 'Comentario no válido.',
      });
    }
  };

  const handleSubmit = async () => {
    const isNameValid = validateFullName(formData.nombre);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isComentarioValid = validateComentario(formData.commentary);

    if (isNameValid && isEmailValid && isPhoneValid && isComentarioValid) {
      try {
        await axios.put(`${REACT_NATIVE_URI_BACK}/api/contacto/${id}`, formData);
        Alert.alert('Mensaje', 'Contacto actualizado correctamente.', [
          { text: 'OK', onPress: () => navigation.navigate('ContactsList') },
        ]);
      } catch (error) {
        const errorMessage = error.response?.data?.msg || 'Error desconocido';
        Alert.alert('Error', errorMessage);
      }
    } else {
      setErrors({
        nombre: isNameValid ? '' : 'Nombre inválido. Solo se permiten letras, espacios y apóstrofes.',
        email: isEmailValid ? '' : 'Correo electrónico no válido.',
        phone: isPhoneValid ? '' : 'Número de teléfono no válido.',
        commentary: isComentarioValid ? '' : 'Comentario no válido.',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Contacto</Text>
      <Text style={styles.subtitle}>
        Por favor, completa los campos que desea actualizar del contacto.
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

      <TextInput
        style={[styles.textarea, errors.commentary && styles.inputError]}
        placeholder="Comentario"
        value={formData.commentary}
        multiline
        numberOfLines={4}
        onChangeText={(value) => handleChange('commentary', value)}
      />
      {errors.commentary && <Text style={styles.errorText}>{errors.commentary}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Actualizar Contacto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ContactsList')}>
        <Text style={styles.link}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ContactoEdit;

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
  textarea: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
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
