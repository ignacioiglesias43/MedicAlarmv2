import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserScreen from '../../screens/UserScreen';
import UpdateInformation from '../../screens/UpdateInformation';

export type UserStackParams = {
  Dashboard: undefined;
  UpdateInformation: undefined;
};

const Stack = createNativeStackNavigator<UserStackParams>();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={UserScreen} />
      <Stack.Screen name="UpdateInformation" component={UpdateInformation} />
    </Stack.Navigator>
  );
};

export default UserStack;
