import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

const OneCompra = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [venta, setVenta] = useState({});
  const [usuario, setUsuario] = useState({});
  const [producto, setProducto] = useState({});

  useEffect(() => {
    const fetchVentaDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_NATIVE_URI_BACK}/api/venta/${id}`
        );
        setVenta(response.data);

        const usuarioResponse = await axios.get(
          `${process.env.REACT_NATIVE_URI_BACK}/api/usuario/${response.data.idUser}`
        );
        setUsuario(usuarioResponse.data);

        const productoResponse = await axios.get(
          `${process.env.REACT_NATIVE_URI_BACK}/api/producto/${response.data.idProduct}`
        );
        setProducto(productoResponse.data);
      } catch (error) {
        console.error("Error al obtener los detalles de la venta:", error);
      }
    };

    fetchVentaDetails();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Venta</Text>
      <View style={styles.content}>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Nombre del Usuario: </Text>
          {usuario.nombre}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Nombre del Producto: </Text>
          {producto.nombre}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Cantidad: </Text>
          {venta.cantidad}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Precio Total: </Text>
          {venta.precioTotal}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Estado Actual: </Text>
          {venta.estado}
        </Text>
      </View>
      <Button
        title="Regresar"
        onPress={() => navigation.navigate("Compras")}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#d1d1d1",
  },
});

export default OneCompra;
