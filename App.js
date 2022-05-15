import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import Register from './Components/User/Register';
import EmailRegister from './Components/User/EmailRegister';
import Login from './Components/User/Login';
import Home from './Components/HomePage/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#10A9B0" barStyle="light-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="EmailRegister" component={EmailRegister} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;