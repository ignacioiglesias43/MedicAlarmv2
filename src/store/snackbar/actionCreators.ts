import {
  UPDATE_SNACK_BAR_VISIBLE,
  UPDATE_SNACK_BAR_MESSAGE,
} from './actionTypes';

export const updateSnackBarVisible =
  (visible: boolean) => (dispatch: DispatchAppoinmtentActionType) =>
    dispatch({
      type: UPDATE_SNACK_BAR_VISIBLE,
      payload: visible,
    });

export const updateSnackBarMessage =
  (message: string) => (dispatch: DispatchAppoinmtentActionType) =>
    dispatch({
      type: UPDATE_SNACK_BAR_MESSAGE,
      payload: message,
    });
