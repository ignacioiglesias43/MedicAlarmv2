import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from '../stacks/HomeStack';
import ContactStack from '../stacks/ContactStack';
import UserStack from '../stacks/UserStack';
import colors from '../../styles/colors';

const Tab = createMaterialBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
  color: string;
}

const chooseTabBarIcon =
  (route: string) =>
  ({color, focused}: TabBarIconProps) => {
    let iconName = '';

    if (route === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    }
    if (route === 'Contacts') {
      iconName = focused ? 'account-box' : 'account-box-outline';
    }
    if (route === 'User') {
      iconName = focused ? 'account' : 'account-outline';
    }

    return <Icon name={iconName} size={25} color={color} />;
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
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Contacts" component={ContactStack} />
      <Tab.Screen name="User" component={UserStack} />

    </Tab.Navigator>
  );
};

export default MainNavigator;
