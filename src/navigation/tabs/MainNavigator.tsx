import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from '../stacks/HomeStack';
import ContactStack from '../stacks/ContactStack';
import UserStack from '../stacks/UserStack';
import colors from '../../styles/colors';
import AppointmentsStack from '../stacks/AppointmentsStack';

const Tab = createMaterialBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
  color: string;
}

const chooseTabBarIcon =
  (route: string) =>
  ({color, focused}: TabBarIconProps) => {
    let iconName = '';

    if (route === 'Reminders') {
      iconName = 'alarm';
    }
    if (route === 'Contacts') {
      iconName = focused ? 'account-box' : 'account-box-outline';
    }
    if (route === 'User') {
      iconName = focused ? 'account' : 'account-outline';
    }

    if (route === 'Appointments') {
      iconName = 'calendar-range';
    }

    return <Icon name={iconName} size={25} color={color} />;
  };

const titles = {
  Reminders: 'Alarmas',
  Appointments: 'Citas',
  Contacts: 'Contactos',
  User: 'Usuario',
};

const MainNavigator = () => {
  const barStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.tabBackground,
    height: 70,
    justifyContent: 'center',
  };

  return (
    <Tab.Navigator
      activeColor={colors.accent}
      inactiveColor={colors.disabled}
      barStyle={barStyle}
      shifting={false}
      screenOptions={({route}) => ({
        tabBarIcon: chooseTabBarIcon(route.name),
        // @ts-ignore
        title: titles[route.name as keyof chooseTitle],
      })}>
      <Tab.Screen name="Reminders" component={HomeStack} />
      <Tab.Screen name="Appointments" component={AppointmentsStack} />
      <Tab.Screen name="Contacts" component={ContactStack} />
      <Tab.Screen name="User" component={UserStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
