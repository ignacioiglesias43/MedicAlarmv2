import {
  UPDATE_SNACK_BAR_MESSAGE,
  UPDATE_SNACK_BAR_VISIBLE,
} from './actionTypes';

const initialState: SnackbarState = {
  visible: false,
  message: '',
};

const snackbarReducer = (state = initialState, action: SnackbarAction) => {
  switch (action.type) {
    case UPDATE_SNACK_BAR_VISIBLE:
      return {...state, visible: action.payload};
    case UPDATE_SNACK_BAR_MESSAGE:
      return {...state, message: action.payload};
    default:
      return state;
  }
};

export default snackbarReducer;
