import React, {useState} from 'react';
import {GestureResponderEvent} from 'react-native';

import {TextInput} from 'react-native-paper';

import colors from '../../styles/colors';

interface CustomInputProps {
  value: string;
  label: string;
  mode?: 'flat' | 'outlined';
  secureTextEntry?: boolean;
  icon?: string;
  onChangeText?: ((text: string) => void) & Function;
  onIconPress?: (
    | ((
        | (((event: GestureResponderEvent) => void) &
            ((e: GestureResponderEvent) => void))
        | (((event: GestureResponderEvent) => void) &
            ((e: GestureResponderEvent) => void))
      ) &
        ((e: GestureResponderEvent) => void))
    | ((
        | (((event: GestureResponderEvent) => void) &
            ((e: GestureResponderEvent) => void))
        | (((event: GestureResponderEvent) => void) &
            ((e: GestureResponderEvent) => void))
      ) &
        ((e: GestureResponderEvent) => void))
  ) &
    (() => void);
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  onIconPress,
  label,
  mode,
  icon,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => setIsFocused(true);

  const handleInputBlur = () => setIsFocused(false);

  return (
    <TextInput
      value={value}
      label={label}
      mode={mode}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      theme={{
        colors: {
          primary: colors.accent,
        },
      }}
      right={
        icon ? (
          <TextInput.Icon
            name={icon}
            color={isFocused ? colors.accent : colors.placeholder}
            onPress={onIconPress}
          />
        ) : null
      }
    />
  );
};

export default CustomInput;
