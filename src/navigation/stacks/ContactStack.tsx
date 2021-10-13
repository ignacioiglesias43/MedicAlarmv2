import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ContactScreen from '../../screens/ContactScreen';

const Stack = createNativeStackNavigator();

const ContactStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default ContactStack;
