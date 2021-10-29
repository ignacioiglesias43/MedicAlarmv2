import {useAppDispatch} from '../store/hooks';
import {
  updateModalMessage,
  updateModalTitle,
  updateModalIconColor,
  updateModalVisible,
  updateModalIcon,
} from '../store/modal/actionCreators';
import colors from '../styles/colors';

export const useModal = () => {
  const dispatch = useAppDispatch();

  const openModal = (
    message: string,
    title: string = 'Aviso',
    icon: string = 'alert-decagram',
    color: string = colors.warning,
  ) => {
    dispatch(updateModalTitle(title));
    dispatch(updateModalMessage(message));
    dispatch(updateModalIcon(icon));
    dispatch(updateModalIconColor(color));
    dispatch(updateModalVisible(true));
  };

  return openModal;
};
