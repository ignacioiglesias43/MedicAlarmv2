import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

import colors from '../../styles/colors';

interface ViewContainerProps {
  children: JSX.Element | JSX.Element[];
  primary?: boolean;
  childrenStyle?: StyleProp<ViewStyle>;
}

const ViewContainer = ({
  children,
  primary = false,
  childrenStyle = {},
}: ViewContainerProps) => {
  const backgroundColor = primary ? colors.primary : colors.background;
  const barStyle = primary ? "light-content" : "dark-content"

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]}>
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle}/>
      <View style={[styles.childred, childrenStyle]}>{children}</View>
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
