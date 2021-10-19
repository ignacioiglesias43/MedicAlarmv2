import request from '../request';

import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {User} from '../user/model/User';
import {CreateUserDto} from './dto/create-user.dto';

export const loginService = (data: AuthCredentialsDto) =>
  request<User>({
    method: 'POST',
    url: '/login',
    data,
  });

export const signupService = (data: CreateUserDto) =>
  request<User>({
    method: 'POST',
    url: '/register',
    data,
  });
