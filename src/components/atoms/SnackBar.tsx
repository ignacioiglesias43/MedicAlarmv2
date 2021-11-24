import React from 'react';
import {Snackbar} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/hooks';
import {updateSnackBarVisible} from '../../store/snackbar/actionCreators';
import {RootState} from '../../store/index';

const SnackBar = () => {
  const dispatch = useDispatch();
  const {visible, message} = useAppSelector(
    (state: RootState) => state.snackbarReducer,
  );
  const insets = useSafeAreaInsets();
  const onDismissSnackBar = () => dispatch(updateSnackBarVisible(false));
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      style={{marginBottom: insets.bottom + 20}}>
      {message}
    </Snackbar>
  );
};

export default SnackBar;
