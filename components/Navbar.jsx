import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useNavbar from '../hooks/useSelectBurger';

function Navbar({ logged, userName, userType }) {
  const navigation = useNavigation();
  const { menuActive, selectedItem, toggleMenu, handleMenuItemClick } = useNavbar();

  return (
    <View style={styles.navbar}>
      <View style={styles.navbarBrand}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
          <Image source={require('../assets/Party.jpg')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
          <Text style={styles.namepage}>Party Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.burger} onPress={toggleMenu}>
          <View style={[styles.burgerLine, menuActive && styles.burgerLineActive]} />
          <View style={[styles.burgerLine, menuActive && styles.burgerLineActive]} />
          <View style={[styles.burgerLine, menuActive && styles.burgerLineActive]} />
        </TouchableOpacity>
      </View>

      {/* ScrollView horizontal para desplazar los elementos del menú */}
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        style={[styles.navbarMenu, menuActive && styles.navbarMenuActive]}
      >
        <TouchableOpacity
          style={selectedItem === 'Inicio' ? styles.selectedItem : styles.navbarItem}
          onPress={() => {
            handleMenuItemClick('Inicio');
            navigation.navigate('Inicio');
          }}
        >
          <Text style={styles.itemText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedItem === 'Nosotros' ? styles.selectedItem : styles.navbarItem}
          onPress={() => {
            handleMenuItemClick('Nosotros');
            navigation.navigate('Nosotros');
          }}
        >
          <Text style={styles.itemText}>Nosotros</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedItem === 'Contacto' ? styles.selectedItem : styles.navbarItem}
          onPress={() => {
            handleMenuItemClick('Contacto');
            navigation.navigate('Contacto');
          }}
        >
          <Text style={styles.itemText}>Contacto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedItem === 'Productos' ? styles.selectedItem : styles.navbarItem}
          onPress={() => {
            handleMenuItemClick('Productos');
            navigation.navigate('Tienda');
          }}
        >
          <Text style={styles.itemText}>Tienda</Text>
        </TouchableOpacity>
        {logged === 'true' ? (
          <>
            {userType === 'Administrador' && (
              <TouchableOpacity
                style={selectedItem === 'Administrar' ? styles.selectedItem : styles.navbarItem}
                onPress={() => {
                  handleMenuItemClick('Administrar');
                  navigation.navigate('Administracion');
                }}
              >
                <Text style={styles.itemText}>Administración</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={selectedItem === 'Login' ? styles.selectedItem : styles.navbarItem}
              onPress={() => {
                handleMenuItemClick('Login');
                navigation.navigate('Cuenta');
              }}
            >
              <Text style={styles.buttonText}>
                {userName.split(' ')[0].charAt(0).toUpperCase() + userName.split(' ')[0].slice(1)}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={selectedItem === 'Login' ? styles.selectedItem : styles.navbarItem}
            onPress={() => {
              handleMenuItemClick('Login');
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'column', // Cambiado a columna para incluir el ScrollView debajo del logo
  },
  navbarBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
  },
  namepage: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  burger: {
    marginLeft: 'auto',
    padding: 10,
  },
  burgerLine: {
    width: 25,
    height: 3,
    backgroundColor: '#fff',
    marginVertical: 2,
  },
  burgerLineActive: {
    backgroundColor: '#ff5733',
  },
  navbarMenu: {
    flexDirection: 'row',
    display: 'none',
    marginTop: 10,
  },
  navbarMenuActive: {
    display: 'flex',
  },
  navbarItem: {
    padding: 10,
    marginHorizontal: 5,
  },
  selectedItem: {
    padding: 10,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#ff5733',
  },
  itemText: {
    color: '#fff',
  },
  buttonText: {
    color: '#ff5733',
    borderWidth: 1,
    borderColor: '#ff5733',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
});