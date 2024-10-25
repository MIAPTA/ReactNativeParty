// SidebarUser.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SidebarUser = ({ handleOptionChange, selectedOption, setId, setName, setLogin, setType }) => {
  
  const handleCerrarSesion = async () => {
    // Clear user session data from AsyncStorage
    try {
      await AsyncStorage.clear();
      setId('');
      setName('');
      setLogin(false);
      setType('');
    } catch (error) {
      console.error('Error clearing user session', error);
    }
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.menuTitle}>Menú</Text>
      <TouchableOpacity
        style={selectedOption === 'compras' ? styles.selectedItem : styles.menuItem}
        onPress={() => handleOptionChange('compras')}
      >
        <Text style={styles.itemText}>Mis Compras</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selectedOption === 'perfil' ? styles.selectedItem : styles.menuItem}
        onPress={() => handleOptionChange('perfil')}
      >
        <Text style={styles.itemText}>Mi Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={handleCerrarSesion}
      >
        <Text style={styles.itemText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SidebarUser;

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    backgroundColor: '#333',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#555',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});
