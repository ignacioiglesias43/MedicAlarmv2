import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {Medicine} from '../../api/medicines/model/Medicines';
import MedicineScreen from '../../screens/MedicineScreen';
import UpdateMedicine from '../../screens/UpdateMedicine';

export type MedicineStackParams = {
  Medicine: undefined;
  Update: UpdateParams;
};

export interface UpdateParams {
  medicine?: Medicine;
  actionType: 'UPDATE' | 'ADD';
}

const Stack = createNativeStackNavigator<MedicineStackParams>();

const MedicineStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Medicine" component={MedicineScreen} />
      <Stack.Screen name="Update" component={UpdateMedicine} />

    </Stack.Navigator>
  );
};

export default MedicineStack;

const styles = StyleSheet.create({});
