import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector} from 'react-redux';
import {RootState} from '../../store/index';

import HomeStack from '../stacks/ReminderStack';
import ContactStack from '../stacks/ContactStack';
import UserStack from '../stacks/UserStack';
import colors from '../../styles/colors';
import AppointmentsStack from '../stacks/AppointmentsStack';
import MedicineStack from '../stacks/MedicineStack';
import PatientStack from '../stacks/PatientStack';

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
    if (route === 'Patients') {
      iconName = focused ? 'account-group' : 'account-group-outline';
    }
    if (route === 'User') {
      iconName = focused ? 'account' : 'account-outline';
    }
    if (route === 'Medicines') {
      iconName = 'pill';
    }
    if (route === 'Appointments') {
      iconName = 'calendar-range';
    }

    return <Icon name={iconName} size={25} color={color} />;
  };

const titles = {
  Reminders: 'Alarmas',
  Patients: 'Pacientes',
  Appointments: 'Citas',
  Contacts: 'Contactos',
  Medicines: 'Medicamentos',
  User: 'Usuario',
};

const MainNavigator = () => {
  const {userInfo} = useSelector((state: RootState) => state.authReducer);

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
      {userInfo?.role === 'Medic' ? (
        <Tab.Screen name="Patients" component={PatientStack} />
        ) : (
        <Tab.Screen name="Reminders" component={HomeStack} />
      )}
      <Tab.Screen name="Appointments" component={AppointmentsStack} />
      {userInfo?.role === 'Medic' ? (
        <Tab.Screen name="Medicines" component={MedicineStack} />
      ) : (
        <Tab.Screen name="Contacts" component={ContactStack} />
      )}
      <Tab.Screen name="User" component={UserStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
