// Cuenta.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SidebarUser from './SidebarUser';
import Welcome from './Welcome';
import Perfil from './Perfil';
import Compras from './Compras';

const Cuenta = ({ setId, setName, setLogin, setType }) => {
  const [userId, setUserId] = useState('');
  const [selectedOption, setSelectedOption] = useState('welcome'); // Default to 'welcome' view

  useEffect(() => {
    // Load userId from AsyncStorage
    const loadUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
        }
      } catch (error) {
        console.error('Error loading userId from storage', error);
      }
    };
    loadUserId();
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'compras':
        return <Compras userId={userId} />;
      case 'perfil':
        return <Perfil userId={userId} />;
      default:
        return <Welcome userId={userId} setName={setName} />;
    }
  };

  return (
    <View style={styles.container}>
      <SidebarUser
        handleOptionChange={handleOptionChange}
        selectedOption={selectedOption}
        setId={setId}
        setName={setName}
        setLogin={setLogin}
        setType={setType}
      />
      <View style={styles.content}>{renderSelectedComponent()}</View>
    </View>
  );
};

export default Cuenta;

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
