import React, {useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper'
import {Picker, PickerProps} from '@react-native-picker/picker';
import {Contact} from '../../api/contact/model/Contact';
import colors from '../../styles/colors';

export interface DefaultPicker {
  name: string;
  id: string;
}
interface Props {
  title: string;
  items?: Array<Contact | DefaultPicker>;
}

const CustomDropdown = ({title, items = []}: Props) => {
  const [selectedItem, setSelectedItem] = useState();
  const pickerRef = useRef<Picker<undefined>>(null);

  function open() {
    pickerRef.current!.focus();
  }
  function close() {
    pickerRef.current!.blur();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Picker
        ref={pickerRef}
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}>
        {items.map(e => (
          <Picker.Item label={e.name} value={e.id} />
        ))}
      </Picker>
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
  title:{
    position: 'absolute',
    paddingHorizontal: 5,
    fontSize: 12,
    top: -10,
    left: 5,
    backgroundColor: colors.background
  }
});
