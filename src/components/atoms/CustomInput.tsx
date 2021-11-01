import React, {useState} from 'react';
import {
  GestureResponderEvent,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
} from 'react-native';

import {TextInput} from 'react-native-paper';

import colors from '../../styles/colors';

interface CustomInputProps {
  value: string;
  label: string;
  mode?: 'flat' | 'outlined';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  secureTextEntry?: boolean;
  placeholder?: string,
  maxLength?: number,
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
  keyboardType?: KeyboardTypeOptions | undefined;
  style?: StyleProp<TextStyle>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  onIconPress,
  label,
  mode = 'outlined',
  icon,
  placeholder,
  maxLength,
  keyboardType,
  style = {},
  secureTextEntry = false,
  autoCapitalize = 'sentences',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => setIsFocused(true);

  const handleInputBlur = () => setIsFocused(false);

  return (
    <TextInput
      value={value}
      label={label}
      mode={mode}
      placeholder={placeholder}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      keyboardType={keyboardType}
      style={style}
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
