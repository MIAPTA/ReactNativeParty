import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  validateFullName,
  validatePhone,
  validateComentario,
} from '../hooks/useValidations';
import axios from 'axios';
import { REACT_NATIVE_URI_BACK } from '@env';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductEditForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [formData, setFormData] = useState({
    nombre: '',
    imagen: '',
    descripcion: '',
    cantidad: '',
    precio: '',
    estado: 'on',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    imagen: '',
    descripcion: '',
    cantidad: '',
    precio: '',
    estado: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/producto/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
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
      const isValid = validateFullName(value);
      setErrors({
        ...errors,
        nombre: isValid ? '' : 'Nombre inválido. Solo se permiten letras y espacios.',
      });
    }

    if (name === 'descripcion') {
      const isValid = validateComentario(value);
      setErrors({
        ...errors,
        descripcion: isValid ? '' : 'La descripción no es válida.',
      });
    }

    if (name === 'cantidad') {
      const isValid = validatePhone(value);
      setErrors({
        ...errors,
        cantidad: isValid ? '' : 'La cantidad en (kg) no es válida.',
      });
    }

    if (name === 'precio') {
      const isValid = validatePhone(value);
      setErrors({
        ...errors,
        precio: isValid ? '' : 'El precio no es válido.',
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setFormData({
        ...formData,
        imagen: `data:image/jpeg;base64,${result.base64}`,
      });
      setSelectedFile(result.uri);
    }
  };

  const handleSubmit = async () => {
    const isNameValid = validateFullName(formData.nombre);
    const isDescripcionValid = validateComentario(formData.descripcion);
    const isCantidadValid = validatePhone(formData.cantidad);
    const isPrecioValid = validatePhone(formData.precio);

    if (isNameValid && isDescripcionValid && isCantidadValid && isPrecioValid) {
      try {
        const response = await axios.put(`${REACT_NATIVE_URI_BACK}/api/producto/${id}`, formData);
        setModalContent('Producto actualizado correctamente.');
        setShowModal(true);
      } catch (error) {
        const errorMessage = error.response?.data?.msg || 'Error desconocido';
        setModalContent(errorMessage);
        setShowModal(true);
      }
    } else {
      setErrors({
        nombre: isNameValid ? '' : 'Nombre inválido. Solo se permiten letras y espacios.',
        descripcion: isDescripcionValid ? '' : 'La descripción no es válida.',
        cantidad: isCantidadValid ? '' : 'La cantidad en (kg) no es válida.',
        precio: isPrecioValid ? '' : 'El precio no es válido.',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>
      <Text style={styles.subtitle}>
        Por favor, completa los campos que desea actualizar del producto.
      </Text>

      <TextInput
        style={[styles.input, errors.nombre && styles.inputError]}
        placeholder="Nombre del Producto"
        value={formData.nombre}
        onChangeText={(value) => handleChange('nombre', value)}
      />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

      <TouchableOpacity style={styles.fileButton} onPress={pickImage}>
        <Text style={styles.fileButtonText}>Subir Imagen</Text>
      </TouchableOpacity>
      {selectedFile && <Image source={{ uri: selectedFile }} style={styles.imagePreview} />}

      <TextInput
        style={[styles.input, errors.descripcion && styles.inputError]}
        placeholder="Descripción del Producto"
        value={formData.descripcion}
        onChangeText={(value) => handleChange('descripcion', value)}
      />
      {errors.descripcion && <Text style={styles.errorText}>{errors.descripcion}</Text>}

      <TextInput
        style={[styles.input, errors.cantidad && styles.inputError]}
        placeholder="Cantidad (stock)"
        keyboardType="numeric"
        value={String(formData.cantidad)}
        onChangeText={(value) => handleChange('cantidad', value)}
      />
      {errors.cantidad && <Text style={styles.errorText}>{errors.cantidad}</Text>}

      <TextInput
        style={[styles.input, errors.precio && styles.inputError]}
        placeholder="Precio"
        keyboardType="numeric"
        value={String(formData.precio)}
        onChangeText={(value) => handleChange('precio', value)}
      />
      {errors.precio && <Text style={styles.errorText}>{errors.precio}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Actualizar Producto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
        <Text style={styles.link}>Regresar</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true} animationType="slide">
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

export default ProductEditForm;

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
  fileButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
