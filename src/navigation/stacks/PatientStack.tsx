import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {User} from '../../api/user/model/User';

import {Prescription} from '../../api/prescriptions/model/Prescription';

import PatientScreen from '../../screens/PatientScreen';
import AddPatient from '../../screens/AddPatient';
import PatientDetails from '../../screens/PatientDetails';
import UpdatePrescription from '../../screens/UpdatePrescription';

export type PatientStackParams = {
  Patient: undefined;
  Add: undefined;
  Details: DetailsParams;
  Update: UpdateParams;
};
export interface UpdateParams {
  prescription?: Prescription;
  actionType: 'ADD' | 'UPDATE';
}
export interface DetailsParams {
  patient: User;
}

const Stack = createNativeStackNavigator<PatientStackParams>();

const PatientStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Patient" component={PatientScreen} />
      <Stack.Screen name="Add" component={AddPatient} />
      <Stack.Screen name="Details" component={PatientDetails} />
      <Stack.Screen name="Update" component={UpdatePrescription} />
    </Stack.Navigator>
  );
};

export default PatientStack;
