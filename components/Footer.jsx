import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <View style={styles.redesContainer}>
          <Text style={styles.title}>Redes Sociales</Text>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity style={styles.icon}>
              <Text style={styles.iconText}>F</Text> {/* Facebook Icon Placeholder */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Text style={styles.iconText}>I</Text> {/* Instagram Icon Placeholder */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Text style={styles.iconText}>T</Text> {/* Twitter Icon Placeholder */}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contactInfoContainer}>
          <View style={styles.contactColumn}>
            <Text style={styles.subtitle}>Contáctanos</Text>
            <Text style={styles.text}>
              Dirección: Calle 20 #11-20. Centro, Neiva – Colombia
            </Text>
            <Text style={styles.text}>
              Comunícate: +57 (317) 8517589. contactenos@dominio.com
            </Text>
          </View>
          <View style={styles.contactColumn}>
            <Text style={[styles.subtitle, styles.alignRight]}>Horarios de Atención</Text>
            <Text style={[styles.text, styles.alignRight]}>Lunes a Viernes: 7:00AM – 3:00PM</Text>
            <Text style={[styles.text, styles.alignRight]}>Sábado: 7:00AM – 1:00PM</Text>
            <Text style={[styles.text, styles.alignRight]}>Domingos y Festivos: Cerrado</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#000',
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  redesContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactColumn: {
    flex: 1,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  alignRight: {
    textAlign: 'right',
  },
});
