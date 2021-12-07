import React from 'react';
import {StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {Button} from 'react-native-paper';
import colors from '../../styles/colors';

interface ButtonProps {
  text: string;
  mode?: 'text' | 'contained' | 'outlined';
  dark?: boolean;
  uppercase?: boolean;
  color?: string | undefined;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const CustomButton = ({
  text,
  color=colors.accent,
  dark,
  onPress = () => {},
  mode = 'contained',
  uppercase = false,
  style = {},
}: ButtonProps) => {
  return (
    <Button
      dark={dark}
      mode={mode}
      color={color}
      onPress={onPress}
      uppercase={uppercase}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonText}
      style={[styles.button, style]}>
      {text}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContent: {
    marginVertical: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  button: {
    borderRadius: 50,
    borderColor: colors.accent,
  },
});
