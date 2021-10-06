import {AuthAction, AuthState} from '../../types/auth';
import {UPDATE_TOKEN, UPDATE_USER_INFO} from './actionTypes';

const initialState: AuthState = {
  token: '',
  userInfo: null,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {...state, token: action.payload};
    case UPDATE_USER_INFO:
      return {...state, userInfo: action.payload};
    default:
      return state;
  }
};

export default authReducer;
