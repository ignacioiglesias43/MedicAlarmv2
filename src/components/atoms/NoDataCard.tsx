import React from 'react';
import {StyleSheet} from 'react-native';
import {Caption} from 'react-native-paper';

interface Props {
  text: string;
}

const NoDataCard = ({text}: Props) => {
  return <Caption style={styles.caption}>{text}</Caption>;
};

export default NoDataCard;

const styles = StyleSheet.create({
  caption: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.5,
  },
});
