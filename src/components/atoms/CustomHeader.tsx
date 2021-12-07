import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CustomHeader = ({children}: Props) => {
  return (
    <View style={styles.container}>
      {children}
      <Divider style={styles.divider} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  divider: {
    marginTop: 15,
    marginBottom: 5,
    opacity: 1,
  },
});
