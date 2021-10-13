import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import colors from '../../styles/colors';

const logo = require('../../assets/logo.png');

const AuthHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.titleContainer}>
        <Title style={[styles.title, styles.medic]}>Medic</Title>
        <Title style={[styles.title, styles.alarm]}>Alarm</Title>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 95,
    height: 90,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 27,
  },
  medic: {
    color: colors.titleWhite,
  },
  alarm: {
    color: colors.accent,
  },
  titleContainer: {
    flexDirection: 'row',
  },
});
