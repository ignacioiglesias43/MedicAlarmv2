import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  updateModalMessage,
  updateModalTitle,
  updateModalIconColor,
  updateModalVisible,
  updateModalIcon,
  updateModalIsConfirm,
} from '../store/modal/actionCreators';
import colors from '../styles/colors';
import {RootState} from '../store/index';

export const useModal = () => {
  const dispatch = useAppDispatch();
  const {visible, ...rest} = useAppSelector(
    (state: RootState) => state.modalReducer,
  );

  const openModal = (
    message: string,
    isConfirm: boolean = false,
    title: string = 'Aviso',
    icon: string = 'alert-decagram',
    color: string = colors.warning,
  ) => {
    dispatch(updateModalTitle(title));
    dispatch(updateModalMessage(message || 'Ocurrió un error inesperado'));
    dispatch(updateModalIcon(icon));
    dispatch(updateModalIconColor(color));
    dispatch(updateModalIsConfirm(isConfirm));
    dispatch(updateModalVisible(true));
  };

  return {
    openModal,
    isModalVisible: visible,
    ...rest,
  };
};
