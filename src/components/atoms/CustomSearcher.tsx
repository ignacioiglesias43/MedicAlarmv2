import React, {useState} from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../styles/colors';

interface Props {
  value: string;
  mode?: 'flat' | 'outlined';
  secureTextEntry?: boolean;
  icon?: string;
  onChangeText?: ((text: string) => void) & Function;
}

const CustomSearcher = ({
  value,
  onChangeText,
  mode = 'outlined',
  icon = 'magnify',
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleInputFocus = () => setIsFocused(true);
  const handleInputBlur = () => setIsFocused(false);

  return (
    <TextInput
      value={value}
      placeholder="Buscar"
      mode={mode}
      dense
      onChangeText={onChangeText}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      theme={{
        colors: {
          primary: colors.placeholder,
          placeholder: colors.disabled,
        },
        roundness: 50,
      }}
      right={
        icon ? (
          <TextInput.Icon
            name={icon}
            color={isFocused ? colors.placeholder : colors.disabled}
          />
        ) : null
      }
    />
  );
};

export default CustomSearcher;

const styles = StyleSheet.create({});
