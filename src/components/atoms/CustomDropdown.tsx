import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker, PickerProps} from '@react-native-picker/picker';
import {Contact} from '../../api/contact/model/Contact';

interface Props {
  contacts?: Array<Contact>;
}

const CustomDropdown = ({contacts = []}: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef = useRef<Picker<undefined>>(null);

  function open() {
    pickerRef.current!.focus();
  }
  function close() {
    pickerRef.current!.blur();
  }

  return (
    <Picker
      ref={pickerRef}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({});
