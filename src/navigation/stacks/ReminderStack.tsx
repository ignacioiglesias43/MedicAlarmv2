import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Reminder } from '../../api/reminder/model/Reminder'

import HomeScreen from '../../screens/HomeScreen';
import UpdateReminder from '../../screens/UpdateReminder';

const Stack = createNativeStackNavigator();

export type ReminderStackParams = {
  Reminder: undefined;
  Update: UpdateParams ;
}

export interface UpdateParams {
  reminder?: Reminder;
  actionType: 'UPDATE' | 'ADD';
}

const ReminderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={HomeScreen} />
      <Stack.Screen name="Update" component={UpdateReminder} />

    </Stack.Navigator>
  );
};

export default ReminderStack;
