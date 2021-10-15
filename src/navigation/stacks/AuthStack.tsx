import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';

const Stack = createNativeStackNavigator();

export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
