import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from '../stacks/HomeStack';

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

    return <Icon name={iconName} size={25} color={color} />;
  };

const MainNavigator = () => {
  const barStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#FFFF',
    height: 70,
    justifyContent: 'center',
  };

  return (
    <Tab.Navigator
      activeColor="#BF2931"
      inactiveColor="#C5CEE0"
      barStyle={barStyle}
      shifting={false}
      screenOptions={({route}) => ({
        tabBarIcon: chooseTabBarIcon(route.name),
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
