import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const CompraRealizada = () => {
  const [usuario, setUsuario] = useState({});
  const [totalCompra, setTotalCompra] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const uriBack = await AsyncStorage.getItem('backend_uri');

        // Obtener los detalles del usuario
        const usuarioResponse = await axios.get(`${uriBack}/api/usuario/${userId}`);
        setUsuario(usuarioResponse.data);

        // Obtener el total de la compra desde AsyncStorage
        const totalCompraLocal = await AsyncStorage.getItem('totalCompra');
        setTotalCompra(totalCompraLocal || 0);
      } catch (error) {
        console.error("Error al obtener los detalles del usuario:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compra Realizada</Text>
      <View style={styles.content}>
        <Text style={styles.text}>
          <Text style={styles.label}>Nombre del Usuario: </Text>
          {usuario.nombre || "No disponible"}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Gracias por tu compra.</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Precio Total de la compra: </Text>
          ${totalCompra} COP
        </Text>
      </View>
      <Button
        title="Volver a la tienda"
        onPress={() => navigation.navigate("Tienda")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
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
  text: {
    color: "#fff",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#888",
  },
});

export default CompraRealizada;
