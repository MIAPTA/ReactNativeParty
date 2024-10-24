import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Importa las pantallas o vistas de tu app
// import Contact from '../components/Contact';
 import Tienda from '../components/Tienda';
// import OneProduct from '../components/OneProduct';
 import Nosotros from '../components/Nosotros';
// import Login from '../components/Login';
// import Cuenta from '../components/Cuenta';
// import UserRegister from '../components/UserRegister';
 import Inicio from '../components/Inicio';
// import Confirmar from '../components/Confirmar';
// import Administrar from '../components/Administrar';
// import ProductForm from '../components/ProductForm';
// import ProductEditForm from '../components/ProductEditForm';
// import UserRegisterCrud from '../components/UserRegisterCrud';
// import UserEdit from '../components/UserEdit';
// import ContactoRegister from '../components/ContactoRegister';
// import ContactoEdit from '../components/ContactoEdit';
// import SalesEdit from '../components/SalesEdit';
// import PerfilEdit from '../components/PerfilEdit';
// import OneCompra from '../components/OneCompra';
// import OneSale from '../components/OneSale';
// import Cart from '../components/Cart';
// import CompraRealizada from '../components/CompraRealizada';

const Stack = createStackNavigator();

const App = () => {
  const [isId, setId] = useState('');
  const [isName, setName] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [isType, setType] = useState('');

  useEffect(() => {
    // Aquí puedes utilizar AsyncStorage para manejar el almacenamiento en lugar de localStorage
    // AsyncStorage.setItem('userId', isId);
    // AsyncStorage.setItem('userName', isName);
    // AsyncStorage.setItem('isLoggedIn', isLogin);
    // AsyncStorage.setItem('userType', isType);
  }, [isId, isName, isLogin, isType]);

  const isAdmin = () => isType === 'Administrador';
  const isClient = () => isType === 'Cliente';

  return (
    <NavigationContainer independent={true}>

      <Stack.Navigator initialRouteName={isLogin ? 'Inicio' : 'Login'}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Tienda" component={Tienda} />
        {/* <Stack.Screen name="Producto" component={OneProduct} />
        <Stack.Screen name="Contacto" component={Contact} /> */}
        <Stack.Screen name="Nosotros" component={Nosotros} />
        {/* <Stack.Screen name="Carrito" component={Cart} />
        <Stack.Screen name="CompraRealizada" component={CompraRealizada} />
        <Stack.Screen name="Login">
          {(props) => (
            <Login
              {...props}
              setId={setId}
              setName={setName}
              setLogin={setLogin}
              setType={setType}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="RegisterUser" component={UserRegister} />
        <Stack.Screen name="Confirmar" component={Confirmar} />
        <Stack.Screen name="Cuenta">
          {(props) => (
            <Cuenta
              {...props}
              setId={setId}
              setName={setName}
              setLogin={setLogin}
              setType={setType}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="PerfilEdit" component={PerfilEdit} />
        <Stack.Screen name="OneCompra" component={OneCompra} />
        <Stack.Screen name="Administrar" component={Administrar} />
        <Stack.Screen name="ProductForm" component={ProductForm} />
        <Stack.Screen name="ProductEditForm" component={ProductEditForm} />
        <Stack.Screen name="UserRegisterCrud" component={UserRegisterCrud} />
        <Stack.Screen name="UserEdit" component={UserEdit} />
        <Stack.Screen name="ContactoRegister" component={ContactoRegister} />
        <Stack.Screen name="ContactoEdit" component={ContactoEdit} />
        <Stack.Screen name="SalesEdit" component={SalesEdit} />
        <Stack.Screen name="OneSale" component={OneSale} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;