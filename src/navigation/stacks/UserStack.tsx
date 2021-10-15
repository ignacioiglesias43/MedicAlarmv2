import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserScren from '../../screens/UserScren';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={UserScren} />
    </Stack.Navigator>
  );
};

export default UserStack;
