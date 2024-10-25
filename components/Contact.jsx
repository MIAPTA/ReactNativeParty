import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { REACT_NATIVE_URI_BACK } from '@env';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateComentario,
} from '../hooks/useValidations';
import { useNavigation } from '@react-navigation/native';

const Contact = () => {
  const navigation = useNavigation();
  
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

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'nombre') {
      const isValid = validateFullName(value);
      setErrors({
        ...errors,
        nombre: isValid
          ? ''
          : 'Nombre inválido. Solo se permiten letras, espacios y apóstrofes.',
      });
    }

    if (name === 'email') {
      const isValid = validateEmail(value);
      setErrors({
        ...errors,
        email: isValid ? '' : 'Correo electrónico no válido.',
      });
    }

    if (name === 'phone') {
      const isValid = validatePhone(value);
      setErrors({
        ...errors,
        phone: isValid ? '' : 'Número de teléfono no válido.',
      });
    }

    if (name === 'commentary') {
      const isValid = validateComentario(value);
      setErrors({
        ...errors,
        commentary: isValid ? '' : '¡Debes escribir algún comentario!',
      });
    }
  };

  const handleSubmit = async () => {
    const isNameValid = validateFullName(formData.nombre);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isComentarioValid = validateComentario(formData.commentary);

    if (isEmailValid && isNameValid && isPhoneValid && isComentarioValid) {
      try {
        const response = await axios.post(
          `${REACT_NATIVE_URI_BACK}/api/contacto/`,
          formData
        );
        setModalContent('Contacto registrado correctamente.');
        setShowModal(true);
      } catch (error) {
        const errorMessage =
          error.response?.data?.msg || 'Error desconocido';
        setModalContent(errorMessage);
        setShowModal(true);
      }
    } else {
      setErrors({
        nombre: isNameValid
          ? ''
          : 'Nombre inválido. Solo se permiten letras, espacios y apóstrofes.',
        email: isEmailValid ? '' : 'Correo electrónico no válido.',
        phone: isPhoneValid ? '' : 'Número de teléfono no válido.',
        commentary: isComentarioValid ? '' : '¡Debes escribir algún comentario!',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Contacto</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>
          ¡Queremos estar en Contacto Contigo!
        </Text>
        <Text style={styles.subtitle}>
          Por favor, complete el siguiente formulario y pronto nos podremos en
          contacto.
        </Text>

        <TextInput
          style={[styles.input, errors.nombre && styles.inputError]}
          placeholder="Nombre Completo"
          value={formData.nombre}
          onChangeText={(value) => handleChange('nombre', value)}
        />
        {errors.nombre ? (
          <Text style={styles.errorText}>{errors.nombre}</Text>
        ) : null}

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(value) => handleChange('phone', value)}
        />
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}

        <TextInput
          style={[styles.textarea, errors.commentary && styles.inputError]}
          placeholder="Escriba su comentario aquí"
          multiline
          numberOfLines={4}
          value={formData.commentary}
          onChangeText={(value) => handleChange('commentary', value)}
        />
        {errors.commentary ? (
          <Text style={styles.errorText}>{errors.commentary}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar Contacto</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: '#007BFF',
  },
});
