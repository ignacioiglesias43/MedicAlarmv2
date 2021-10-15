import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Contact} from '../../api/contact/model/Contact';

import ContactScreen from '../../screens/ContactScreen';
import UpdateContact from '../../screens/UpdateContact';

export type ContactStackParams = {
  Contact: undefined;
  Update: UpdateParams;
};

export interface UpdateParams {
  contact?: Contact;
  actionType: 'UPDATE' | 'ADD';
}

const Stack = createNativeStackNavigator<ContactStackParams>();

const ContactStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Update" component={UpdateContact} />
    </Stack.Navigator>
  );
};

export default ContactStack;
