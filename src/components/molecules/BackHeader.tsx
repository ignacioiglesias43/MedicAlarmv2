import React, {FC} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {IconButton, Title} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

import CustomHeader from '../atoms/CustomHeader';

interface BackHeaderProps {
  title: string;
}

const BackHeader: FC<BackHeaderProps> = ({title}) => {
  const navigation = useNavigation();
  const backIcon = Platform.select({
    android: 'arrow-left',
    ios: 'chevron-left',
  });

  const handleBack = () => navigation.goBack();

  return (
    <CustomHeader>
      <View style={styles.header}>
        <IconButton
          icon={backIcon!}
          style={styles.backIcon}
          size={24}
          onPress={handleBack}
        />
        <Title style={styles.title}>{title}</Title>
      </View>
    </CustomHeader>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginLeft: 1.5,
  },
  backIcon: {
    alignSelf: 'center',
  },
});
