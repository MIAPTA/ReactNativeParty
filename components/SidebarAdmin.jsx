import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SidebarAdmin = ({ handleOptionChange, selectedOption }) => {
  const navigation = useNavigation();

  const handleNavigation = (screen, option) => {
    handleOptionChange(option);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.menuTitle}>Menu</Text>
      <TouchableOpacity
        style={[styles.menuItem, selectedOption === 'contactos' && styles.selected]}
        onPress={() => handleNavigation('Contactos', 'contactos')}
      >
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.menuText}>Contactos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.menuItem, selectedOption === 'productos' && styles.selected]}
        onPress={() => handleNavigation('Productos', 'productos')}
      >
        <Text style={styles.icon}>📦</Text>
        <Text style={styles.menuText}>Productos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, selectedOption === 'usuarios' && styles.selected]}
        onPress={() => handleNavigation('Usuarios', 'usuarios')}
      >
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.menuText}>Usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, selectedOption === 'ventas' && styles.selected]}
        onPress={() => handleNavigation('Ventas', 'ventas')}
      >
        <Text style={styles.icon}>💸</Text>
        <Text style={styles.menuText}>Ventas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SidebarAdmin;

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: '#555',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
});
