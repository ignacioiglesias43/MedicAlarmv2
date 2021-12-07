import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {FAB} from 'react-native-paper';
import colors from '../../styles/colors';

interface Props {
  icon?: string;
  actions: Array<FABGroupProps>;
}

export interface FABGroupProps {
  icon: string;
  label: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  small?: boolean;
  onPress: () => void;
}

const CustomFABGroup = ({icon = 'plus', actions}: Props) => {
  const [open, setOpen] = React.useState(false);
  const onStateChange = () => setOpen(!open);

  return (
    <FAB.Group
      visible={true}
      open={open}
      icon={open ? 'close' : icon}
      color={colors.background}
      actions={actions}
      onStateChange={onStateChange}
    />
  );
};

export default CustomFABGroup;

const styles = StyleSheet.create({});
