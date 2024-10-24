import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { validateFullName, validateEmail, validatePhone } from '../hooks/useValidations'; // Asegúrate de tener estas validaciones disponibles

const Inicio = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    phone: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'nombre') {
      const isValid = validateFullName(value);
      setErrors({
        ...errors,
        nombre: isValid
          ? ''
          : 'Nombre inválido. Solo se permiten letras, espacios y apóstrofes.'
      });
    }

    if (name === 'email') {
      const isValid = validateEmail(value);
      setErrors({
        ...errors,
        email: isValid ? '' : 'Correo electrónico no válido.'
      });
    }

    if (name === 'phone') {
      const isValid = validatePhone(value);
      setErrors({
        ...errors,
        phone: isValid ? '' : 'Número de teléfono no válido.'
      });
    }
  };

  const handleSubmit = async () => {
    const isNombreValid = validateFullName(formData.nombre);
    const isEmailValid = validateEmail(formData.email);

    if (isNombreValid && isEmailValid) {
      try {
        const response = await axios.post(
          process.env.VITE_URI_BACK + '/api/contacto/',
          formData
        );
        setModalContent('Contacto registrado correctamente.');
        setShowModal(true);
      } catch (error) {
        const errorMessage = error.response?.data?.msg || 'Error desconocido';
        setModalContent(errorMessage);
        setShowModal(true);
      }
    } else {
      setErrors({
        nombre: isNombreValid
          ? ''
          : 'Nombre inválido. Solo se permiten letras, espacios y apóstrofes.',
        email: isEmailValid ? '' : 'Correo electrónico no válido.'
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Imagen principal */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/Party.jpg')} style={styles.image} />
      </View>

      {/* Promociones */}
      <View style={styles.promoContainer}>
        <Text style={styles.promoTitle}>
          ¡Sí Hay Productos Para Fiestas, De Todos Los Tipos!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tienda')}
        >
          <Text style={styles.buttonText}>Ver Productos</Text>
        </TouchableOpacity>
      </View>

      {/* Sección Nosotros */}
      <View style={styles.nosotrosBox}>
        <Text style={styles.title}>¿Quiénes somos?</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Nosotros')}
        >
          <Text style={styles.buttonText}>Conocer más</Text>
        </TouchableOpacity>
      </View>

      {/* Formulario de Ofertas */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Recibe nuestras ofertas y descuentos</Text>

        <TextInput
          style={[styles.input, errors.nombre ? styles.inputError : null]}
          placeholder="Nombre Completo"
          onChangeText={(value) => handleChange('nombre', value)}
        />
        {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}

        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          onChangeText={(value) => handleChange('email', value)}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : null]}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          onChangeText={(value) => handleChange('phone', value)}
        />
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de confirmación */}
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

export default Inicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  promoContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  nosotrosBox: {
    marginVertical: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10
  },
  formContainer: {
    marginVertical: 20
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  },
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    fontSize: 12
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center'
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  closeButton: {
    fontSize: 16,
    color: '#007BFF'
  }
});
