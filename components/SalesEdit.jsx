import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { REACT_NATIVE_URI_BACK } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';

const SalesEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [formData, setFormData] = useState({
    estado: '',
  });

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_URI_BACK}/api/venta/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la venta:', error);
      }
    };

    fetchSaleDetails();
  }, [id]);

  const handleChange = (value) => {
    setFormData({
      ...formData,
      estado: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${REACT_NATIVE_URI_BACK}/api/venta/${id}`, formData);
      Alert.alert('Mensaje', 'Estado de la venta actualizado correctamente.', [
        { text: 'OK', onPress: () => navigation.navigate('SalesList') },
      ]);
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Error desconocido';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Estado de Venta</Text>
      <Text style={styles.subtitle}>Por favor, selecciona el nuevo estado de la venta.</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.estado}
          onValueChange={(value) => handleChange(value)}
          style={styles.picker}
        >
          <Picker.Item label="Pagado" value="Pagado" />
          <Picker.Item label="Despachado" value="Despachado" />
          <Picker.Item label="Finalizado" value="Finalizado" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SalesList')}>
        <Text style={styles.link}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SalesEdit;

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
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
