import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppointmentsScreen from '../../screens/AppointmentsScreen';

const Stack = createNativeStackNavigator();

export type AppointmentStackParams = {
  Appointments: undefined;
};

const AppointmentsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AppointmentsDashboard"
        component={AppointmentsScreen}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsStack;
