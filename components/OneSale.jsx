import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OneSale = () => {
  const [venta, setVenta] = useState({});
  const [usuario, setUsuario] = useState({});
  const [producto, setProducto] = useState({});
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    const fetchVentaDetails = async () => {
      try {
        const uriBack = await AsyncStorage.getItem('backend_uri');
        const response = await axios.get(`${uriBack}/api/venta/${id}`);
        setVenta(response.data);

        const usuarioResponse = await axios.get(`${uriBack}/api/usuario/${response.data.idUser}`);
        setUsuario(usuarioResponse.data);

        const productoResponse = await axios.get(`${uriBack}/api/producto/${response.data.idProduct}`);
        setProducto(productoResponse.data);
      } catch (error) {
        console.error("Error al obtener los detalles de la venta:", error);
      }
    };

    fetchVentaDetails();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles de la Venta</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Nombre del Usuario:</Text>
        <Text style={styles.value}>{usuario.nombre || "No disponible"}</Text>

        <Text style={styles.label}>Nombre del Producto:</Text>
        <Text style={styles.value}>{producto.nombre || "No disponible"}</Text>

        <Text style={styles.label}>Cantidad:</Text>
        <Text style={styles.value}>{venta.cantidad || "No disponible"}</Text>

        <Text style={styles.label}>Precio Total:</Text>
        <Text style={styles.value}>{venta.precioTotal || "No disponible"}</Text>

        <Text style={styles.label}>Estado Actual:</Text>
        <Text style={styles.value}>{venta.estado || "No disponible"}</Text>
      </View>
      <Button title="Regresar" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#1e1e1e",
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  content: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#888",
    fontWeight: "bold",
  },
  value: {
    color: "#fff",
    marginBottom: 10,
  },
});

export default OneSale;

