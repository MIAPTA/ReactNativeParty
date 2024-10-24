import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pagination = ({ productsPerPage, totalProducts, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
        onPress={onPreviousPage}
        disabled={currentPage === 1}
      >
        <Text style={styles.buttonText}>Anterior</Text>
      </TouchableOpacity>

      {pageNumbers.map((noPage) => (
        <TouchableOpacity
          key={noPage}
          style={[
            styles.paginationButton,
            noPage === currentPage && styles.activeButton,
          ]}
          onPress={() => onSpecificPage(noPage)}
        >
          <Text style={styles.buttonText}>{noPage}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage >= pageNumbers.length && styles.disabledButton,
        ]}
        onPress={onNextPage}
        disabled={currentPage >= pageNumbers.length}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  paginationButton: {
    margin: 5,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "#0056b3",
  },
});

export default Pagination;
