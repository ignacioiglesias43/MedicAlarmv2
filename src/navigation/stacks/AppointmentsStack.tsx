import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppointmentsScreen from '../../screens/AppointmentsScreen';
import UpdateAppoinment from '../../screens/UpdateAppoinment';
import { Appointment } from '../../api/appointments/model/Appointment';

export type AppointmentStackParams = {
  AppointmentsDashboard: undefined;
  Update: UpdateParams
};

export interface UpdateParams {
  appoinment?: Appointment;
  actionType: 'UPDATE' | 'ADD';
}

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
      <Stack.Screen
        name="Update"
        component={UpdateAppoinment}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsStack;
