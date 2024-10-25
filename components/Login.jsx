import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { validateEmail, validatePassword } from '../hooks/useValidations';
import axios from 'axios';
import { REACT_NATIVE_URI_BACK } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

let token = "";
let tipoUsuario = "";

const Login = ({ setId, setName, setLogin, setType }) => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showSendEmailForm, setShowSendEmailForm] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') {
      const isValid = validateEmail(value);
      setErrors({
        ...errors,
        email: isValid ? '' : 'Correo electrónico no válido.',
      });
    }

    if (name === 'password') {
      const isValid = validatePassword(value);
      setErrors({
        ...errors,
        password: isValid ? '' : 'La Contraseña no es válida.',
      });
    }
  };

  const handleSubmit = async () => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(`${REACT_NATIVE_URI_BACK}/api/usuario/login`, formData);
        tipoUsuario = response.data.tipoUsuario;
        setShowModal(false);
        setId(response.data._id);
        setName(response.data.nombre);
        setLogin("true");
        setType(response.data.tipoUsuario);

        await AsyncStorage.setItem("userId", response.data._id);
        await AsyncStorage.setItem("userName", response.data.nombre);
        await AsyncStorage.setItem("userType", response.data.tipoUsuario);

        if (tipoUsuario === "Administrador" || tipoUsuario === "Cliente") {
          navigation.navigate("Inicio");
        }
      } catch (error) {
        if (error.response) {
          token = error.response.data.token || "Error desconocido";
          if (error.response.status === 403) {
            setModalContent("Para poder iniciar sesión con este Usuario, por favor haz clic en el enlace que se enviará al correo electrónico previamente proporcionado.");
            setShowSendEmailForm(true);
          } else {
            setModalContent(error.response.data.msg);
            setShowSendEmailForm(false);
          }
          setShowModal(true);
        }
      }
    } else {
      setErrors({
        email: isEmailValid ? '' : 'Correo electrónico no válido.',
        password: isPasswordValid ? '' : 'Contraseña no es válida.',
      });
      setShowSendEmailForm(false);
    }
  };

  // La función sendEmail está comentada, ya que no es compatible con React Native
  // Deberías mover esta funcionalidad a una API en tu backend

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inicio de Sesión</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Contraseña"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>
          ¿No tiene cuenta?
          <Text style={styles.link} onPress={() => navigation.navigate('RegisterUser')}> Da click aquí.</Text>
        </Text>
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
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
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
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
