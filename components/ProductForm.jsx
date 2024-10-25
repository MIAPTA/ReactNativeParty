import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

const ProductForm = () => {
  const navigation = useNavigation();

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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requiere permiso para acceder a las imágenes.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
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
        const response = await axios.post(`${REACT_NATIVE_URI_BACK}/api/producto`, formData);
        setModalContent('Producto registrado correctamente.');
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
      <Text style={styles.title}>Crear Producto</Text>
      <Text style={styles.subtitle}>
        Por favor, complete los siguientes campos para crear el producto.
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
        value={formData.cantidad}
        onChangeText={(value) => handleChange('cantidad', value)}
      />
      {errors.cantidad && <Text style={styles.errorText}>{errors.cantidad}</Text>}

      <TextInput
        style={[styles.input, errors.precio && styles.inputError]}
        placeholder="Precio"
        keyboardType="numeric"
        value={formData.precio}
        onChangeText={(value) => handleChange('precio', value)}
      />
      {errors.precio && <Text style={styles.errorText}>{errors.precio}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Producto</Text>
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

export default ProductForm;

const styles = StyleSheet.create({
  // estilos
});
