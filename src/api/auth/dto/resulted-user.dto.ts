import {Role} from '../model/role';
import {User} from '../../user/model/User';

export interface ResultedUserSignup {
  message: string;
  data: Data;
}

interface Data extends User {
  code: string;
  roles: Role[];
}

export interface ResultedUserLogin {
  user: User;
  role: string;
  access_token: string;
  token_type: string;
  expires_at: string;
}
