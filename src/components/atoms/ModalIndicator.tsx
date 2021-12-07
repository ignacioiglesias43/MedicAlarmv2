import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, Modal, Portal} from 'react-native-paper';

import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/index';

import colors from '../../styles/colors';

const ModalIndicator = () => {
  const {visible} = useAppSelector(
    (state: RootState) => state.loadingIndicatorReducer,
  );
  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.modal}>
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.indicator}
          color={colors.accent}
        />
      </Modal>
    </Portal>
  );
};

export default ModalIndicator;

const styles = StyleSheet.create({
  modal: {
    padding: 20,
  },
  indicator: {alignSelf: 'center'},
});
