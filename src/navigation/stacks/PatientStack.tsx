import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import {User} from '../../api/user/model/User';

import PatientScreen from '../../screens/PatientScreen';

const Stack = createNativeStackNavigator();

export type PatientStackParams = {
  Reminder: undefined;
  Update: UpdateParams;
};

export interface UpdateParams {
  patient?: User;
  actionType: 'UPDATE' | 'ADD';
}

const PatientStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Patients" component={PatientScreen} />
    </Stack.Navigator>
  );
};

export default PatientStack;

const styles = StyleSheet.create({});
