import colors from '../../styles/colors';
import {UPDATE_MODAL_ICON, UPDATE_MODAL_ICON_COLOR} from './actionTypes';
import {
  UPDATE_MODAL_MESSAGE,
  UPDATE_MODAL_TITLE,
  UPDATE_MODAL_VISIBLE,
} from './actionTypes';

const initialState: ModalState = {
  visible: false,
  message: '',
  title: '',
  icon: 'alert-circle',
  iconColor: colors.error,
};

const modalReducer = (
  state = initialState,
  action: ModalAction,
): ModalState => {
  switch (action.type) {
    case UPDATE_MODAL_MESSAGE:
      return {...state, message: action.payload};
    case UPDATE_MODAL_TITLE:
      return {...state, title: action.payload};
    case UPDATE_MODAL_VISIBLE:
      return {...state, visible: action.payload};
    case UPDATE_MODAL_ICON:
      return {...state, icon: action.payload};
    case UPDATE_MODAL_ICON_COLOR:
      return {...state, iconColor: action.payload};
    default:
      return state;
  }
};

export default modalReducer;
