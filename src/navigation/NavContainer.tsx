import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';
import {RootState} from '../store/index';

import AuthStack from './stacks/AuthStack';
import MainNavigator from './tabs/MainNavigator';

const Stack = createNativeStackNavigator();

const NavContainer = () => {
  const {token} = useSelector((state: RootState) => state.authReducer);
  const isSignedIn = token.length > 0;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isSignedIn ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
