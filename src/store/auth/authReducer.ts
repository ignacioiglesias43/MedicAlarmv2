import {AuthAction, AuthState} from '../../types/auth';
import {
  UPDATE_TOKEN,
  UPDATE_USER_INFO,
  UPDATE_TOKEN_EXPIRES_AT,
} from './actionTypes';

const initialState: AuthState = {
  token: '',
  tokenExpiresAt: '',
  userInfo: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {...state, token: action.payload};
    case UPDATE_USER_INFO:
      return {...state, userInfo: action.payload};
    case UPDATE_TOKEN_EXPIRES_AT:
      return {...state, tokenExpiresAt: action.payload};
    default:
      return state;
  }
};

export default authReducer;
