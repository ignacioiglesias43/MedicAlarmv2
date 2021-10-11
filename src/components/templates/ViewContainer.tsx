import React from 'react';
import {View, StatusBar, SafeAreaView, StyleSheet} from 'react-native';

import colors from '../../styles/colors';

interface ViewContainerProps {
  children: JSX.Element;
  primary?: boolean;
}

const ViewContainer = ({children, primary = false}: ViewContainerProps) => {
  const backgroundColor = primary ? colors.primary : colors.background;

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]}>
      <StatusBar backgroundColor={backgroundColor} />
      <View style={styles.childred}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  childred: {
    flex: 1,
  },
});

export default ViewContainer;
