import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FAB} from 'react-native-paper';
import colors from '../../styles/colors';

interface Props {
  icon?: string;
  onPress: () => void;
}

const CustomFAB = ({icon = 'plus', onPress}: Props) => {
  return (
    <FAB
      icon={icon}
      onPress={onPress}
      style={styles.fab}
      color={colors.background}
    />
  );
};

export default CustomFAB;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
