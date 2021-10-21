import {DispatchAuthActionType} from '../../types/auth';
import {
  UPDATE_TOKEN,
  UPDATE_USER_INFO,
  UPDATE_TOKEN_EXPIRES_AT,
} from './actionTypes';
import {User} from '../../api/user/model/User';

export const updateToken =
  (token: string) => (dispatch: DispatchAuthActionType) =>
    dispatch({
      type: UPDATE_TOKEN,
      payload: token,
    });

export const updateTokenExpiresAt =
  (expiresAt: string) => (dispatch: DispatchAuthActionType) =>
    dispatch({
      type: UPDATE_TOKEN_EXPIRES_AT,
      payload: expiresAt,
    });

export const updateUserInfo =
  (userInfo: User) => (dispatch: DispatchAuthActionType) =>
    dispatch({
      type: UPDATE_USER_INFO,
      payload: userInfo,
    });
