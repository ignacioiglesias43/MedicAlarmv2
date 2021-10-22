import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import {User} from '../../api/user/model/User';

import PatientScreen from '../../screens/PatientScreen';
import UpdatePatient from '../../screens/UpdatePatient';
import PatientDetails from '../../screens/PatientDetails';

const Stack = createNativeStackNavigator<PatientStackParams>();

export type PatientStackParams = {
  Patient: undefined;
  Update: UpdateParams;
  Details: DetailsParams;
};

export interface UpdateParams {
  patient?: User;
  actionType: 'UPDATE' | 'ADD' | 'SEE';
}

export interface DetailsParams {
    patient: User,
}

const PatientStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Patient" component={PatientScreen} />
      <Stack.Screen name="Update" component={UpdatePatient} />
      <Stack.Screen name="Details" component={PatientDetails} />

    </Stack.Navigator>
  );
};

export default PatientStack;

const styles = StyleSheet.create({});
