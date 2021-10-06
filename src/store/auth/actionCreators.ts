import {DispatchAuthActionType} from '../../types/auth';
import {UPDATE_TOKEN, UPDATE_USER_INFO} from './actionTypes';
import {User} from '../../api/user/model/User';

export const updateToken =
  (token: string) => (dispatch: DispatchAuthActionType) =>
    dispatch({
      type: UPDATE_TOKEN,
      payload: token,
    });

export const updateUserInfo =
  (userInfo: User) => (dispatch: DispatchAuthActionType) =>
    dispatch({
      type: UPDATE_USER_INFO,
      payload: userInfo,
    });
