import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppointmentsScreen from '../../screens/AppointmentsScreen';

export type AppointmentStackParams = {
  AppointmentsDashboard: undefined;
};

const Stack = createNativeStackNavigator<AppointmentStackParams>();

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
