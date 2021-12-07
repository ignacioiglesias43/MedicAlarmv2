import {UPDATE_INDICATOR_VISIBLE} from './actionTypes';

export const updateIndicatorVisible =
  (visible: boolean) => (dispatch: DispatchIndicatorActionType) =>
    dispatch({
      type: UPDATE_INDICATOR_VISIBLE,
      payload: visible,
    });
