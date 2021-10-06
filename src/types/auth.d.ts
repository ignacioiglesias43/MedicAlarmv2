import {User} from '../api/user/model/User';

interface AuthState {
  token: string;
  userInfo: User | null | undefined;
}

type AuthAction = {
  type: string;
  payload: any;
};

type DispatchAuthActionType = (args: AuthAction) => AuthAction;
