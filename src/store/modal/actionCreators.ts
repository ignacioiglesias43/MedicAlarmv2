import {
  UPDATE_MODAL_MESSAGE,
  UPDATE_MODAL_TITLE,
  UPDATE_MODAL_VISIBLE,
  UPDATE_MODAL_ICON,
  UPDATE_MODAL_ICON_COLOR,
  UPDATE_IS_CONFIRM,
} from './actionTypes';

export const updateModalVisible =
  (visible: boolean) => (dispatch: DispatchModalActionType) =>
    dispatch({
      type: UPDATE_MODAL_VISIBLE,
      payload: visible,
    });

export const updateModalTitle =
  (title: string) => (dispatch: DispatchModalActionType) =>
    dispatch({
      type: UPDATE_MODAL_TITLE,
      payload: title,
    });

export const updateModalMessage =
  (message: string) => (dispatch: DispatchModalActionType) =>
    dispatch({
      type: UPDATE_MODAL_MESSAGE,
      payload: message,
    });

export const updateModalIcon =
  (icon: string) => (dispatch: DispatchModalActionType) =>
    dispatch({
      type: UPDATE_MODAL_ICON,
      payload: icon,
    });

export const updateModalIconColor =
  (iconColor: string) => (dispatch: DispatchModalActionType) =>
    dispatch({
      type: UPDATE_MODAL_ICON_COLOR,
      payload: iconColor,
    });

export const updateModalIsConfirm =
  (isConfirm: boolean) => (dispatch: DispatchModalActionType) =>
    dispatch({
      type: UPDATE_IS_CONFIRM,
      payload: isConfirm,
    });
