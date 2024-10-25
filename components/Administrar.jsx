import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SidebarAdmin from './SidebarAdmin';
import Welcome from './Welcome';
import Contactos from './Contactos';
import Product from './Product';
import Usuario from './Usuario';
import Sales from './Sales';
import { useRoute } from '@react-navigation/native';

const Administrar = () => {
  const route = useRoute();
  const { id } = route.params;
  const [selectedOption, setSelectedOption] = useState(id);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'contactos':
        return <Contactos />;
      case 'productos':
        return <Product />;
      case 'usuarios':
        return <Usuario />;
      case 'ventas':
        return <Sales />;
      default:
        return <Welcome />;
    }
  };

  return (
    <View style={styles.container}>
      <SidebarAdmin handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
      <View style={styles.content}>{renderSelectedComponent()}</View>
    </View>
  );
};

export default Administrar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
