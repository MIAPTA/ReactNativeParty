import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Pagination from "../components/Pagination";
//import { REACT_NATIVE_URI_BACK } from '@env';

function Tienda() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 6;
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const url = `https://d4d5-186-80-43-229.ngrok-free.app/api/producto`;
            console.log("Fetching from URL: ", url);  // Verifica si la URL es correcta
            const response = await axios.get(url);
            console.log("Datos recibidos:", response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    fetchProducts();
}, []);



  const filteredProducts = filterType
    ? products.filter((product) => product.tipo === filterType)
    : products;

  const searchedProducts = searchTerm
    ? filteredProducts.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = searchedProducts.slice(firstIndex, lastIndex);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardProduct}
      onPress={() => navigation.navigate("ProductDetails", { id: item._id })}
    >
      <Image source={{ uri: item.imagen }} style={styles.productImage} />
      <View style={styles.infoProduct}>
        <Text style={styles.productName}>{item.nombre}</Text>
        <Text style={styles.productPrice}>$ {item.precio}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>

      <FlatList
        data={currentProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2} // For grid-like layout
        contentContainerStyle={styles.productsContainer}
      />

      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  productsContainer: {
    justifyContent: "space-between",
  },
  cardProduct: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
  },
  infoProduct: {
    padding: 10,
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    color: "#777",
  },
  productPrice: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
});

export default Tienda;
