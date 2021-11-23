import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

//TODO Remover esta librería 
import RNSearchablePicker from 'react-native-searchable-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

import colors from '../../styles/colors';

interface Props {
  title: string;
  onSelect: (value: any) => void;
  onChangeText: (value: any) => void;
  data: Array<any>;
  placeholder?: string;
}

const CustomPickerSearch = ({
  title,
  onSelect,
  onChangeText,
  data,
  placeholder,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <SearchableDropdown
        onItemSelect={onSelect}
        containerStyle={{padding: 5}}
        itemStyle={styles.itemStyle}
        itemTextStyle={{color: colors.text}}
        itemsContainerStyle={{maxHeight: 140}}
        items={data}
        textInputProps={{
          underlineColorAndroid: 'transparent',
          placeholder: placeholder,
          style: styles.textInputStyle,
          onTextChange: onChangeText,
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </View>
  );
};

export default CustomPickerSearch;

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
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: colors.background,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.disabled,
    borderRadius: 5,
  },
});
