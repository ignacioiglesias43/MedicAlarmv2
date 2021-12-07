import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Picker, {Item} from 'react-native-picker-select';

import colors from '../../styles/colors';

interface Props {
  title: string;
  onValueChange: (value: any, index: number) => void;
  items?: Array<Item>;
  placeholder?: object;
  value: any;
}

const CustomDropdown = ({
  title,
  items = [],
  onValueChange,
  placeholder,
  value,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Picker
        onValueChange={onValueChange}
        items={items}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderColor: '#B5B5B5',
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    paddingHorizontal: 5,
    fontSize: 12,
    top: -10,
    left: 5,
    backgroundColor: colors.background,
  },
});
