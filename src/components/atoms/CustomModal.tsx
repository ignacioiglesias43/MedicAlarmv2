import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Title,
  IconButton,
  Button,
} from 'react-native-paper';

import {
  updateModalVisible,
  updateModalMessage,
  updateModalTitle,
  updateModalIsConfirm,
} from '../../store/modal/actionCreators';

import {useAppSelector, useAppDispatch} from '../../store/hooks';
import {RootState} from '../../store/index';

import colors from '../../styles/colors';

/**
 * Use this modal to show error messages
 */

const CustomModal = () => {
  const {visible, message, title, icon, iconColor, isConfirm} = useAppSelector(
    (state: RootState) => state.modalReducer,
  );

  const dispatch = useAppDispatch();

  const hideModal = () => {
    dispatch(updateModalVisible(false));
    dispatch(updateModalMessage(''));
    dispatch(updateModalTitle(''));
    dispatch(updateModalIsConfirm(false));
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={styles.main}
        dismissable={false}>
        <View style={styles.iconView}>
          <IconButton icon={icon} size={80} color={iconColor} />
        </View>

        <Title style={styles.title}>{title}</Title>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.btnContainer}>
          {isConfirm && (
            <Button
              style={styles.btn}
              onPress={hideModal}
              color={colors.accent}
              dark
              mode="contained">
              Aceptar
            </Button>
          )}
          <Button
            style={styles.btn}
            onPress={hideModal}
            color={colors.accent}
            dark
            mode={isConfirm ? 'outlined' : 'contained'}>
            {isConfirm ? 'Cancelar' : 'Aceptar'}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  main: {
    padding: 20,
    backgroundColor: colors.background,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  btn: {
    marginHorizontal: 10,
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
  },
  message: {
    color: colors.backdrop,
    textAlign: 'center',
    marginBottom: 30,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 118,
    width: 118,
    height: 118,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: -70,
    backgroundColor: 'white',
  },
});
